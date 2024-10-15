module.exports.config = {
                name: "نامي",
         	version: "1.3",
		author: "محمد تانجيرو",
         	countDown: 3,
            	role: 0,
            	description: { ar: "إرسال صور أماناي من أنمي جوجوتسو كايسن" },
	  	category: "pictures",
	    	guide: { ar: "{pn}" }
                         };

const fs = require('fs');
const axios = require('axios');

module.exports.onStart = async function ({ api, event, args }) {
    const pictures = [
      "https://i.imgur.com/zblmM5W.jpeg",
      "https://i.imgur.com/w64bq1r.jpeg",
      "https://i.imgur.com/ggRa8MB.jpeg",
      "https://i.imgur.com/L5PPDkU.jpeg",
      "https://i.imgur.com/7ZchUqA.jpeg",
      "https://i.imgur.com/P458325.jpeg",
      "https://i.imgur.com/ydbCU9o.jpeg",
      "https://i.imgur.com/6YVrYkA.jpeg",
      "https://i.imgur.com/1YGdQIC.jpeg",
      "https://i.imgur.com/X76hcLB.jpeg",
      "https://i.imgur.com/UMSETF5.jpeg",
      "https://i.imgur.com/kiMnDSb.jpeg",
      "https://i.imgur.com/cjmSDIx.jpeg",
      "https://i.imgur.com/pTkdNjY.jpeg",
      "https://i.imgur.com/h82bNP2.jpeg",
      "https://i.imgur.com/hfckHhW.jpeg",
      "https://i.imgur.com/6DS8ZkP.jpeg",
      "https://i.imgur.com/AqB8G6T.jpeg",
      "https://i.imgur.com/FrKiFU2.jpeg",
      "https://i.imgur.com/sGKBYYW.jpeg",
      "https://i.imgur.com/vQ04JCD.jpeg",
      "https://i.imgur.com/5hrfjaG.jpeg",
      "https://i.imgur.com/ZuwSK38.jpeg",
      "https://i.imgur.com/56aa1Qd.jpeg",
      "https://i.imgur.com/Z4feH3y.jpeg",
      "https://i.imgur.com/iBXk6u2.jpeg",
      "https://i.imgur.com/kmjdaM0.jpeg",
      "https://i.imgur.com/19QFy0W.jpeg",
      "https://i.imgur.com/idCOWXN.jpeg",
      "https://i.imgur.com/cVFohDd.jpeg",
      "https://i.imgur.com/mX1bXBT.jpeg",
      "https://i.imgur.com/DjXmAoK.jpeg",
      "https://i.imgur.com/ifv2Kd0.jpeg",
      "https://i.imgur.com/VH12bm1.jpeg",
      "https://i.imgur.com/UfAGNfd.jpeg",
      "https://i.imgur.com/lfMCUwo.jpeg",
      "https://i.imgur.com/uxu85mk.jpeg",
      "https://i.imgur.com/4QGYWBT.jpeg",
      "https://i.imgur.com/vxoB2Qe.jpeg",
      "https://i.imgur.com/brpTUIj.jpeg",
      "https://i.imgur.com/txDvCuu.jpeg",
      "https://i.imgur.com/pyoykdG.jpeg",
      "https://i.imgur.com/QZRjgEP.jpeg",
      "https://i.imgur.com/UX843g8.jpeg",
      "https://i.imgur.com/8U8W9ey.jpeg",
      "https://i.imgur.com/HYJU0kP.jpeg",
      "https://i.imgur.com/NjwaaEh.jpeg",
      "https://i.imgur.com/GkOCzuN.jpeg",   
      "https://i.imgur.com/bQdtnXa.jpeg",
      "https://i.imgur.com/OiUXS2h.jpeg",
      "https://i.imgur.com/ZHrKwAt.jpeg"   
    ];

    const randomimage = pictures[Math.floor(Math.random() * pictures.length)];
    const image = await axios.get(randomimage, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/nami.jpg", Buffer.from(image.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/nami.jpg")];
    const message = `✨      صور نامي      💙\n   من أنمي ون بيس ✨\n🌹 عدد الصور : ${pictures.length} 🌹\n       ---------------------\n            -100 $!`;
    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
};
