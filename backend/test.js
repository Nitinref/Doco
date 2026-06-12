import express from "express";
import Dockerode from "dockerode";
import Stream from "node:stream";

const docker  = new Docker();
const management = express();

const MANAGEMENT_API_PORT = process.env.MANAGEMENT_API_PORT || 8080;


async function pullImagePromisified (image , tag){
  return new Promise((res, rej)=>{
   docker.pull(`${image}:${tag}` , {} , (err , Stream)=>{
    if(err)return rej(err);
    else return res(true);
   })
  })

}


management.get('/container' , async (req,res)=>{
const {image , tag} = req.body;
const systemImage = docker.listImages();
const existingContainer = false;


for(const constainer of containers){
    for(const containerTag of constainerTags ){
        if(systemImage = `${image}:${tag}`){
            existingContainer = true;
            break;
        }
    }

    if(existingContainer){
        break;
    }
}

if(!existingContainer){
    await pullImagePromisified(image,tag);
}

const container = docker.create.createContainer({
    image:`${image}:${tag}`,
    HostCon
})
})

management.post('/container' , async (req,res)=>{
    
})