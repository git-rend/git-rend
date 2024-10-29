module.exports.config = {
  name: "اصدقاء",
  aliases: ["أصدقاء"],
  version: "2.9.0",
  author: "TawsiN",
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
  const { senderID, threadID, messageID } = event;
  const imagePath = __dirname + "/images/friends.png";
  const avatarPath1 = __dirname + "/images/profile1.png";
  const avatarPath2 = __dirname + "/images/profile2.png";

  // Determine the two users for the "Best Friends" image
  const member1 = senderID;
  let member2;

  if (event.type === "message_reply") {
    member2 = event.messageReply.senderID;
  } else if (Object.keys(event.mentions)[0]) {
    member2 = Object.keys(event.mentions)[0];
  }

  if (!member2) {
    return api.sendMessage("🌹 من فضلك، تاغ لشخص أو رد على رسالته", threadID, messageID);
  }

  try {
    // Fetch avatars of both members
    const avatar1 = (await axios.get(`https://graph.facebook.com/${member1}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    const avatar2 = (await axios.get(`https://graph.facebook.com/${member2}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(avatarPath1, Buffer.from(avatar1, "utf-8"));
    fs.writeFileSync(avatarPath2, Buffer.from(avatar2, "utf-8"));

    // Download the background template
    const backgroundImg = (await axios.get("https://i.imgur.com/hmKmmam.jpg", { responseType: "arraybuffer" })).data;
    fs.writeFileSync(imagePath, Buffer.from(backgroundImg, "utf-8"));

    // Load images for canvas
    const baseImage = await loadImage(imagePath);
    const profileImage1 = await loadImage(avatarPath1);
    const profileImage2 = await loadImage(avatarPath2);

    // Create canvas and context
    const canvas = createCanvas(baseImage.width, baseImage.height);
    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(baseImage, 0, 0, 1024, 712);

    // Draw the first profile image in a circular mask
    drawCircularImage(ctx, profileImage1, 595, 190, 125);

    // Draw the second profile image in a circular mask
    drawCircularImage(ctx, profileImage2, 465, 465, 125);

    // Export the final image buffer
    const finalImageBuffer = canvas.toBuffer();
    fs.writeFileSync(imagePath, finalImageBuffer);

    // Send the styled "Best Friends" image
    return api.sendMessage(
      {
        body: "🌹 أفضل أصدقاء بالوجود 💙",
        attachment: fs.createReadStream(imagePath)
      },
      threadID,
      () => fs.unlinkSync(imagePath),
      messageID
    );

  } catch (error) {
    console.error("Error creating friends image:", error);
    api.sendMessage("❌ حدث خطأ أثناء إنشاء صورة الأصدقاء. حاول مرة أخرى لاحقًا.", threadID, messageID);
  } finally {
    // Clean up temporary files
    if (fs.existsSync(avatarPath1)) fs.unlinkSync(avatarPath1);
    if (fs.existsSync(avatarPath2)) fs.unlinkSync(avatarPath2);
  }
}

// Function to draw a circular image with a clipping path
function drawCircularImage(ctx, image, x, y, radius) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
  ctx.restore();
	    }





/*module.exports.config = {
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
  if (!Member2) { return api.sendMessage("🌹 تاغ لشخص أو رد على رسالته", threadID, messageID)}
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
  ctx.drawImage(baseImage, 0, 0,canvas.width1024,canvas.height)712);
  ctx.drawImage(baseprof1, 470, 65, 250, 250);
  ctx.drawImage(baseprof2, 340, 340, 250, 250);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  return api.sendMessage( { body: "🌹 أفضل أصدقاء بالوجود 💙", attachment: fs.createReadStream(pathImg)}, threadID, () => fs.unlinkSync(pathImg), messageID)
}*/
