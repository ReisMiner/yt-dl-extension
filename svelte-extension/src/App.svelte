<script>
    import {onMount} from "svelte";

    let videos = []
    let inputUrl = ""

    onMount(async () => {
        let x = await fetch("video/all", {method: "GET"})
        browser.storage.sync.get(['api_url'], async function(result) {
            if(result.api_url !== undefined || result.api_url !== null || result.api_url !== ""){
                inputUrl = result.api_url;
                videos = await (await fetch(result.api_url + "video/all", {method: "GET"})).json()
            }
        });

    });

    function save() {
        browser.storage.sync.set({api_url: inputUrl});
        window.location.reload();
    }
</script>
<header>
    <h1>Video Gallery</h1>
    <input type="text" placeholder="API URL. example: http://localhost:18080/" bind:value={inputUrl}>
    <button on:click={save}>Save</button>
</header>
<div class="gallery">
    {#each videos as vid}
        <div class="card">
            <h2>{vid.title}</h2>
            <h3>{vid.channel}</h3>
            <h3>Duration: {vid.length}</h3>
            <div>
                <a href="{inputUrl}video/download?id={vid.id}" download>download</a>
                <button>delete</button>
            </div>
        </div>
    {/each}
</div>

<!--    color palette: https://colorkit.co/palette/252525-494d58-70838a-f35e3e-ffffff/-->
<style>
    header {
        display: flex;
        flex-direction: row;
        margin-top: 20px;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    header input {
        height: 50px;
        width: 400px;
        margin-left: auto;
    }

    header button {
        height: 50px;
    }

    .gallery {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 20px;
        gap: 20px;
    }

    .card {
        height: 300px;
        width: 400px;
        background-color: #eee;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.20);
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .card div {
        margin-top: auto;
        align-self: end;
    }

    h2, h3 {
        margin: 0;
        padding: 0;
    }
</style>