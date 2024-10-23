module.exports.config = {
                  name: "صورة",
                  version: "1.1.2",
                  role: 0,
                  countDown: 5,
                  author: "محمد تانجيرو",
                  description: "يرسل لك صورة: حسابك / الغروب / الي تعمل له تاغ / الي ترد على رسالته",
                  category: "𝔾ℝ𝕆𝕌ℙ",
                  guide: "",
                  dependencies: {
                        "request": "",
                        "fs": ""
                        }       };

module.exports.onStart = async({api,event,args}) => {
    const fs = require ("fs-extra");
    const request = require ("request");
    const threadSetting = global.data.threadData.get(parseInt(event.threadID)) || {};
    const prefix = (threadSetting.hasOwnProperty("PREFIX")) ? threadSetting.PREFIX : global.GoatBot.config.PREFIX;
     if (args.length == 0) return api.sendMessage(`✨ - استخدم هذه الأوامر - ✨\nا----------💙----------💙----------ا\n\n           ${prefix}${this.config.name} الحساب\n✨ ترسل لك صورة حسابك ✨\n\n      ${prefix}${this.config.name} الحساب @[تاغ]\n✨ ترسل لك صورة الشخص المشار إليه ✨\n\n${prefix}${this.config.name} الحساب [رد على رسالة]\n✨ ترسل لك صورة الشخص الي ترد على رسالته ✨\n\n           ${prefix}${this.config.name} الغروب\n✨ ترسل لك صورة الغروب ✨`, event.threadID, event.messageID);
    if (args[0] == "الغروب") {
           if(args[1]){ let threadInfo = await api.getThreadInfo(args[1]);
           let imgg = threadInfo.imageSrc;
       if(!imgg) api.sendMessage(` ${threadInfo.threadName} `,event.threadID,event.messageID);
        else var callback = () => api.sendMessage({body:` ${threadInfo.threadName} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID); 
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
      
      }
          
            let threadInfo = await api.getThreadInfo(event.threadID);
            let img = threadInfo.imageSrc;
          if(!img) api.sendMessage(`✨ الغروب ما عنده صورة ✨`,event.threadID,event.messageID)
          else  var callback = () => api.sendMessage({body:` ${threadInfo.threadName} `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);   
      return request(encodeURI(`${threadInfo.imageSrc}`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    
      };


if (args[0] == "الحساب") { 
    if(!args[1]){
    if(event.type == "message_reply") id = event.messageReply.senderID
    else id = event.senderID;
    let data = await api.getUserInfo(id);
    let name = await data[id].name;
    var callback = () => api.sendMessage({body:` `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID); 
       return request(encodeURI(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
   }
    else {
    if (args.join().indexOf(`@${args}`) !== 1){
    var mentions = Object.keys(event.mentions)
    let data = await api.getUserInfo(mentions);--+
    let name = await data[mentions].name;
    var callback = () => api.sendMessage({body:`  ${name}  `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${mentions}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
    else {
    let data = await api.getUserInfo(args[1]);
    let name = await data[args[1]].name;
    var callback = () => api.sendMessage({body:` ${name}  `,attachment: fs.createReadStream(__dirname + "/cache/1.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.png"),event.messageID);   
       return request(encodeURI(`https://graph.facebook.com/${args[1]}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`)).pipe(fs.createWriteStream(__dirname+'/cache/1.png')).on('close',() => callback());
    }
     }
     }
      }
