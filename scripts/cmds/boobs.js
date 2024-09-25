const axios = require("axios");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "boobs",
    version: "1.0",
    author: "JISHAN76",
    countDown: 5,
    role: 0,
    description: { ar: ""},
    category: "test",
    guide: { ar: " {pn} "},
  },
  onStart: async function ({ api, event, Threads, Users }) {
    let apiUrl = "http://api.nekos.fun:8080/api/boobs";
    
    let response = await axios.get(apiUrl);
    let kissUrl = response.data.image;
    
    let kissGif = (await axios.get(kissUrl, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/kiss.gif", Buffer.from(kissGif));

    var imglove = [];
    imglove.push(fs.createReadStream(__dirname + "/cache/kiss.gif"));

    var mentionedUserID = Object.keys(event.mentions)[0];
    let mentionedUserData = await api.getUserInfo(mentionedUserID);
    let mentionedUserName = mentionedUserData[mentionedUserID].name;
  
    var msg = {
      body: `damn big 😱  ${mentionedUserName}!`,
      attachment: imglove,
    };

    return api.sendMessage(msg, event.threadID, event.messageID);
  },
};
