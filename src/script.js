document.addEventListener('DOMContentLoaded', () => {

    const display = document.querySelector("#display")
    const record = document.querySelector("#record")
    const micInput = document.querySelector("#mic")

    let isRecording = false
    let selectedDeviceId = null
    let mediaRecorder = null
    let chunks = []

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

    record.addEventListener("click", () => {
        updateButtonTo(!isRecording)
        handleRecord(isRecording)

        isRecording = !isRecording
    })

    function handleRecord(recording) {
        if (recording) {
            mediaRecorder.stop()
        } else {
            navigator.mediaDevices.getUserMedia({ audio: { deviceId: selectedDeviceId }, video: false }).then(stream => {
                mediaRecorder = new MediaRecorder(stream)
                mediaRecorder.start()
                mediaRecorder.ondataavailable = (event) => {
                    chunks.push(event.data)
                }
                mediaRecorder.onstop = (event) => {
                    saveData()
                }
            })
        }
    }

    function saveData() {
        const blob = new Blob(chunks, { "type": "audio/webm; codecs=opus" })
        console.log(blob);
        chunks = []
    }

})

window.onload = () => {
    document.body.classList.remove('preload')
}