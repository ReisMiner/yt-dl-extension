let videos = []
document.addEventListener('DOMContentLoaded', async function () {
    let gallery = document.getElementsByClassName("gallery")[0];

    videos = await (await fetch("http://localhost:8080/video/all", {method: "GET"})).json()
    console.log(videos)

    videos.forEach((vid) => {
        gallery.innerHTML+="<div class=\"card\">\n" +
            "        <h2>"+vid.title+"</h2>\n" +
            "        <h3>"+vid.channel+"</h3>\n" +
            "        <h3>Duration: "+vid.length+"</h3>\n" +
            "        <div>\n" +
            "            <button>download</button>\n" +
            "            <button>delete</button>\n" +
            "        </div>\n" +
            "    </div>"
    })
});

async function deleteVid(id){
    await fetch("http://localhost:8080/video/all", {method: "POST"})
}