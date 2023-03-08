function openGallery() {
    console.log("injecting");
    browser.tabs.create({
        "url": "/page/gallery.html"
    });
}

browser.browserAction.onClicked.addListener(openGallery);