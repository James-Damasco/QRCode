const generateBtn = document.getElementById("generate-btn");
const qrInput = document.getElementById("qr-input");
const qrContainer = document.getElementById("qrcode-container");
const qrPlaceholer = document.getElementById("qr-placeholder");
const downloadBtn = document.getElementById("download-qr");
const colorDark = document.getElementById("qr-color");
const colorLight = document.getElementById("qr-bg");

let currentQRCode = null;

generateBtn.addEventListener("click", () => {
    const text = qrInput.value.trim();
    if (!text) {
        alert("Please enter some content to generate a QR Code.");
        return;
    }
    qrContainer.innerHTML = "";
    currentQRCode = new QRCode(qrContainer, {
        text: text,
        width: 256,
        height: 256,
        colorDark: colorDark.value,
        colorLight: colorLight.value,
        correctLevel: QRCode.CorrectLevel.H
    });
    qrPlaceholer.classList.add("hidden");
    qrContainer.classList.remove("hidden");
    downloadBtn.classList.remove("hidden");
});

downloadBtn.addEventListener("click", () => {
    const img = qrContainer.querySelector("img");
    if (!img) return;

    const link = document.createElement("a");
    link.download = "NeonScan-QR.png";
    link.href = img.src;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
