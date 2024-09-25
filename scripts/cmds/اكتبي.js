module.exports.config = {
		name: "اكتبي",
		version: "1.4",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: {
			ar: "إعادة كتابة كل ما تكتبه بعد الأمر"
		},
		category: "box chat",
		guide: {
			ar: "{pn} (النص)"
		}
	},

module.exports.onStart = async ({ api, event,args }) => {
var say = args.join(" ")
	if (!say) api.sendMessage("✨ أكتب الامر ثم الرسالة التي تريدني أن أعيد إرسالها 🙄", event.threadID, event.messageID)
	else api.sendMessage(`${say}`, event.threadID, event.messageID);
}
