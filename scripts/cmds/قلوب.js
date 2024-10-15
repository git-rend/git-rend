module.exports.config = {
	          name: "قلوب",
                  aliases: ["قلب"],
	          version: "1.1.5",
	          countdown: 5,
                  role: 0,
	          author: "محمد تانجيرو",
	          description: { ar: "تراهن بأحد الألوان، وتشوف إذا كان اختيارك موافق لاختيار البوت"},
	          category: "ألعاب _ Games",
	          guide: { ar: "وتدخل القلب أو اللون الذي اخترته"},
                        };
module.exports.onStart = async function ({event, api, args, usersData }) {
  var userData = await usersData.get(event.senderID);
  const userMoney = (await usersData.get(senderID, {money: userData.money, data: userData.data}));
  if (500 > userMoney) return api.sendMessage("تحتاج  500$ للعب لعبة: قلوب 🙄", event.threadID, event.messageID);
	        var color = args.join("") 
		var check = (num) => (num == 0) ? '💙' : (num % 2 == 0 && num % 6 != 0 && num % 10 != 0) ? '🧡' : (num % 3 == 0 && num % 6 != 0) ? '💚' : (num % 5 == 0 && num % 10 != 0) ? '💛' : (num % 10 == 0) ? '💜' : '🤍';
		let random = Math.floor(Math.random() * 5);
		if (color == "ازرق" || color == "💙" || color == "blue") color = 0;
		else if (color == "برتقالي" || color == "🧡" || color == "orange") color = 1;
		else if (color == "اخضر" || color == "💚" || color == "green") color = 2;
		else if (color == "اصفر" || color == "💛" || color == "yellew") color = 3;
		else if (color == "بنفسجي" || color == "💜" || color == "violet") color = 4;
		else if (color == "ابيض" || color == "🤍" || color == "white") color = 5;
		else return api.sendMessage("✨ الاختيار يجب أن يكون: ✨\n        ا—-—-—-—-—-—ا\n🧡 / برتقالي / orange\n💜 / بنفسجي / violet\n💛 / اصفر / yellow\n💚 / اخضر / green\n🤍 / ابيض / white\n💙 / ازرق/ blue\n\n  ✨اختر اللون المناسب: ✨\n    سواء بالقلوب أو بالكتابة", event.threadID, event.messageID);
		let coin = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
		if (color == 0 && check(random) == '💙') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (💙)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else if (color == 1 && check(random) == '🧡') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (🧡)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else if (color == 2 && check(random) == '💚') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (💚)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else if (color == 3 && check(random) == '💛') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (💛)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else if (color == 4 && check(random) == '💜') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (💜)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else if (color == 5 && check(random) == '🤍') api.sendMessage(`✨ —- مبارك عليك 😍 -— ✨\nاختيارك موافق لاختياري: (🤍)\n\n  خذ: ${coin} $ جائزة لفوزك 🤭`, event.threadID,() => await usersData.set(senderID, {money: userData.money + coin, data: userData.data}),event.messageID);
		else api.sendMessage(`خطأ 🤣، اختياري هو: (${check(random)})\nحاول مجددا، وأتمنى تفوز 🥹\n            -----------------\n             - ${coin} $`, event.threadID,() => await usersData.set(senderID, {money: userData.money - coin, data: userData.data}),event.messageID);
    }
