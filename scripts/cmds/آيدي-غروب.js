module.exports = { config: {
		      name: "آيدي-غروب",
		      aliases: ["ايدغ","آيدغ","ايدي-غ","آيدي-غ"],
		      version: "1.2",
		      author: "NTKhang",
		      countDown: 5,
		      role: 0,
		      description: { ar: "معرفة الآيدي الخاص بهذه المجموعة"},
		      category: "info",
		      guide: { ar: "{pn}"}
	                   },

	onStart: async function ({ message, event, threadsData }) {
		const threaddata = await threadsData.get(event.threadID);
		const threadname = threaddata.threadName;
		message.reply(`غروب: ${threadname}:\n${event.threadID.toString()}`);
	         }                                   };
