module.exports.config = {
                name: "اصدقاء",
	        aliases:["أصدقاء"], 
         	version: "2.8.7",
		author: "محمد تانجيرو",
         	countDown: 5,
            	role: 0,
            	description: { ar: "وضع صورتك مع صورة صديقك مع بعض" },
	  	category: "edit",
	    	guide: { ar: "{pn} [@تاغ | رد على رسالة]" }
                         };

const fs = require('fs');
const axios = require('axios');
const { loadImage, createCanvas } = require('canvas');

module.exports.onStart = async function ({ api, event, args }) {
  let { senderID, threadID, messageID } = event;
  let pathImg = __dirname + "/images/friends.png";
  let pathprof1 = __dirname + "/images/profile1.png";
  let pathprof2 = __dirname + "/images/profile2.png";
  var Member1 = senderID;
  if (event.type == "message_reply") { var Member2 = event.messageReply.senderID }
  if (Object.keys(event.mentions)[0]) { var Member2 = Object.keys(event.mentions) }
  if (!Member2) { return api.sendMessage("تاغ لشخص أو رد على رسالته", threadID, messageID)}
  let Avatar1 = ( await axios.get(`https://graph.facebook.com/${Member1}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathprof1, Buffer.from(Avatar1, "utf-8"));
  let Avatar2 = ( await axios.get(`https://graph.facebook.com/${Member2}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathprof2, Buffer.from(Avatar2, "utf-8"));
  let getimage = ( await axios.get(`https://i.imgur.com/hmKmmam.jpg`, { responseType: "arraybuffer", })).data;
  fs.writeFileSync(pathImg, Buffer.from(getimage, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let baseprof1 = await loadImage(pathprof1);
  let baseprof2 = await loadImage(pathprof2);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0,/*canvas.width*/1024,/*canvas.height)*/712);
  ctx.drawImage(baseprof1, 470, 65, 250, 250);
  ctx.drawImage(baseprof2, 340, 340, 250, 250);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage( { body: "🌹 أفضل أصدقاء بالوجود 💙", attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
