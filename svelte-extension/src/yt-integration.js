import {buttonStyle} from "./config.js";

let apiUrl = "";
browser.storage.sync.get(['api_url'], function (result) {
    apiUrl = result.api_url;
});

let loadTimer = setInterval(waitForLoad, 100);



// from return-youtube-dislike
//https://github.com/Anarios/return-youtube-dislike/blob/928d6df4c73abeefd224a1150b7f4d32668eb538/Extensions/combined/src/utils.js#L65C1-L77C2
function getVideoId(url) {
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    if (pathname.startsWith("/clip")) {
        return (document.querySelector("meta[itemprop='videoId']") || document.querySelector("meta[itemprop='identifier']"))
            .content;
    } else {
        if (pathname.startsWith("/shorts")) {
            return pathname.slice(8);
        }
        return urlObject.searchParams.get("v");
    }
}

// from return-youtube-dislike
//https://github.com/Anarios/return-youtube-dislike/blob/928d6df4c73abeefd224a1150b7f4d32668eb538/Extensions/combined/src/utils.js#L94
function isVideoLoaded() {
    const videoId = getVideoId(window.location.href);
    return (
        // desktop: spring 2024 UI
        document.querySelector(`ytd-watch-grid[video-id='${videoId}']`) !== null ||
        // desktop: older UI
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

        let dlBtns = createElementFromHTML("<div style=\"display: flex;flex-direction: column;\"><button style='" + buttonStyle + "' onclick='let API_URL=\"" + apiUrl + "\";" + 'let header = new Headers();header.append("Content-Type", "application/json");fetch(API_URL+"video/queue", {method: "POST",headers: header,body: "{\\"url\\":\\"" + window.location.href + "\\",\\"audioOnly\\":false}"})' + "'>Download Video</button><button style='" + buttonStyle + "' onclick='let API_URL=\"" + apiUrl + "\";" + 'let header = new Headers();header.append("Content-Type", "application/json");fetch(API_URL+"video/queue", {method: "POST",headers: header,body: "{\\"url\\":\\"" + window.location.href + "\\",\\"audioOnly\\":true}"})' + "'>Download Audio</button></div>")

        let descriptionTitle = document.getElementById("actions");
        descriptionTitle.insertAdjacentElement("beforeend", dlBtns)
    }
}