module.exports = {
	config: {
		name: "احذفي",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			ar: "تأمر البوت بحذف رسالته"
		},
		category: "box chat",
		guide: {
			ar: "قم بالرد على الرسالة التي تريد إلغاء إرسالها واكتب {pn}"
		}
	},

	langs: {
		ar: {
			syntaxError: "رد على رسالتي التي تريد حذفها 🙄"
		}
	},

	onStart: async function ({ message, event, api, getLang }) {
		if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
			return message.reply(getLang("syntaxError"));
		message.unsend(event.messageReply.messageID);
	}
};





/*
{
	if (event.messageReply.senderID != api.getCurrentUserID()) return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);
	if (event.type != "message_reply") return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);
	return api.unsendMessage(event.messageReply.messageID);
	}
*/
