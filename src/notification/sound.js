function playSound(){
    let audio = document.createElement("audio")
    audio.setAttribute("src", "/notification.wav")
    audio.play().then(_r => {
        console.log("play")
    }).catch(ex => {
        console.log(ex)
    })
}

export default playSound