


document.addEventListener('DOMContentLoaded', () => {
    const goToGithubBtn = document.getElementById('gotoGithubAfkChatGpt');
    goToGithubBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: 'https://github.com/sajjadmrx/chatGpt-afk-handler' });
    });
});



const toggleSwitch = document.querySelector('#toggleSwitch');
const autoRefCheckBox = document.querySelector('#autoRef');

chrome.storage.sync.get('enabled', function (data) {
    toggleSwitch.checked = data.enabled;
});

chrome.storage.sync.get('autoRef', function (data) {
    console.log(data)
    autoRefCheckBox.checked = data.autoRef;
});


toggleSwitch.addEventListener('change', function (event) {
    const enabled = event.target.checked;
    chrome.storage.sync.set({ enabled });
    chrome.runtime.sendMessage({ enabled });
});

autoRefCheckBox.addEventListener('change', function (event) {
    const enabled = event.target.checked;
    chrome.storage.sync.set({ autoRef: enabled });
});


