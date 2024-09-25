module.exports.config = {
                  name: "تصميمات",
	          aliases: ["تصاميم","تصميم"],
                  version: "1.3",
	          author: "محمد تانجيرو",
                  countDown: 3,
	          role: 0,
	          description: { ar: "تصميمات لفيديوهات أنمي راائعة" },
	          category: "pictures",
	          guide: { ar: "{pn}" }
                        };

const fs = require('fs');
const axios = require('axios');

module.exports.onStart = async function ({ api, event, args }) {
    const videos = [ 
	    { video: "https://i.imgur.com/C2zmqiF.mp4" },
            { video: "https://i.imgur.com/e2hEV80.mp4" },
                   ];

    const randomvideo = videos[Math.floor(Math.random() * videos.length)];
    const video = await axios.get(randomvideo.video, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/designs.mp4", Buffer.from(video.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/designs.mp4")];
    const message = `🌹  تصيمات أنمي روعة  🌹\n༺_ فيديوهات قصيرة _༻\n♡- عدد الفيديوهات: ${videos.length} -♡`;
    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
                                                               };
