module.exports.config = {
                  name: "تجريب",
                  aliases: ["موضة"],
		  version: "1.3",
		  author: "محمد تانجيرو",
		  countDown: 60,
		  role: 2,
		  description: { ar: " " },
		  category: "money",
		  guide: { ar: "{pn}" },
//      dependencies: { canvas: "", axios: "", "fs-extra": ""}
};

/*module.exports.*/function circle /*= async*/ (image) => {
    const jimp = require ("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
module.exports.onStart = async function ({ api, event, args, Users }) {
  let { senderID, threadID, messageID } = event;
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${event.threadID}_${event.senderID}.png`;
  let pathAva = __dirname + `/cache/a${event.senderID}.png`;
  let Avatar = (await axios.get(`https://graph.facebook.com/${event.senderID}/picture?height=500&width=500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
  avatar = (await this.circle(pathAva));
  let getWanted = (await axios.get(`https://api.popcat.xyz/drip?image=https://i.imgur.com/e3YvQWP.jpg`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));
  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(avatar);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, 320, 80, 239, 239);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAva);
  return api.sendMessage(
    { attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
