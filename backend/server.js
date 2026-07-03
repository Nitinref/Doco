import path from 'node:path';
import express from 'express';
import Docker from 'dockerode';
import httpProxy from 'http-proxy';

const docker = new Docker();

function pullImagePromisified(image, tag) {
  return new Promise((res, rej) => {
    docker.pull(`${image}:${tag}`, {}, (err, stream) => {
      if (err) return rej(err);
      docker.modem.followProgress(
        stream,
        (doneErr, output) => {
          if (doneErr) return rej(doneErr);
          return res(output);
        },
        (event) => {
          if (event.status) {
            console.log(`[pull ${image}:${tag}] ${event.status}${event.progress ? ` ${event.progress}` : ''}`);
          }
        },
      );
    });
  });
}

const managementApp = express();
const proxyApp = express();
const proxy = httpProxy.createProxy();

proxy.on('error', (err, req, res) => {
  console.warn('Proxy error:', err.message);
  if (res && !res.headersSent) {
    res.status(502).end('Bad Gateway');
  }
});

managementApp.use(express.json());
managementApp.use(express.static(path.resolve('./public')));


managementApp.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

const MANAGEMENT_API_PORT = process.env.MANAGEMENT_API_PORT ?? 8080;
const REVERSE_PROXY_HOST = process.env.REVERSE_PROXY_HOST ?? 'localhost';


managementApp.get('/api/status', (req, res) => {
  return res.json({ status: 'Management APIs are up and running' });
});


managementApp.get('/api/containers', async (req, res) => {
  try {
    const containers = await docker.listContainers({ all: true });
    return res.json(containers.map(c => ({
      id: c.Id,
      name: c.Names[0]?.replace('/', ''),
      image: c.Image,
      state: c.State,
      status: c.Status,
      created: c.Created,
      ports: c.Ports,
    })));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});



managementApp.post('/api/container', async (req, res) => {
  try {
    const { image, tag } = req.body;

    const systemImages = await docker.listImages();
    let isExistingImage = false;

    for (const systemImage of systemImages) {
      for (const systemTag of systemImage.RepoTags ?? []) {
        if (systemTag === `${image}:${tag}`) {
          isExistingImage = true;
          break;
        }
      }
      if (isExistingImage) break;
    }

    if (!isExistingImage) {
      await pullImagePromisified(image, tag);
    }

    const container = await docker.createContainer({
      Image: `${image}:${tag}`,
      HostConfig: { AutoRemove: true },
    });

    await container.start();

    const inspect = await container.inspect();

    // network connect — try/catch so it doesn't crash if network missing
    try {
      const network = docker.getNetwork('deploy-engine-network');
      await network.connect({ Container: inspect.Id });
    } catch (err) {
      console.warn('Network connect failed:', err.message);
    }

    return res.json({
      status: 'success',
      data: {
        containerName: inspect.Name.replace('/', ''),
        domain: `${inspect.Name.replace('/', '')}.${REVERSE_PROXY_HOST}`,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

managementApp.listen(MANAGEMENT_API_PORT, () => {
  console.log(`ManagementAPI is running on PORT ${MANAGEMENT_API_PORT}`);
});

proxyApp.use((req, res) => {
  const containerName = req.hostname.split('.')[0];
  
  proxy.web(req, res, {
    target: `http://${containerName}:80`,
  }, (err) => {
    console.warn(`Proxy error for ${containerName}:`, err.message);
    if (!res.headersSent) {
      res.status(502).json({ error: `Container ${containerName} not reachable` });
    }
  });
});
proxyApp.listen(80, () => {
  console.log(`Reverse Proxy is running on PORT 80`);
});
