const axios = require('axios');

module.exports = { config: {
		      name: "أكي",
                      aliases: ["اكي","آكي"],
		      author: "cliff",
		      version: "1.5",
		      countDown: 5,
		      role: 0,
		      category: "GPT4",
		      description: { ar: "سؤال الذكاء الاصطناعي gpt4"},
                      guide: { ar: "{pn} [محتوى السؤال]"} 
	},

	onStart: async function ({ api, event, args }) {
		try {
			const { messageID, messageReply } = event;
			let prompt = args.join(' ');

			if (messageReply) {
				const repliedMessage = messageReply.body;
				prompt = `${repliedMessage} ${prompt}`;
			}

			if (!prompt) {
				return api.sendMessage('🌹 أدخل استفساࢪك، وسأجيب\nعـن أي سـؤال تسألنـي عنـه ✅\nمثال: .أكي ماهي مكونات الأرض', event.threadID, messageID);
			}

			const gpt4_api = `https://ai-chat-gpt-4-lite.onrender.com/api/hercai?question=${encodeURIComponent(prompt)}`;

			const response = await axios.get(gpt4_api);

			if (response.data && response.data.reply) {
				const generatedText = response.data.reply;
				api.sendMessage({ body: generatedText, attachment: null }, event.threadID, messageID);
			} else {
				console.error('API response did not contain expected data:', response.data);
				api.sendMessage(`🌹 حدث خطـأ أثنـاء إنشـاء الࢪد\nاستجابة لسؤالك، يࢪجى المحاولة\nمـࢪة أخـࢪى فـي وقـت لاحـق.`, event.threadID, messageID);
			}
		} catch (error) {
			console.error('Error:', error);
			api.sendMessage(`🌹 حدث خطـأ أثنـاء إنشـاء الࢪد\nاستجابة لسؤالك، يࢪجى المحاولة\nمـࢪة أخـࢪى فـي وقـت لاحـق.`, event.threadID, event.messageID);
		}
	}
};
