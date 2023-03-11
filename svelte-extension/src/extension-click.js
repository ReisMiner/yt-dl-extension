import "webextension-polyfill";

function openGallery() {
    browser.tabs.create({
        "url": "index.html"
    });
}

browser.browserAction.onClicked.addListener(openGallery);