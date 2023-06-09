import blobToBase64 from "src/utils/blobToBase64.js";

function chooseImage() {
    return new Promise((resolve, _reject) => {
        try {
            let input = document.createElement("input")
            input.setAttribute("type", "file")
            input.setAttribute("accept", "image/*")
            input.addEventListener("change", async (e) => {
                let file = e.target.files[0]
                let base64 = await blobToBase64(file)
                resolve({blob: file, name: file.name, base64: base64})
            })
            input.click()
        } catch (ex) {
            resolve(null)
        }
    })
}

export default chooseImage