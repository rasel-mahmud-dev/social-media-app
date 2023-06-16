function trimText(text, len = 0){
    if(!text) return ""
    if(len){
        return text.length > len ? text.substring(0, len) + "..." : text
    }
    return  text
}


export default trimText