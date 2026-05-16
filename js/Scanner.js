let html5QrcodeScanner = null;

function startScanner() {
    if (html5QrcodeScanner) return;

    html5QrcodeScanner = new Html5Qrcode("reader");
    const config = {
        fps: 10,
        qrbox: {
            width: 250,
            height: 250
        },
        aspectRatio: 1.0
    };
    html5QrcodeScanner.start({
        facingMode: "environment"
    }, config, onScanSuccess).catch(err => {
        console.error("Camera Error: ", err);
        alert("Camera permission denied or devie not found.");
    });
}

function stopScanner() {
    if (html5QrcodeScanner) {
        html5QrcodeScanner.stop().then(() => {
            html5QrcodeScanner.clear();
            html5QrcodeScanner = null;
        }).catch(err => console.log("Failed to stop scanner", err));
    }
}

function onScanSuccess(decodedText, decodedResult) {
    if (navigator.vibrate) navigator.vibrate(200);
    saveToHistory(decodedText);

    document.getElementById("scan-result").classList.remove("hidden");
    document.getElementById("result-text").innerText = decodedText;
    document.getElementById("copy-btn").onclick = () => {
        navigator.clipboard.writeText(decodedText);
        alert("Copied to clipboard!");
    };
    const actionBtn = document.getElementById("action-btn");
    if (decodedText.startsWith("http://") || decodedText.startsWith("https://")) {
        actionBtn.classList.remove("hidden");
        actionBtn.onclick = () => window.open(decodedText, "_blank");
        actionBtn.innerHTML = "<i class='fas fa-external-link-alt mr-2'></i>Open URL";
    } else {
        actionBtn.classList.add("hidden");
    }
}