module.exports.config = {
                name: "مطلوب",
         	version: "1.3",
		author: "محمد تانجيرو",
         	countDown: 3,
            	role: 0,
            	description: { ar: "وضع صورتك، أو صورة الي تعمل له تاغ، أو صورة الي ترد عليه في منشور مطلوب" },
	  	category: "edit",
	    	guide: { ar: "{pn} أو {pn} [@تاغ] {pn} [رد]" }
                         };
const fs = require('fs');
const axios = require('axios');
const { loadImage, createCanvas } = require('canvas');
module.exports.onStart = async function ({ api, event, args }) {
  let { senderID, threadID, messageID } = event;
  let pathImg = __dirname + "/cache/wanted.png";
  let pathAva = __dirname + "/cache/avatar.png";
  if (!args[0]) { var uid = senderID}
  if(event.type == "message_reply") { uid = event.messageReply.senderID }
  if (args.join().indexOf('@') !== -1){ var uid = Object.keys(event.mentions) } 
  let Avatar = (
    await axios.get( `https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
  let getWanted = (
    await axios.get(`https://i.imgur.com/QrYoP8F.jpeg`, { responseType: "arraybuffer", })).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(pathAva);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, 144, 500, 1090, 920);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
