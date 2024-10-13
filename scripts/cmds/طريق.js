module.exports.config = {
                name: "طريق",
	        aliases:[""], 
         	version: "2.7.7",
		author: "محمد تانجيرو",
         	countDown: 5,
            	role: 0,
            	description: { ar: "وضع صورتك مع صورة صديقك مع بعض" },
	  	category: "edit",
	    	guide: { ar: "{pn} [@تاغ | رد على رسالة]" }
                         };

module.exports.circle = async (image) => {
	const jimp = require ('jimp');
  	image = await jimp.read(image);
  	image.circle();
  	return await image.getBufferAsync("image/png");
};

module.exports.onStart = async ({ event, api, args, Users }) => {
try {
  const Canvas = require ('canvas');
  const request = require ("node-superfetch");
  const jimp = require ("jimp");
  const fs = require ("fs-extra");
  var path_toilet = __dirname+'/cache/damma.jpg'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://i.imgur.com/pfhHYzo.png');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 160, 300, 160, 160);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path_toilet,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(path_toilet, {'highWaterMark': 128 * 1024}), body: "💙✨ أنا في الطريق ✨💙"}, event.threadID, () => fs.unlinkSync(path_toilet), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}
