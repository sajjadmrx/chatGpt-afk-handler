const href = window.location.href
if (href.includes("https://chat.openai.com/c")) {
    let count = 0;
    const MAX_COUNT = 1000;
    const AFK_TIME = 120000;
    chrome.storage.sync.get('enabled', function (data) {
        console.log(window.location.href)
        if (data && data.enabled)
            window.onload = (event) => {
                let intervalId = setInterval(function () {
                    checkAfk();
                    if (++count === MAX_COUNT)
                        window.clearInterval(intervalId);

                }, 4000);
            }
    });

    let lastActivityTime = Date.now();

    function handleUserActivity() {
        lastActivityTime = Date.now();
    }

    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);
    let isShowAlert = false
    function checkAfk() {
        const now = Date.now();
        if (now - lastActivityTime > AFK_TIME) {
            if (isShowAlert) return;
            isShowAlert = true;
            alert("[ChatGpt Afk Handler] 💡 You were AFK for 2 minutes! Please avoid asking long questions. There might be errors due to AFK.")
        } else {
            if (isShowAlert) isShowAlert = false;
            console.log("user is active")
        }
    }
}