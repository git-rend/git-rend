module.exports.config = {
		name: "سلوت",
		version: "1.3",
		author: "NTKhang",
		countDown: 5,
		role: 1,
		description: {
			ar: "لعبة تراهن فيها بمبلغ، إذا فزت يتضاعف المبلغ، وإذا خسرت يخصم منك المبلغ الذي راهنت به"
		},
		category: "box chat",
		guide: {
			ar: " {pn} [المبلغ]"
		}
};

module.exports.langs = {
		ar: {
        missingInput: "✨ يجب أن تدخل مبلغا للرهان",
        moneyBetNotEnough: "✨ المال الذي أدخلته للرهان\nبه أكبر من رصيدك 🙄",
        limitBet: "✨ المال الذي أدخلته للرهان به\nقليل، راهن بأكثر من: 10$ 🙄",
        returnWin: "✨—-— لقد فزت 😍 —-—✨\n\n ا[ 🎰  %1  |  %2  |  %3  🎰 ]ا\n\n💙 فزت وتمت مضاعفة المبلغ\nالذي راهنت به وأصبح: %4$",
        returnLose: "✨- بووو لقد خسرت 🤣 -✨\n\nا[ 🎰  %1  |  %2  |  %3  🎰 ]ا\n\n💙 خسرت وتم خصم المبلغ\nالذي راهنت به منك: %4$"
		}
	},

module.exports.onStart = async function({ api, event, message, envCommands, commandName, usersData, args, getLang }) {
    const { threadID, messageID, senderID } = event;
    const slotItems = ["🍇", "🍉", "🍊", "🍏", "7⃣", "🍓", "🍒", "🍌", "🥝", "🥑", "🌽"];
    const userData = await usersData.get(senderID);

    var moneyBet = parseInt(args[0]);
    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage(getLang("missingInput"), threadID, messageID);
	if (moneyBet > userData.money) return api.sendMessage(getLang("moneyBetNotEnough"), threadID, messageID);
	if (moneyBet < 10) return api.sendMessage(getLang("limitBet"), threadID, messageID);
    var number = [], win = false;
    for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
    if (number[0] == number[1] && number[1] == number[2]) {
        moneyBet *= 9;
        win = true;
    }
    else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
        moneyBet *= 2;
        win = true;
    }
    switch (win) {
        case true: {
            api.sendMessage(getLang("returnWin", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
            await usersData.set(senderID, {
			money: userData.money + moneyBet,
			data: userData.data
		});
            break;
        }
        case false: {
            api.sendMessage(getLang("returnLose", slotItems[number[0]], slotItems[number[1]], slotItems[number[2]], moneyBet), threadID, messageID);
            await usersData.set(senderID, {
			money: userData.money - moneyBet,
			data: userData.data
		});;
            break;
        }
    }
}
