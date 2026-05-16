function switchTab(tabId) {
    document.querySelectorAll(".page-section").forEach(sec => sec.classList.add("hidden"));
    document.querySelectorAll(".page-section").forEach(sec => sec.classList.remove("flex"));

    const target = document.getElementById(tabId);
    target.classList.remove("hidden");
    target.classList.add("flex");

    document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
    document.querySelector(`.nav-item[data-target="${tabId}"]`).classList.add("active");

    if (tabId === "scanner") {
        startScanner();
    } else {
        stopScanner();
    }
}

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", (e) => {
        switchTab(e.currentTarget.getAttribute("data-target"));
    });
});