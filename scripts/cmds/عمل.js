module.exports = { config: {
                name: "عمل",
		version: "1.3",
		author: "محمد تانجيرو",
		countDown: 60,
		role: 0,
		description: { ar: "تاخذ رصيد مقابل العمل" },
		category: "events",
		guide: { ar: "{pn}" }
			   }, 
/*module.exports.*/langs: { "ar": { antitheft: "لا تسرق عمل الآخرين 😏، اعمل بنفسك يا نصاب",
				 isnan: "✨ أدخل رقم من 1 لـ 10 🙄",
				 wrongnumber: "✨ الرقم الذي أدخلته غير\nموجود في القائمة 🙄🫠",
	                         cooldown: "🍀✨ أنت اشتغلت اليوم ✨\n  حرصا على صحتك؛ أتركك\nترتاح، تعال اشتغل مجددا\nبعد: %1 دقيقة و %2 ثانية 💙",
		       }       }, 
/*module.exports.*/onReply: async ({ event, api, Reply, usersData, getlang }) => {
    const { threadID, messageID, senderID } = event;
    const userData = await usersData.get(senderID) || {};
if (Reply.author != event.senderID) 
return message.reply(getLang("antitheft"));

var coinsmhmd1 = Math.floor(Math.random() * 33000) + 8000;
var coinsmhmd2 = Math.floor(Math.random() * 6000) + 2000;
var coinsmhmd3 = Math.floor(Math.random() * 20000) + 6000;
var coinsmhmd4 = Math.floor(Math.random() * 26000) + 7000;
var coinsmhmd5 = Math.floor(Math.random() * 50000) + 10000;
var coinsmhmd6 = Math.floor(Math.random() * 11000) + 4000;
var coinsmhmd7 = Math.floor(Math.random() * 15000) + 5000;
var coinsmhmd8 = Math.floor(Math.random() * 41000) + 9000;
var coinsmhmd9 = Math.floor(Math.random() * 8000) + 3000;
var coinsmhmd10 = Math.floor(Math.random() * 5000) + 1000;
var mhmd1 = ['منقبا عن الغاز','منقبا عن البترول','كهربائيا','في تحويل طاقة المياه إلى طاقة كهربائية','في تركيب الألواح الشمسية'];
var work1 = mhmd1[Math.floor(Math.random() * mhmd1.length)];   

var mhmd2 = ['مدرسا للقرآن','إماما','مؤذنا','خطيبا','داعية'];
var work2 = mhmd2[Math.floor(Math.random() * mhmd2.length)]; 

var mhmd3 = ['مجاهدا','جاسوسا على العدو','رسولا في الجيش','حاملا لراية الجهاد','قناصا'];
var work3 = mhmd3[Math.floor(Math.random() * mhmd3.length)]; 

var mhmd4 = ['صانع روبوتات','عاملا في مصنع الحديد','في الصناعات التقليدية','في الصناعات الصيدلانية','في تصنيع السيارات'];
var work4 = mhmd4[Math.floor(Math.random() * mhmd4.length)]; 

var mhmd5 = ['لاعب كرة القدم','مدربا','حارس مرمى','لاعب كرة اليد','لاعب كرة اليد'];
var work5 = mhmd5[Math.floor(Math.random() * mhmd5.length)]; 

var mhmd6 = ['مدرس مادة الرياضيات','مستشارا مدرسيا','مدرس مادة الفلسفة القبيحة','مفتشا مدرسيا','مدير مدرسة'];
var work6 = mhmd6[Math.floor(Math.random() * mhmd6.length)];

var mhmd7 = ['طبيبا عاما','جراحا','طبيب أسنان','طبيب عظام','طبيب عيون'];
var work7 = mhmd7[Math.floor(Math.random() * mhmd7.length)];

var mhmd8 = ['مغني راي','عازف بيانو','مغنيا في الأعراس','راقصا','في المسرح'];
var work8 = mhmd8[Math.floor(Math.random() * mhmd8.length)];

var mhmd9 = ['ضابط في الجيش','جنرالا','جنديا','عريفا في الجيش','رقيبا في الجيش'];
var work9 = mhmd9[Math.floor(Math.random() * mhmd9.length)];

var mhmd10 = ['محاميا','قاضيا','محضرا قضائيا',' جوجا','حارس سجن'];
var work10 = mhmd10[Math.floor(Math.random() * mhmd10.length)];

var msg = "";
    switch(Reply.type) {
        case "اختيار": {
            switch(event.body) {
                case "1": msg = `✨ لقد عملت: ${work1}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd1} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd1, data: userData.data}); break;             
                case "2": msg = `✨ لقد عملت: ${work2}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd2} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd2, data: userData.data}); break;
                case "3": msg = `✨ لقد عملت: ${work3}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd3} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd3, data: userData.data}); break;
                case "4": msg = `✨ لقد عملت: ${work4}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd4} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd4, data: userData.data}); break;
                case "5": msg = `✨ لقد عملت: ${work5}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd5} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd5, data: userData.data}); break;
                case "6": msg = `✨ لقد عملت: ${work6}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd6} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd6, data: userData.data}); break;
                case "7": msg = `✨ لقد عملت: ${work7}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd7} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd7, data: userData.data}); break;
                case "8": msg = `✨ لقد عملت: ${work8}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd8} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd8, data: userData.data}); break; 
                case "9": msg = `✨ لقد عملت: ${work9}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd9} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd9, data: userData.data}); break;
               case "10": msg = `✨ لقد عملت: ${work10}، وأتقنت عملك 🤝\n✅ خذ أجرك: ${coinsmhmd10} $!` ; await usersData.set(senderID, {money: userData.money + coinsmhmd10, data: userData.data}); break;                break;
                default: break;
            };
            const choose = parseInt(event.body);
            if (isNaN(event.body)) return message.reply(getLang("isnan"));
            if (choose > 10 || choose < 1) return message.reply(getLang("wrongnumber"));
            api.unsendMessage(Reply.messageID);
            if (msg == "⚡️Chưa update...") {
                msg = "⚡️التحديث قريبا...";
            };
            return api.sendMessage(`${msg}`, threadID, async () => {
            userData.data.workTime = Date.now();
	    await usersData.set(senderID, { data: userData.data });
        });

    };
}
}, 
/*module.exports.*/onStart : async ({ args, commandName, event, api, usersData, globalData, getLang }) => {
    const { threadID, messageID, senderID } = event;
    const cooldown = 1800000;
    let data = (await usersData.get(senderID)) || {};
    if (typeof data !== "undefined" && cooldown - (Date.now() - data.data.workTime) > 0) {
        var time = cooldown - (Date.now() - data.data.workTime),
            minutes = Math.floor(time / 60000),
            seconds = ((time % 60000) / 1000).toFixed(0); 
        return api.sendMessage(getLang("cooldown", minutes, (seconds < 10 ? "0" + seconds : seconds)), event.threadID, event.messageID);
    }
    else {    
    return api.sendMessage("✨ مناصب الشغل المتوفرة ✨\n    💙ا—-—-—-—-—-—ا💙\n\n1 => وزارة الطاقة والمناجم🌋\n2 => وزارة الشؤون الدينية 🕌\n3 => وزارة المجاهدين ⚔️💣\n4 => وزارة الصناعة 🏭🏗\n5 => وزارة الرياضة ⛹️‍♂️⚽\n6 => وزارة التعليم 📚📒\n7 => وزارة الصحة 🩻🧬\n8 => وزارة الثقافة 💃🕺\n9 => وزارة الدفاع 💂‍♂️🪖\n10 => وزارة العدل ⚖️🔨\n\n  💙ا—-—-—-—-—-—-—ا💙\n✨ رد على الرسالة برقم الشغل\nالذي اخترته (من 1 إلى 10)", event.threadID, (error, info) => {
        data.data.workTime = Date.now();
        global.GoatBot.onReply.set(info.messageID, {
            type: "اختيار",
            commandName,
            author: event.senderID,
            messageID: info.messageID
          })  
        })
    }
}
} 
