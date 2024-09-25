module.exports.config = {
	              	name: "الاموال",
              		aliases: ["الأموال"],
              		version: "1.2",
              		author: "NTKhang",
	              	countDown: 5,
	               	role: 0,
              		description: { ar: "عرض أموالك أو أموال العضو الي تعمل له تاغ" },
	              	category: "economy",
	              	guide: { ar: "   {pn}: لعرض رصيدك"
		                      		+ "\n   {pn} <@tag>: لعرض رصيد العضو الي تعمل له تاغ" }
};

module.exports.onStart = async function({ api, event, args, usersData, Users }) {
  const { threadID, messageID, senderID, mentions } = event;
  const fs = require('fs');
  const axios = require('axios')
 if(!fs.existsSync(__dirname+'/text/SplineSans-Medium.ttf')) { 
      let getfont = (await axios.get(`https://drive.google.com/u/0/uc?id=102B8O3_0vTn_zla13wzSzMa-vdTZOCmp&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/text/SplineSans-Medium.ttf", Buffer.from(getfont, "utf-8"));
    };
    if(!fs.existsSync(__dirname+'/text/SplineSans.ttf')) { 
      let getfont2 = (await axios.get(`https://drive.google.com/u/0/uc?id=1--V7DANKLsUx57zg8nLD4b5aiPfHcmwD&export=download`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+"/text/SplineSans.ttf", Buffer.from(getfont2, "utf-8"));
    };
if (event.messageReply) {
    var reply = event.messageReply.senderID;
    var name = await usersData.getName(reply);
    var money = await usersData.getMoney(reply);
    if (!money) money = 0;
var argss = `${money}`;
}
else if (Object.keys(event.mentions).length == 1) {
    var mention = Object.keys(event.mentions);
    const Money = await usersData.get(mention, "money")};
    if (!money) money = 0;
    var argss = `${money}`;
    var name = (await usersdata.getName(mention))
  } else {
    var name = (await usersdata.getName(senderID));
    var data = await usersData.get(senderID);
    var money = data.money
    if (!money) money = 0;
var argss = `${money}`;
  }
   const { loadImage, createCanvas } = require("canvas");
    let path = __dirname + "/cache/money.png";
    let bg = (await axios.get(`https://i.imgur.com/xj9Jsl3.jpg`, {responseType: "arraybuffer" })).data;
    fs.writeFileSync(path, Buffer.from(bg, "utf-8"));
           let bgBase = await loadImage(path);
    let canvas = createCanvas(bgBase.width, bgBase.height);
    let ctx = canvas.getContext("2d");
    const Canvas = require("canvas");
    ctx.drawImage(bgBase, 0, 0, canvas.width, canvas.height);
    Canvas.registerFont(__dirname+`/text/SplineSans-Medium.ttf`, {
        family: "SplineSans-Medium"
    });
    Canvas.registerFont(__dirname+`/text/SplineSans.ttf`, {
        family: "SplineSans"
    });
    ctx.font = "75px SplineSans-Medium";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText('' + argss.replace(/\B(?=(\d{3})+(?!\d))/g, '') + ' $', 300, 310);
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(path, imageBuffer);
       var msg =  {body: `يبلغ رصيد  ${name} :\n       ا[ ${money} $ ]ا`, attachment: fs.createReadStream(path)
    }
   return api.sendMessage(msg,  threadID, async (error, info) => {
    fs.unlinkSync(path),
        messageID
      })
      }
