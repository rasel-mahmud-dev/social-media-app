
function blobToBase64(blob){
  return new Promise((r)=>{
    let reader = new FileReader()
    reader.onload = function(e){
      r(e.target.result)
    }
    reader.onerror = function (){
      r(null)
    }
    if(blob){
      reader.readAsDataURL(blob)
    }
  })
}

export default blobToBase64