module.exports.config = {
		name: "المسؤولين",
		version: "1.4",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: {
			ar: "ترسل لك قائمة المسؤولين في هذا الغروب"
		},
		category: "box chat",
		guide: {
			ar: "{pn}"
		}
	},

module.exports.onStart = async function({ api, event, args, Users }) {
    var threadInfo = await api.getThreadInfo(event.threadID);
    let qtv = threadInfo.adminIDs.length;
    var listad = '';
    var qtv2 = threadInfo.adminIDs;
    var fs = require("fs-extra");
    dem = 1;
    for (let i = 0; i < qtv2.length; i++) {
        const info = (await api.getUserInfo(qtv2[i].id));
        const name = info[qtv2[i].id].name;
        listad += '' + `${dem++}` + '. ' + name + '\n';
    }

    api.sendMessage(
        `✨ عدد المسؤولين: ${qtv} ✨\n\n 🌹أسماء المسؤولين: 🌹\n${listad}`,
        event.threadID,
        event.messageID
    );
};
