import {buttonStyle} from "./config.js";

let apiUrl = "";
browser.storage.sync.get(['api_url'], function (result) {
    apiUrl = result.api_url;
});

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

function createElementFromHTML(htmlString) {
    let div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.children[0];
}

function waitForLoad() {
    if (isVideoLoaded()) {
        clearInterval(loadTimer);
        console.log("susssy baka: " + apiUrl)
        let dlVid = createElementFromHTML("<button style='" + buttonStyle + "' onclick='let API_URL=\"" + apiUrl + "\";" + 'let header = new Headers();header.append("Content-Type", "application/json");fetch(API_URL+"video/queue", {method: "POST",headers: header,body: "{\\"url\\":\\"" + window.location.href + "\\",\\"audioOnly\\":false}"})' + "'>Download Video</button>")
        let dlVidAudio = createElementFromHTML("<button style='" + buttonStyle + "' onclick='let API_URL=\"" + apiUrl + "\";" + 'let header = new Headers();header.append("Content-Type", "application/json");fetch(API_URL+"video/queue", {method: "POST",headers: header,body: "{\\"url\\":\\"" + window.location.href + "\\",\\"audioOnly\\":true}"})' + "'>Download Audio</button>")
        let descriptionTitle = document.querySelectorAll("yt-formatted-string.ytd-watch-metadata:nth-child(1)")[0];
        descriptionTitle.insertAdjacentElement("beforeend", dlVid)
        descriptionTitle.insertAdjacentElement("beforeend", dlVidAudio)
    }
}