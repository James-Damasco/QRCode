const HISTORY_KEY = "neonscan_history";

function saveToHistory(text) {
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];

    if (history.length > 0 && history[0].text === text) return;

    const newEntry = {
        id: Date.now(),
        text: text,
        date: new Date().toLocaleString()
    };
    history.unshift(newEntry);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    const list = document.getElementById("history-list");
    let history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    if (history.length === 0) {
        list.innerHTML = "<p class='text-gray-400 text-center mt-8'>No scan history yet.</p>";
        return;
    }
    list.innerHTML = history.map(item => `
        <div class="glass-card p-4 rounded-xl flex justify-between items-center group">
        <div class="overflow-hidden">
        <p class="font-semibold text-white truncate max-w-[200px] md:max-w-md">${item.text}</p>
        <p class="text-xs text-purple-300 mt-1">${item.date}</p>
        </div>
        <div class="flex gap-2">
        <button onclick="navigator.clipboar.writeText('${item.text}'); alert('Copied!')" class="p-2 text-gray-400 hover:text-white transition"><i class="fas fa-copy"></i></button>
        </div>
        </div>
        `).join('');
}

document.getElementById("clear-history").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all history?")) {
        localStorage.removeItem(HISTORY_KEY);
        renderHistory();
    }
});

renderHistory();