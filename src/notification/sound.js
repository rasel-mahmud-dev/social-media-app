function playSound(src = "/notification.wav"){
    let audio = document.createElement("audio")
    audio.setAttribute("src", src)
    audio.play().then(_r => {
        console.log("play")
    }).catch(ex => {
        console.log(ex)
    })
}

export default playSound