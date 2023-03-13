# yt-dl-extension

This is a frontend for the [yt-dl-service](https://github.com/ReisMiner/yt-dl-service)

For added convenience it's a browser extension that integrates into youtube.

## how to build extension.zip?

go to the svelte-extension folder
```
cd ./svelte-extension
```

then install the node modules
```
npm install
```

afterwards you can build the extension (yes there is already stuff in the output dir cuz i forgor to make .gitignore :) )
```
npm run build
```
the files will be in `./svelte-extension/public`

zip all the files in the dir, add as temporary addon in firefox by going to `about:debugging` and enjoy

## how to use?

if its loaded, go to the extension icon and click it. a new tab should open.

in the top right corner, specify the api url on which the [yt-dl-service](https://github.com/ReisMiner/yt-dl-service) is running and click save

then go to youtube, view a video and in the top of the description you should see two new links. "Download Video" and "Download Audio".

clicking these two will either schedule the audio or video download in the backend (yt-dl-service).

if you go back to the extension page, you see that there is a new card in the gallery. you can download the video to your pc now