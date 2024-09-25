module.exports.config = {
                name: "ألغاز",
	        aliases: ["الغاز","لغز"],
		version: "1.3",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: { ar: "حل اللغز بكلمة واحدة" },
		category: "events",
		guide: { ar: "{pn}" }
                         };

const questions = [
{ question: "ما الذي ينبغي كسره قبل استخدامه؟", answer: "البيض" },
{ question: "أنا طويل حينما أكون صغيرًا، وأكون قصيرًا حينما أصبح كبيرًا في السن، فمن أنا؟", answer: "الشمعة" },
{ question: "أي شهر في السنة يحتوي على 28 يومًا؟", answer: "كل الشهور" },
{ question: "ممتلئة بالثقوب، ولكنها تحتفظ بالمياه؟", answer: "الاسفنجة" },
{ question: "أمامك دائمًا، ولكنك لا تستطيع رؤيته؟", answer: "المستقبل" },
{ question: "تمشي بلا رجلين، وتبكي بلا عينين؟", answer: "السحابة" },
{ question: "ما الذي يمكنك الاحتفاظ به بعد أن تعطيه لشخص ما؟", answer: "الكلمة" },
{ question: "أحلق كل يوم، إلا أن شعري يظل كما هو، فمن أنا؟", answer: "الحلاق" },
{ question: "أسود حينما يكون نظيفًا، وأبيض حينما يكون متسخًا؟", answer: "السبورة" },
{ question: "ماهو الشيء الذي يتكلم جميع اللغات؟", answer: "الصدى" },
{ question: "أراقبك طوال الوقت وأفعل كل حركاتك، لكن لا تستطيع لمسني أو الإمساك بي، فمن أنا؟", answer: "الظل" },
{ question: " يشتمل على الكثير من المفاتيح ولكن لا يمكنه فتح قفل واحد؟", answer: "البيانو" },
{ question: "الشيء الذي كلما أخذت منه زاد؟", answer: "الحفرة" },
{ question: "ما هو الشيء الذي يسمح لك بالنظر مباشرة من خلال الحائط؟", answer: "النافذة" },
{ question: "ملك لك، إلا أن الآخرين يستخدمونه أكثر منك، فما هو؟", answer: "الاسم" },
{ question: "له عين واحدة، ولا تستطيع الرؤية؟", answer: "الإبرة" },
{ question: "شيء بيني وبينك، لا عيني رأته ولا عينك؟", answer: "الهواء" },
{ question: "شيء يستطيع حمل قنطار ولا يستطيع حمل مسمار ؟", answer: "البحر" },
{ question: "الشيء الذي كلما زاد نقص؟", answer: "العمر" },
{ question: "الشيء الذي صانعه يبيعه وشاريه لايستعمله ومستعمله لايراه؟", answer: "الكفن" },
{ question: "الشيء الموجود في كل شيء ؟", answer: "الاسم" },
{ question: "أخضر في الأرض، وأسود في السوق، وأحمر في البيت فما هو؟", answer: "الشاي" },
{ question: "الشيء الذي يخترق الزجاج ولايكسره؟", answer: "الضوء" },
{ question: "الشيء الذي له أربع أرجل ومع ذلك لايمشي ؟", answer: "الكرسي" },
{ question: "حامل ومحمول، نصفه جاف ونصفه مبلول؟", answer: "السفينة" },
];

module.exports.onReply = async function ({ api, event, message, Reply, globalData, usersData }) {
    const { correctAnswer: answer } = Reply;
    const { threadID, messageID, senderID } = event;
    const userAnswer = event.body.trim().toLowerCase();
    const correctAnswer = Reply.correctAnswer.toLowerCase();
    const userData = await usersData.get(senderID);
    const userName = await usersData.getName(event.senderID);

    if (userAnswer === correctAnswer) {
        await usersData.set(senderID, {money: userData.money + 100, data: userData.data});
        api.sendMessage(`🎊 تهانينا: ${userName} \n💙--- إجابتك صحيحة ---💙\n ༺ا-🌹-━━♡━━-🌹-ا༻\n    لقد حصلت على 100 $!`, event.threadID);
        api.unsendMessage(Reply.messageID); 
    } else {
        api.sendMessage(`✨ خطأ، حاول مرة أخرى 🙄`, event.threadID,event.messageID);
    }
};

module.exports.onStart = async function ({ api, event, args, commandName }) {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    const correctAnswer = randomQuestion.answer;
    const question = randomQuestion.question;

    const message = `✨ حل اللغز بكلمة واحدة ✨\n ༺ا-🌹-━━♡━━-🌹-ا༻\n\n[ ${question} ]`;

    api.sendMessage({ body: message }, event.threadID, (error, info) => {
            global.GoatBot.onReply.set(info.messageID, {
                commandName,
                messageID: info.messageID,
                correctAnswer
            });
    });
};
