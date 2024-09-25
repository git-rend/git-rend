module.exports = {
	config: {
		name: "رصيدي",
		aliases: ["اموالي"],
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			ar: "عرض أموالك أو أموال العضو الي تعمل له تاغ"
		},
		category: "economy",
		guide: {
			ar: "   {pn}: لعرض رصيدك"
				+ "\n   {pn} <@tag>: لعرض رصيد العضو الي تعمل له تاغ"
		}
	},

	langs: {
		ar: {
			money: "🏦رصيدك في بريد أكاني🏦\n        ا[%1 $]ا",
			moneyOf: "%1\n🏦رصيده في بريد أكاني🏦\n        ا[%2 $]ا"
		}
	},

	onStart: async function ({ message, usersData, event, getLang }) {
		if (Object.keys(event.mentions).length > 0) {
			const uids = Object.keys(event.mentions);
			let msg = "";
			for (const uid of uids) {
				const userMoney = await usersData.get(uid, "money");
				msg += getLang("moneyOf", event.mentions[uid].replace("@", ""), userMoney) + '\n';
			}
			return message.reply(msg);
		}
		const userData = await usersData.get(event.senderID);
		message.reply(getLang("money", userData.money));
	}
};
