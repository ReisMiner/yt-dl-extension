export const buttonStyle = "margin-left: 10px; background:none; color:#0288D1; border:none;font-family: \"Roboto\",\"Arial\",sans-serif;font-size: 1.4rem;line-height: 2rem;font-weight: 400;cursor:pointer;";
export const API_URL = "http://localhost:18080/";

export const dlVidFunction =
    function dlVid() {
        let header = new Headers();
        header.append("Content-Type", "application/json");
        fetch(API_URL + "video/queue", {
            method: "POST",
            headers: header,
            body: "{\"url\":\"" + window.location.href + "\",\"audioOnly\":false}"
        })
    }