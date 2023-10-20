document.addEventListener('DOMContentLoaded', () => {

    const display = document.querySelector("#display")
    const record = document.querySelector("#record")
    const micInput = document.querySelector("#mic")

    let isRecording = false
    let selectedDeviceId = null

    //Lista todos os dispositivos de audio do computador
    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(device => {
            if (device.kind === "audioinput") {
                if (selectedDeviceId) {
                    selectedDeviceId = device.deviceId
                }

                const opt = document.createElement("option")
                opt.value = device.deviceId
                opt.text = device.label

                micInput.appendChild(opt)
            }
        })
    })

    micInput.addEventListener("change", (event) => {
        selectedDeviceId = event.target.value
    })

    //Atualiza o botão modificando seu estilo
    function updateButtonTo(recording) {
        if (recording) {
            document.getElementById("mic-icon").classList.add('hide')
            document.getElementById("record").classList.add('recording')
        } else {
            document.getElementById("mic-icon").classList.remove('hide')
            document.getElementById("record").classList.remove('recording')
        }
    }
})

window.onload = () => {
    document.body.classList.remove('preload')
}