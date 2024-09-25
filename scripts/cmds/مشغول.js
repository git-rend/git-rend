module.exports.config = {
                name: "مشغول",
		version: "1.3",
            	author: "محمد تانجيرو",
            	countDown: 5,
	    	role: 0,
            	description: { ar: "وضع مشغول، لمنع التاغات" },
	    	category: "edit",
    		guide: { ar: "{pn} [سبب الإنشغال]" }
                         };

const busyPath = __dirname + '/text/busy.json';
const fs = require('fs');

/*({ api, threadModel, userModel, dashBoardModel, globalModel, threadsData, usersData, dashBoardData, globalData })*/
module.exports.onLoad = () => {
  if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
}
module.exports.onChat = async function({ api, event, usersData }) {
    if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
    let busyData = JSON.parse(fs.readFileSync(busyPath));
    var { senderID, threadID, messageID, mentions } = event;
    if (senderID in busyData) {
        var info = busyData[senderID];
        delete busyData[senderID];
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
        return api.sendMessage(`💙✨ مرحبا بعودتك ✨💙`, threadID, () => {
            if (info.tag.length == 0) api.sendMessage("مافي أي شخص عملك تاغ 😌", threadID);
            else {
                var msg = "";
                for (var i of info.tag) {
                    msg += `${i}\n`
                }
                api.sendMessage("✨ أسماء الأعضاء الي عملوا لك تاغ، وعدد التاغات لكل عضو✨\n\n" + msg, threadID)
            }
        }, messageID);
    }

    if (!mentions || Object.keys(mentions).length == 0) return;
    
    for (const [ID, name] of Object.entries(mentions)) {
        if (ID in busyData) {
            var infoBusy = busyData[ID], mentioner = await usersData.getName/*User*/(senderID), replaceName = event.body.replace(`${name}`, "");
            infoBusy.tag.push(`${mentioner}: ${replaceName == "" ? "تاغ واحد فقط 😆" : replaceName}`)
            busyData[ID] = infoBusy;
            fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
            return api.sendMessage(
`${name.replace("@", "")} مشغول حاليا ${infoBusy.lido ? `✨السبب : ${infoBusy.lido}✨` : "."}`, threadID, messageID);
        }
    }
}

module.exports.onStart = async function({ api, event, args, usersData }) {
    //if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
    await new Promise(resolve => setTimeout(resolve, 1000));
    let busyData = JSON.parse(fs.readFileSync(busyPath));
    const { threadID, senderID, messageID, body } = event;
    var content = args.join(" ") || "";
    if (!(senderID in busyData)) {
        busyData[senderID] = {
            lido: content,
            tag: []
        }
	if (!fs.existsSync(busyPath)) fs.writeFileSync(busyPath, JSON.stringify({}));
        fs.writeFileSync(busyPath, JSON.stringify(busyData, null, 4));
       var msg = (content.length == 0) ? '💙✨ أنت مشغول الآن ✨💙\n سبب الانشغال: لم يتم إدخاله\n\n✨ لما ترجع أعطيك الأعضاء الي عملوا لك تاغ في غيابك ☺️' : `💙✨ أنت مشغول الآن ✨💙\n سبب الانشغال: ${content}\n\n✨ لما ترجع أعطيك الأعضاء الي عملوا لك تاغ في غيابك ☺️`;
        return api.sendMessage(msg, threadID, messageID);
    }
}

