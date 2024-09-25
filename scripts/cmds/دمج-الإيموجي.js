const axios = require("axios");

module.exports = { config: {
		      name: "دمج-الإيموجي", 
	              aliases:["دمج","دمج-ايموجي","دمج-الايموجي","دمج-إيموجي"],
		      version: "1.4",
		      author: "NTKhang", // تعريب: محمد تانجيرو \\
		      countDown: 5,
		      role: 0,
		      description: { ar: "دمج إيموجيين مع بعض"},
		      guide: { ar: " {pn} [الإيموجي الأول] [الإيموجي الثاني]\n"
				 + " مثال: {pn} 🤣 🥰"},
		      category: "fun"
	                  },
langs: { ar: { error: "🌹 تعذࢪ دمج هذا الإيموجـي\n[%1] مع هذا الإيموجي [%2].",
	       success: "✅ تم دمج هذا الإيموجي [%1]\nوهذا الإيموجـي [%2] مع بعـض\nفـي 3% صـوࢪة 👇"
       }     },

	onStart: async function ({ message, args, getLang }) {
		const readStream = [];
		const emoji1 = args[0];
		const emoji2 = args[1];

		if (!emoji1 || !emoji2)
			return message.SyntaxError();

		const generate1 = await generateEmojimix(emoji1, emoji2);
		const generate2 = await generateEmojimix(emoji2, emoji1);

		if (generate1)
			readStream.push(generate1);
		if (generate2)
			readStream.push(generate2);

		if (readStream.length == 0)
			return message.reply(getLang("error", emoji1, emoji2));

		message.reply({
			body: getLang("success", emoji1, emoji2, readStream.length),
			attachment: readStream
		});
	}
};



async function generateEmojimix(emoji1, emoji2) {
	try {
		const { data: response } = await axios.get("https://goatbotserver.onrender.com/taoanhdep/emojimix", {
			params: {
				emoji1,
				emoji2
			},
			responseType: "stream"
		});
		response.path = `emojimix${Date.now()}.png`;
		return response;
	}
	catch (e) {
		return null;
	}
}
