const fs = require('fs');
module.exports = {
	config: {
		name: "ارا",
		version: "1.0",
		author: "Otineeeeeyyyyyy",
		countDown: 5,
		role: 0,
		description:  {
			ar: "{pn} <النص>"
        },
		category: "no prefix",
    guide: {
			ar: "{pn} <النص>"
        }
	},
	onStart: async function(){},
	onChat: async function({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "Ara") {
			return message.reply({
				body: "『(つ≧▽≦)つ』",
				attachment: fs.createReadStream("ara.mp3"),
			});
		}
	}
};
