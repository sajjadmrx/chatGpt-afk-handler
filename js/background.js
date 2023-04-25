
chrome.webRequest.onResponseStarted.addListener(async (details) => {
    const { url, statusLine } = details;
    const autoRef = await getValueFromStorage("autoRef")
    const isEnabled = await getValueFromStorage("enabled")

    if (details.statusCode === 403 && url.startsWith("https://chat.openai.com/backend-api")) {
        if (isEnabled && autoRef) {
            chrome.tabs.reload(details.tabId);
        }
    }


}, { urls: ["<all_urls>"] });

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message == "reloadExtension") {
        chrome.runtime.reload();
    }
});



chrome.idle.onStateChanged.addListener((state) => {
    if (state === "idle") {
        console.log("User is idle");
    } else if (state === "active") {
        console.log("User is active");
    }
});

chrome.idle.setDetectionInterval(15);

async function getValueFromStorage(key) {
    return new Promise((resolve, rej) => {
        chrome.storage.sync.get(key, function (data) {
            resolve(data[key])
        })
    })
}