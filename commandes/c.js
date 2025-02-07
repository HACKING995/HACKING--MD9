const { zokou } = require("../framework/zokou");
const axios = require("axios");
const yts = require("yt-search");

zokou({
    nomCom: "play4",
    categorie: "Download",
    reaction: "💿"
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg } = commandeOptions;

    if (!arg[0]) {
        repondre("Please insert a song name.");
        return;
    }

    try {
        const searchTerm = arg.join(" ");
        const searchResults = await yts(searchTerm);
        const videos = searchResults.videos;

        if (videos && videos.length > 0) {
            const videoUrl = videos[0].url;

            // Call the API endpoint to fetch audio download URL
            const apiResponse = await axios.get(`${global.giftedApi}/download/dlmp3?apikey=${global.giftedKey}&url=${videoUrl}`);
            const apiResult = apiResponse.data;

            if (apiResult.result && apiResult.result.download_url) {
                const audioDlUrl = apiResult.result.download_url;
                const fileName = apiResult.result.title;

                // Prepare the message with song details
                const infoMess = {
                    image: { url: videos[0].thumbnail },
                    caption: `*𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗 SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* mp3 (128kbps)
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
                };

                // Send song details
                await zk.sendMessage(dest, infoMess, { quoted: ms });

                // Send the audio
                await zk.sendMessage(dest, {
                    audio: { url: audioDlUrl },
                    mimetype: 'audio/mp4'
                }, { quoted: ms });
            } else {
                repondre('Failed to download audio. Please try again later.');
            }
        } else {
            repondre('No audio found.');
        }
    } catch (error) {
        console.error('Error from API:', error);
        repondre('An error occurred while searching or downloading the audio.');
    }
});
