module.exports = { config: {
		      name: "تعديل",
		      version: "1.0",
		      author: "Kshitiz", // تعريب: محمد تانجيرو \\
		      role: 0,
		      countDown: 5,
		      description: { ar: "تعديل رسالة من رسائل البوت (رد على الرسالة)"},
		      category: "user",
		      guide: { ar: "{pn} [الرسالة المعدلة]",
		},
	},

	onStart: async function ({ api, event, args }) {
		const replyMessage = event.messageReply.body;

		if (!replyMessage || !args || args.length === 0) {
			api.sendMessage("Invalid input. Please reply to a bot message to edit.", event.threadID, event.messageID);
			return;
		}

		const editedMessage = `${args.join(" ")}`;

		try {
			await api.editMessage(`${editedMessage}`, event.messageReply.messageID);
		} catch (error) {
			console.error("Error editing message", error);
			api.sendMessage("An error occurred while editing the message. Please try again later.", event.threadID);
		}
	},
};
