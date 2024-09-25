const moment = require("moment-timezone");

module.exports = {
	config: {
		name: "هدية",
		version: "1.2",
		author: "NTKhang",
		countDown: 5,
		role: 0,
		description: {
			ar: "الحصول على الهدية اليومية"
		},
		category: "game",
		guide: {
			ar: "   {pn}"
				+ "\n   {pn} [معلومات]: عرض معلومات الهدية اليومية"
		},
		envConfig: {
			rewardFirstDay: {
				coin: 100,
				exp: 10
			}
		}
	},

	langs: {
		ar: {
			monday: "الإثنين",
			tuesday: "الثلاثاء",
			wednesday: "الأربعاء",
			thursday: "الخميس",
			friday: "الجمعة",
			saturday: "السبت",
			sunday: "الأحد",
			alreadyReceived: "سبق وحصلت على هديتك\nلا تطلـب في كـل وقـت 🙎‍♀️",
			received: "✨ مبارك عليك الهدية 😍✨\n         قيمة هديتك هي:\n            ا[ ${%1} ]ا" /*You have received %1 coin and %2 exp*/
		}
	},

	onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
		const reward = envCommands[commandName].rewardFirstDay;
		if (args[0] == "معلومات") {
			let msg = "";
			for (let i = 1; i < 8; i++) {
				const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((i == 0 ? 7 : i) - 1));
				const day = i == 7 ? getLang("sunday") :
					i == 6 ? getLang("saturday") :
						i == 5 ? getLang("friday") :
							i == 4 ? getLang("thursday") :
								i == 3 ? getLang("wednesday") :
									i == 2 ? getLang("tuesday") :
										getLang("monday");
				msg += `${day}: ${getCoin} coin, ${getExp} exp\n`;
			}
			return message.reply(msg);
		}

		const dateTime = moment.tz("Africa/Algiers").format("DD/MM/YYYY");
		const date = new Date();
		const currentDay = date.getDay(); // 0: sunday, 1: monday, 2: tuesday, 3: wednesday, 4: thursday, 5: friday, 6: saturday
		const { senderID } = event;

		const userData = await usersData.get(senderID);
		if (userData.data.lastTimeGetReward === dateTime)
			return message.reply(getLang("alreadyReceived"));

		const getCoin = Math.floor(reward.coin * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		const getExp = Math.floor(reward.exp * (1 + 20 / 100) ** ((currentDay == 0 ? 7 : currentDay) - 1));
		userData.data.lastTimeGetReward = dateTime;
		await usersData.set(senderID, {
			money: userData.money + getCoin,
			exp: userData.exp + getExp,
			data: userData.data
		});
		message.reply(getLang("received", getCoin, getExp));
	}
};
