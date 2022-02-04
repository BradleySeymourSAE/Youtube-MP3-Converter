const express = require('express');
const config = require('./config');
const ytdl = require("ytdl-core");
const fs = require('fs');


async function startServer() { 
    const app = express();
    app.listen(5000, () => console.log(`Server started on port 5000`));
    let video_id;
    let options = {};
    options["filter"] = "audioonly";
    try {
       video_id = config["URL"].split("=")[1];
       await ytdl(config["URL"], options)
           .pipe(fs.createWriteStream(`${config["directory"]}/${video_id}.mp3`));
    }
    catch (e)
    {
        console.error(`There was an error while downloading the video: ${e}`);
    }
    return app;
}

startServer().then(() => console.log("Successfully performed the operation"));