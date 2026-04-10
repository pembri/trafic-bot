let isRunning = false;
let count = 0;
let botInterval;

function addLog(msg) {
    const box = document.getElementById('logBox');
    const time = new Date().toLocaleTimeString();
    box.innerHTML += `<div>[${time}] ${msg}</div>`;
    box.scrollTop = box.scrollHeight;
}

function toggleBot() {
    const btn = document.getElementById('mainBtn');
    const url = document.getElementById('targetUrl').value;
    const interval = document.getElementById('intervalTime').value * 1000;
    const threads = document.getElementById('threads').value;
    const statusText = document.getElementById('statusText');

    if (!isRunning) {
        if (!url.startsWith('http')) return alert("Gunakan http:// atau https://");
        
        isRunning = true;
        btn.innerText = "Stop Engine";
        btn.className = "btn stop";
        statusText.innerText = "RUNNING";
        statusText.style.color = "#4ade80";
        addLog("Bot Started...");

        botInterval = setInterval(() => {
            for (let i = 0; i < threads; i++) {
                const ifr = document.createElement('iframe');
                ifr.style.display = 'none';
                ifr.src = url + "?v=" + Math.random();
                document.body.appendChild(ifr);
                setTimeout(() => ifr.remove(), 2000);
            }
            count += parseInt(threads);
            document.getElementById('countDisplay').innerText = count;
            addLog(`Sent ${threads} hits...`);
        }, interval);
    } else {
        isRunning = false;
        btn.innerText = "Start Engine";
        btn.className = "btn start";
        statusText.innerText = "IDLE";
        statusText.style.color = "var(--danger)";
        clearInterval(botInterval);
        addLog("Bot Stopped.");
    }
}
