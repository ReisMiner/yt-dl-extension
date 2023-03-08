let loadTimer = setInterval(waitForLoad, 100);


// from return-youtube-dislike
//https://github.com/Anarios/return-youtube-dislike/blob/931006a00bb38454c77fa24e4ecdf541760d84ef/Extensions/combined/src/utils.js#L72
function getVideoId(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    if (pathname.startsWith("/clip")) {
        return document.querySelector("meta[itemprop='videoId']").content;
    } else {
        if (pathname.startsWith("/shorts")) {
            return pathname.slice(8);
        }
        return urlObject.searchParams.get("v");
    }
}

// from return-youtube-dislike
//https://github.com/Anarios/return-youtube-dislike/blob/931006a00bb38454c77fa24e4ecdf541760d84ef/Extensions/combined/src/utils.js#L100
function isVideoLoaded() {
    const videoId = getVideoId(window.location.href);
    return (
        document.querySelector(`ytd-watch-flexy[video-id='${videoId}']`) !== null ||
        // mobile: no video-id attribute
        document.querySelector('#player[loading="false"]:not([hidden])') !== null
    );
}

function waitForLoad() {
    if (isVideoLoaded()) {
        clearInterval(loadTimer);
        let title = document.querySelectorAll("h1.ytd-watch-metadata")[0];
        title.style.color="red";
    }
}