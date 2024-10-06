module.exports = { config: {
                      name: "مضاد-الخروج",
                      version: "1.0",
                      author: "AceGun", // تعريب: محمد تانجيرو \\
                      countDown: 5,
                      role: 1,
                      description: { ar: "تشغيل وإيقاف وضع منع الخروج، إذا خرج عضو يرجعه البوت"},
                      category: "boxchat",
                      guide: { ar: "{pn} [on | off]"},
                      envConfig: {deltaNext: 5}
                           },
  onStart: async function({ message, event, threadsData, args }) {
    let antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout === undefined) {
      await threadsData.set(event.threadID, true, "settings.antiout");
      antiout = true;
    }
    if (!["on", "off"].includes(args[0])) {
      return message.reply("استعمل on للتشغيل ✅\nاستعمل off للإيقاف ❌");
    }
    await threadsData.set(event.threadID, args[0] === "on", "settings.antiout");
    return message.reply(`✨💙 لقد قمت بـ: ${args[0] === "on" ? "تشغيل" : "إيقاف"} وضع منع الخروج 💙✨`);
  },
  onEvent: async function({ api, event, threadsData }) {
    const antiout = await threadsData.get(event.threadID, "settings.antiout");
    if (antiout && event.logMessageData && event.logMessageData.leftParticipantFbId) {
      // A user has left the chat, get their user ID
      const userId = event.logMessageData.leftParticipantFbId;

      // Check if the user is still in the chat
      const threadInfo = await api.getThreadInfo(event.threadID);
      const userIndex = threadInfo.participantIDs.indexOf(userId);
      if (userIndex === -1) {
        // The user is not in the chat, add them back
        const addUser = await api.addUserToGroup(userId, event.threadID);
        if (addUser) {
          console.log(`User ${userId} was added back to the chat.`);
        } else {
          console.log(`Failed to add user ${userId} back to the chat.`);
        }
      }
    }
  }
};
