module.exports.config = {
  name: "تزوجت",
  aliases: [],
  version: "2.9.0",
  author: "محمد تانجيرو (fixed by TawsiN)",
  countDown: 5,
  role: 2,
  description: { ar: "وضع صورتك مع صورة صديقك مع بعض" },
  category: "edit",
  guide: { ar: "{pn} [@تاغ | رد على رسالة]" }
};

const fs = require('fs');
const axios = require('axios');
const { loadImage, createCanvas } = require('canvas');

function drawCircularImage(ctx, image, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
};

module.exports.onStart = async function ({ api, event, args }) {
  const { senderID, threadID, messageID } = event;
  const imagePath = __dirname + "/images/friends.png";
  const avatarPath1 = __dirname + "/images/profile1.png";
  const avatarPath2 = __dirname + "/images/profile2.png";
  const member1 = senderID;
  if (event.type === "message_reply") { const member2 = event.messageReply.senderID} else if (Object.keys(event.mentions)[0]) { const member2 = Object.keys(event.mentions)[0]}
  if (!member2) { return api.sendMessage("🌹 من فضلك، تاغ لشخص أو رد على رسالته", threadID, messageID)}
try {
  const avatar1 = (await axios.get(`https://graph.facebook.com/${member1}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(avatarPath1, Buffer.from(avatar1, "utf-8"));
  const avatar2 = (await axios.get(`https://graph.facebook.com/${member2}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
  fs.writeFileSync(avatarPath2, Buffer.from(avatar2, "utf-8"));
  const backgroundImg = (await axios.get("https://i.imgur.com/hmKmmam.jpg", { responseType: "arraybuffer" })).data;
  fs.writeFileSync(imagePath, Buffer.from(backgroundImg, "utf-8"));
  const baseImage = await loadImage(imagePath);
  const profileImage1 = await loadImage(avatarPath1);
  const profileImage2 = await loadImage(avatarPath2);
  const canvas = createCanvas(baseImage.width, baseImage.height);
  const ctx = canvas.getContext("2d");
  ctx.drawImage(baseImage, 0, 0, 1024, 712);
  drawCircularImage(ctx, profileImage1, 595, 190, 125);
  drawCircularImage(ctx, profileImage2, 465, 465, 125);
  const finalImageBuffer = canvas.toBuffer();
  fs.writeFileSync(imagePath, finalImageBuffer);
  return api.sendMessage({ body: "🌹 أفضل أصدقاء بالوجود 💙",
														 attachment: fs.createReadStream(imagePath)}, threadID, () => fs.unlinkSync(imagePath), messageID)}
catch (error) { console.error("Error creating friends image:", error);
								api.sendMessage("❌ حدث خطأ أثناء إنشاء صورة الأصدقاء. حاول مرة أخرى لاحقًا.", threadID, messageID)}
finally { if (fs.existsSync(avatarPath1)) fs.unlinkSync(avatarPath1);
					if (fs.existsSync(avatarPath2)) fs.unlinkSync(avatarPath2)}
}
