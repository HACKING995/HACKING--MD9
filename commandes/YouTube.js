const { zokou } = require("../framework/zokou");
const { getytlink, ytdwn } = require("../framework/ytdl-core");
const yts = require("yt-search");
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = '_0x5aff35,_0x1876r';
const fs = require('fs');

zokou({
  nomCom: "play2",
  categorie: "Download",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;
        
        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗 SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer instead of URL
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

zokou({
  nomCom: "song2",
  categorie: "Download",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;
        
        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗 SONG PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer instead of URL
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
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


zokou({
  nomCom: "video2",
  categorie: "Download",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗 VIDEO PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          video: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

zokou({
  nomCom: "videodoc2",
  categorie: "Download",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗 VIDEO PLAYER*\n
╭───────────────◆
│⿻ *Title:* ${apiResult.result.title}
│⿻ *Quality:* ${apiResult.result.type}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          document: { url: videoDlUrl },
          mimetype: 'video/mp4'
        }, { quoted: ms });

      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

zokou({ nomCom: "yts2", categorie: "Recherche", reaction: "✋" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  const query = arg.join(" ");

  if (!query[0]) {
    repondre("Veuillez entrer un terme de recherche s'il vous plaît.");
    return;
  }

  try {
    const info = await yts(query);
    const resultat = info.videos;

    let captions = "";
    for (let i = 0; i < 15; i++) {
      captions += `╭━━⊱𝗛𝗔𝗖𝗞𝗜𝗡𝗚-𝗠𝗗⊱━━╮\n${i + 1}.Titre : ${resultat[i].title}\nDurée : ${resultat[i].timestamp}\nLien : ${resultat[i].url}\n`;
    }
    captions += "\n======\n*powered by Hacking-Md*";

    // repondre(captions)
    zk.sendMessage(dest, { image: { url: resultat[0].thumbnail }, caption: captions }, { quoted: ms });
  } catch (error) {
    repondre("Erreur lors de la procédure : " + error);
  }
});


zokou({
  nomCom: "ytmp32",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { download_url } = apiResult.result;

      await zk.sendMessage(origineMessage, {
        audio: { url: download_url },
        mimetype: 'audio/mpeg'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});



zokou({
  nomCom: "ytv2mp33",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp3v2?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { url } = apiResult;

      await zk.sendMessage(origineMessage, {
        audio: { url: url },
        mimetype: 'audio/mpeg'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});



zokou({
  nomCom: "ytmp42",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { download_url } = apiResult.result;

      await zk.sendMessage(origineMessage, {
        video: { url: download_url },
        mimetype: 'video/mp4'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});



zokou({
  nomCom: "ytv2mp42",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp4v2?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { url } = apiResult;

      await zk.sendMessage(origineMessage, {
        video: { url: url },
        mimetype: 'video/mp4'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});



zokou({
  nomCom: "ytmp4doc2",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { download_url } = apiResult.result;

      await zk.sendMessage(origineMessage, {
        document: { url: download_url },
        mimetype: 'video/mp4'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});


zokou({
  nomCom: "ytmp3doc2",
  categorie: "Téléchargement",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Veuillez insérer un lien YouTube s'il vous plaît.");
    return;
  }

  try {
    const videoUrl = arg.join(" ");
    const apiUrl = `${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;

    const apiResponse = await fetch(apiUrl);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 200 && apiResult.success) {
      const { download_url } = apiResult.result;

      await zk.sendMessage(origineMessage, {
        document: { url: download_url },
        mimetype: 'audio/mpeg'
      }, { quoted: ms });

      repondre('Téléchargement réussi thomas...');
    } else {
      repondre('Échec du téléchargement de l\'audio. Veuillez réessayer plus tard.');
    }
  } catch (error) {
    console.error('Erreur de l\'API :', error);
    repondre('Une erreur est survenue lors de la recherche ou du téléchargement de l\'audio.');
  }
});
