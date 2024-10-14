module.exports.config = {
                  name: "بنك",
                  aliases: [""],
		  version: "1.3",
		  author: "محمد تانجيرو",
		  countDown: 5,
		  role: 0,
		  description: { ar: "تسجل بالبنك، وتودع به أموالك، أو تسحبها، أو تعرضها" },
		  category: "money",
		  guide: { ar: "{pn}" },
dependencies: {
         "fs-extra": "",
      "request": "",
      "axios": ""
  }, 
envConfig: {
      APIKEY: "chinhdz"
}  
};
module.exports.onLoad = async () => {
	const { existsSync, writeFileSync, mkdirSync } = require("fs-extra")
	const { join } = require("path")
	const axios = require("axios");
	const dir = __dirname + `/text`;
	if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    const pathData = join(__dirname + '/text/bank.json');
    if (!existsSync(pathData)) return writeFileSync(pathData, "[]", "utf-8"); 
	return;
}
module.exports.onStart = async function({ api, event, args, models, usersData, threadsData, role }) {
  const { threadID, messageID, senderID } = event;
  const axios = require("axios")
    /*var APIKEY = global.configModule[this.config.name].APIKEY
    const checkKey = (await axios.get(`https://myhurts.net/adminkeys?key=chinhdz`)).data
    if(checkKey.status !== true) return api.sendMessage('⚠APIKEY CỦA BẠN ĐÃ HẾT HẠN, VUI LÒNG LIÊN HỆ chinhle ĐỂ MUA KEY\n⚡️FB: https://www.facebook.com/chinhle3601/', threadID, messageID);*/
  const { readFileSync, writeFileSync } = require("fs-extra")
  const { join } = require("path")
  const pathData = join(__dirname + '/text/bank.json');
  const user = require('./banking/banking.json');
  const timeIM = 60*60
  const laisuat = 0.05
  const moneyInput = parseInt(args[1])
  if(args[0] == 'تسجيل') {
    if (!user.find(i => i.senderID == senderID)) {
      var add = { senderID: senderID,  money: 0 }
      user.push(add);
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\n     💙 لقد قمت بالتسجيل\n     في البنك بنجاح ✅ 💙`, threadID, messageID)
    }
  else return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\nأنت تملك حسابا بالبنك فعلا 🙄`, threadID, messageID)
  }
  if(args[0] == 'عرض') {
  if (!user.find(i => i.senderID == senderID)) return api.sendMessage('✨--- 🏛 بنك ريم ريمي ---✨\n\n أنت لا تملك حسابا بالبنك 🙄\nللتسجيل اكتب: [.بنك تسجيل]', threadID, messageID)
    else { 
      var userData = user.find(i => i.senderID == senderID);
      return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\nالمبلغ الذي أودعته بالبنك هو:\nا---✨ ${userData.money} $ ✨---ا`, threadID, messageID)
    }
  } 
  if(args[0] == 'ايداع') {
  if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("✨--- 🏛 بنك ريم ريمي ---✨\n\n💙 يجب أن يكون المبلغ الذي تودعه رقما أكبر من 50 $ 💙", threadID, messageID);
  if (!user.find(i => i.senderID == senderID)) { return api.sendMessage('✨--- 🏛 بنك ريم ريمي ---✨\n\n أنت لا تملك حسابا بالبنك 🙄\nللتسجيل اكتب: [.بنك تسجيل]', threadID, messageID)
  }
  else { 
      let Datauser = await usersData.get(senderID);
      let balance = (await usersData.get(senderID, {money: Datauser.money, data: Datauser.data});
      if(balance < moneyInput) return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\nرصيدك أقل من: ${moneyInput} $\n💙-- تحقق من رصيدك بكتابة\n   هذا الامر: [.رصيدي] --💙`, threadID, messageID)
      var userData = user.find(i => i.senderID == senderID);
      var money = userData.money;
      userData.money = parseInt(money) + parseInt(moneyInput)
      writeFileSync(pathData, JSON.stringify(user, null, 2));
      await usersData.set(senderID, {money: Datauser.money - parseInt(moneyInput), data: Datauser.data});
      return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\n💙 قمت بإيداع مبلغ مالي 💙\n  قدره: ${moneyInput} $ في البنك\n\nالرصيد الجديد: ${userData.money} $`, threadID, messageID)
    }
  }
  if(args[0] == 'سحب') { 
    if (!args[1] || isNaN(args[1]) || parseInt(args[1]) < 50) return api.sendMessage("✨--- 🏛 بنك ريم ريمي ---✨\n\n💙 يجب أن يكون المبلغ الذي تسحبه رقما أكبر من 50 $ 💙", threadID, messageID);
    if (!user.find(i => i.senderID == senderID)) { return api.sendMessage('✨--- 🏛 بنك ريم ريمي ---✨\n\n أنت لا تملك حسابا بالبنك 🙄\nللتسجيل اكتب: [.بنك تسجيل]', threadID, messageID)
    }
  else {  
    var userData = user.find(i => i.senderID == senderID); 
    var money = userData.money;
    if(parseInt(money) < parseInt(moneyInput)) return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\nأموالك بالبنك أقل من: ${moneyInput} $\n💙-- تحقق من أموالك بكتابة\n هذا الامر: [.بنك عرض] --💙`, threadID, messageID)
      else {
        let Datauser = await usersData.get(senderID);
        await usersData.set(senderID, {money: Datauser.money + parseInt(moneyInput), data: Datauser.data});
        userData.money = parseInt(money) - parseInt(moneyInput)
        writeFileSync(pathData, JSON.stringify(user, null, 2));
        return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n\n💙 قمت بسحب مبلغ مالي 💙\n  قدره: ${moneyInput} $ من البنك\n\n الرصيد الباقي: ${userData.money} $`, threadID, messageID)
      }
    }
  }
  else return api.sendMessage(`✨--- 🏛 بنك ريم ريمي ---✨\n 💙 استخدم هذه الأوامر 💙\n\n-- [بنك تسجيل]: للتسجيل في البنك والاستفادة من خدماته (إيداع الأموال أو سحبها) ✅\n\n-- [بنك عرض]: لعرض أموالك\nالتي أودعتها في البنك 💰\n\n-- [بنك ايداع]: لإيداع الأموال\nفي البنك، والاستفادة منها 💷\n\n-- [بنك سحب]: لسحب الأموال\nمن البنك، وصرفها 💵\n\n   💲 معدل الفائدة الحالي:\n   + ${laisuat} % في ${timeIM/60} دقيقة`, threadID, messageID)
      }
