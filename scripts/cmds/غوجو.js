module.exports.config = {
                name: "غوجو",
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
"https://i.imgur.com/ex5rYTW.jpeg",
"https://i.imgur.com/DUgx742.jpeg",
"https://i.imgur.com/9evPSVx.jpeg",
"https://i.imgur.com/YbPN6Cj.jpeg",
"https://i.imgur.com/rvQ3Lzx.jpeg",
"https://i.imgur.com/Hw12zud.jpeg",
"https://i.imgur.com/Hx6ePcO.jpeg",
"https://i.imgur.com/3JrrHWm.jpeg",
"https://i.imgur.com/RbjvCMf.jpeg",
"https://i.imgur.com/B5r6HmA.jpeg",
"https://i.imgur.com/jm0rRLw.jpeg",
"https://i.imgur.com/EHOAIBr.jpeg",
"https://i.imgur.com/oZkFxj8.jpeg",
"https://i.imgur.com/9otwuJi.jpeg",
"https://i.imgur.com/Ec1CubD.jpeg",
"https://i.imgur.com/WltPCWY.jpeg",
"https://i.imgur.com/QErJRiv.png",
"https://i.imgur.com/nVdAxgT.png",
"https://i.imgur.com/AcBicWS.png",
"https://i.imgur.com/nYHDRtw.png",
"https://i.imgur.com/PsE2j75.png",
"https://i.imgur.com/taOVi3D.jpeg",
"https://i.imgur.com/SqHzpsr.jpeg",
"https://i.imgur.com/eUOpB13.jpeg",
"https://i.imgur.com/5Su8Ro7.jpeg",
    ];

    const randomimage = pictures[Math.floor(Math.random() * pictures.length)];
    const image = await axios.get(randomimage, { responseType: "arraybuffer" });
    fs.writeFileSync(__dirname + "/cache/gojo.jpg", Buffer.from(image.data, "binary"));

    const attachment = [fs.createReadStream(__dirname + "/cache/gojo.jpg")];
    const message = `✨        صور غوجو        💙\nمن أنمي جوجوتسو كايسن✨\n    🌹 عدد الصور : ${pictures.length} 🌹\n         -----------------------\n               -100$ !`;
    api.sendMessage({ body: message, attachment }, event.threadID, event.messageID);
};
