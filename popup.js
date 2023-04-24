chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    if (tabs.length > 0) {
        console.log(tabs);
        var currentTab = tabs[0];
        var currentUrl = currentTab.url;
        console.log('Current URL:', currentUrl);
        // chrome.runtime.sendMessage({ data: "Hello from the background!" });
    }
});