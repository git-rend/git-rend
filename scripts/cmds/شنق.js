module.exports.config = {
                name: "شنش",
	        aliases:["اشنقي","إشنقي"], 
         	version: "2.7.7",
		author: "محمد تانجيرو",
         	countDown: 5,
            	role: 2,
            	description: { ar: "تشنق نفسك أو الشخص الي تعمل له تاغ" },
	  	category: "edit",
	    	guide: { ar: "{pn} [@تاغ | فارغ]" }, 
	/*dependencies: {
	  "fs-extra": "",
	  "axios": "",
	  "canvas" :"",
	  "jimp": "",
	  "node-superfetch": ""
	}*/
};

module.exports.circle = async (image) => {
	  const jimp = require ('jimp');
  	image = await jimp.read(image);
  	image.circle();
  	return await image.getBufferAsync("image/png");
};

module.exports.onStart = async ({ event, api, args }) => {
try {
  const Canvas = require ('canvas');
  const request = require ("node-superfetch");
  const jimp = require ("jimp");
  const fs = require ("fs-extra");
  var path_toilet = __dirname+'/cache/damma.jpg'; 
  var id = Object.keys(event.mentions)[0] || event.senderID;
  const canvas = Canvas.createCanvas(500, 670);
	const ctx = canvas.getContext('2d');
	const background = await Canvas.loadImage('https://i.imgur.com/fZZ5y39.jpg');
  
	var avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
	avatar = await this.circle(avatar.body);
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 210, 120, 85, 85);
	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(path_toilet,imageBuffer);
	 api.sendMessage({attachment: fs.createReadStream(path_toilet, {'highWaterMark': 128 * 1024}), body: `💙✨ تم الشنق 😥 ✨💙`}, event.threadID, () => fs.unlinkSync(path_toilet), event.messageID);
}
catch(e) {api.sendMessage(e.stack, event.threadID )}
}
