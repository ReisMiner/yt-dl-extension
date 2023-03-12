<script>
    import {onMount} from "svelte";
    import {API_URL} from "./config.js";

    let videos = []

    onMount(async () => {
        videos = await (await fetch(API_URL + "video/all", {method: "GET"})).json()
    });

</script>
<h1>Video Gallery</h1>
<div class="gallery">
    {#each videos as vid}
        <div class="card">
            <h2>{vid.title}</h2>
            <h3>{vid.channel}</h3>
            <h3>Duration: {vid.length}</h3>
            <div>
                <a href="{API_URL}video/download?id={vid.id}" download>download</a>
                <button onclick="deleteVid(vid.id)">delete</button>
            </div>
        </div>
    {/each}
</div>

<!--    color palette: https://colorkit.co/palette/252525-494d58-70838a-f35e3e-ffffff/-->
<style>
    h1 {
        margin-top: 20px;
    }

    .gallery {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 20px;
        padding: 20px;
    }

    .card {
        height: 300px;
        width: 400px;
        background-color: #eee;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
        padding: 10px;
        display: flex;
        gap: 10px;
        flex-direction: column;
    }

    .card div {
        margin-top: auto;
        align-self: end;
    }
</style>