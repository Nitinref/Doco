import express from "express";
import Docker from "dockerode";
import httpProxy from "http-proxy";
import cors from "cors";

const docker = new Docker();
const managementapp = express();
const proxyApp = express();
const proxy = httpProxy.createProxy();

const MANAGEMENT_API_PORT = process.env.MANAGEMENT_API_PORT ?? 8080;
const REVERSE_PROXY_HOST = process.env.REVERSE_PROXY_HOST ?? "localhost";



managementapp.use(express.json());
proxyApp.use(cors())
managementapp.use(cors());


function pullImagePromisified(image, tag) {
    return new Promise((resolve, reject) => {
        docker.pull(image, { tag }, (error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(true);
        });
    });
}

function getApiStatus() {
    return { status: "Management APIs are up and running" };
}

function normalizeContainerName(name = "") {
    return name.startsWith("/") ? name.slice(1) : name;
}

function formatContainer(container) {
    const rawName = container.Names?.[0] ?? container.Name ?? container.Id;

    return {
        id: container.Id,
        name: normalizeContainerName(rawName),
        image: container.Image,
        state: container.State,
        status: container.Status,
        created: container.Created,
        ports: container.Ports ?? [],
    };
}

async function listContainersHandler(req, res) {
    try {
        const containers = await docker.listContainers({ all: true });
        return res.json(containers.map(formatContainer));
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Unable to list containers",
        });
    }
}

async function createContainerHandler(req, res) {
    try {
        const { image, tag } = req.body ?? {};

        if (!image || !tag) {
            return res.status(400).json({
                status: "error",
                message: "Both image and tag are required.",
            });
        }

        const systemImages = await docker.listImages();
        let existingImage = false;

        for (const systemImage of systemImages) {
            for (const systemTag of systemImage.RepoTags ?? []) {
                if (systemTag === `${image}:${tag}`) {
                    existingImage = true;
                    break;
                }
            }

            if (existingImage) {
                break;
            }
        }

        if (!existingImage) {
            await pullImagePromisified(image, tag);
        }

        const container = await docker.createContainer({
            Image: `${image}:${tag}`,
            HostConfig: {
                AutoRemove: true,
            },
        });

        const network = docker.getNetwork("deploy-engine-network");
        await container.start();

        const inspect = await container.inspect();
        await network.connect({
            Container: inspect.Id,
        });

        const containerName = normalizeContainerName(inspect.Name);

        return res.json({
            status: "success",
            data: {
                containerName,
                domain: `${containerName}.${REVERSE_PROXY_HOST}`,
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: error instanceof Error ? error.message : "Unable to create container",
        });
    }
}

managementapp.get("/", (req, res) => {
    return res.json(getApiStatus());
});

managementapp.get("/api/status", (req, res) => {
    return res.json(getApiStatus());
});

managementapp.get("/containers", listContainersHandler);
managementapp.get("/api/containers", listContainersHandler);

managementapp.post("/monitor", (req, res) => {
    return res.status(501).json({
        status: "unavailable",
        message: "Monitoring is not implemented yet.",
    });
});

managementapp.post("/api/monitor", (req, res) => {
    return res.status(501).json({
        status: "unavailable",
        message: "Monitoring is not implemented yet.",
    });
});

managementapp.post("/container", createContainerHandler);
managementapp.post("/api/container", createContainerHandler);

managementapp.listen(MANAGEMENT_API_PORT, () => {
    console.log(`Management API is running on port ${MANAGEMENT_API_PORT}`);
});

proxyApp.use((req, res) => {
    const containerName = req.hostname.split(".")[0];
    return proxy.web(req, res, {
        target: `http://${containerName}:80`,
    });
});

proxyApp.listen(80, () => {
    console.log("Reverse proxy is running on port 80");
});
