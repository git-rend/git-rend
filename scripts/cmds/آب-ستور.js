const itunes = require("searchitunes");
const { getStreamFromURL } = global.utils;

module.exports = { config: {
		      name: "آب-ستور",
	              aliases: ["ستور"],
		      version: "1.2",
		      author: "NTKhang",
		      countDown: 5,
		      role: 0,
		      description: { ar: "ابحث عن التطبيق في متجر التطبيقات" },
		      category: "software",
		      guide: { ar: "{pn} [كلمة البحث]"},
		      envConfig: { limitResult: 3 }
	                   },

	langs: { ar: { missingKeyword: "🌹 أكتب الأمࢪ وبعده كلمة البحث",
		       noResult: "🌹 لا توجد نتائج البحث عن:\n%1"
	       }     },

	onStart: async function ({ message, args, commandName, envCommands, getLang }) {
		if (!args[0])
			return message.reply(getLang("missingKeyword"));
		let results = [];
		try {
			results = (await itunes({
				entity: "software",
				country: "dz",
				term: args.join(" "),
				limit: envCommands[commandName].limitResult
			})).results;
		}
		catch (err) {
			return message.reply(getLang("noResult", args.join(" ")));
		}

		if (results.length > 0) {
			let msg = "";
			const pedningImages = [];
			for (const result of results) {
				msg += `\n\n- ${result.trackCensoredName} by ${result.artistName}, ${result.formattedPrice} and rated ${"🌟".repeat(result.averageUserRating)} (${result.averageUserRating.toFixed(1)}/5)`
					+ `\n- ${result.trackViewUrl}`;
				pedningImages.push(await getStreamFromURL(result.artworkUrl512 || result.artworkUrl100 || result.artworkUrl60));
			}
			message.reply({
				body: msg,
				attachment: await Promise.all(pedningImages)
			});
		}
		else {
			message.reply(getLang("noResult", args.join(" ")));
		}
	}
};
