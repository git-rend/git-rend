
const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');

// Clé API YouTube
const API_KEY = 'AIzaSyB9qShTA1lPNfw-Vfodp6ZaR_yqQ87HWoI';

module.exports = {
  config: {
    name: "يوتيوب",
    version: "1.2", // Version mise à jour
    role: 0,
    author: "Cid Kageno", // Auteur modifié
    cooldowns: 40,
    description: { ar: "Send YouTube video"},
    category: "video",
    guide: { ar: "{pn} video name"},
    dependencies: {
      "fs-extra": "",
      "axios": "",
      "ytdl-core": ""
    }
  },

  onStart: async ({ api, event }) => {
    const input = event.body;
    const data = input.split(" ");

    if (data.length < 2) {
      return api.sendMessage("⚠ **Erreur :** Vous devez spécifier un nom de vidéo. Exemple : `{pn} chat mignon`", event.threadID);
    }

    data.shift();
    const videoName = data.join(" ");

    try {
      api.sendMessage(`🔍 | Recherche de la vidéo pour "${videoName}" en cours...\n⏳ | Veuillez patienter...`, event.threadID);

      // Requête API YouTube
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: videoName,
          type: 'video',
          maxResults: 1,
          key: API_KEY
        }
      });

      const video = response.data.items[0];
      if (!video) {
        return api.sendMessage("❌ **Aucune vidéo trouvée.**\n🔍 **Pour :** *\"" + videoName + "\"*", event.threadID, event.messageID);
      }

      const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;
      console.log('Video URL:', videoUrl); // Pour débogage

      const stream = ytdl(videoUrl, { filter: 'audioandvideo' });

      const fileName = `${event.senderID}.mp4`;
      const filePath = __dirname + `/cache/${fileName}`;

      // Crée le dossier /cache s'il n'existe pas
      if (!fs.existsSync(__dirname + '/cache')) {
        fs.mkdirSync(__dirname + '/cache');
      }

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Téléchargement en cours !');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Téléchargement de la vidéo : ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Téléchargement terminé');

        if (fs.statSync(filePath).size > 26214400) {
          fs.unlinkSync(filePath);
          return api.sendMessage('⚠ **Le fichier dépasse 25 Mo et ne peut pas être envoyé.**', event.threadID);
        }

        const message = {
          body: `🎬 **Voici votre vidéo !**\n\n📹 **Titre :** *${video.snippet.title}*\n🗓️ **Publié le :** *${video.snippet.publishedAt}*\n🔗 **Regarder :** [Cliquez ici](${videoUrl})\n\n🔄 **N\'hésitez pas à demander d\'autres vidéos !**`,
          attachment: fs.createReadStream(filePath)
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error.response ? error.response.data : error.message); // Pour débogage
      api.sendMessage('⚠ **Une erreur est survenue lors du traitement de la commande.** Veuillez réessayer plus tard.', event.threadID);
    }
  }
};
