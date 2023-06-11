/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
import createImage from "src/utils/createImage.js";


function getCroppedImg(
    imageSrc,
    croppedAreaPixels,
) {

    return new Promise(async (resolve, reject)=>{
        const image = await createImage(imageSrc)

        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        canvas.width = croppedAreaPixels.width
        canvas.height = croppedAreaPixels.height
        ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
        )

        // As Base64 string
        canvas.toBlob(function (blob){
            resolve(blob)
        }, 'image/jpeg', 0.4);
    })

}
export default getCroppedImg