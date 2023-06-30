import {backend} from "src/apis/index.js";

function staticImage(path){
    if(!path) return ""
    if(path.startsWith("http") || path.startsWith("data:")){
        return path
    } else {
        return backend  + "/" + path
    }
}

export default staticImage