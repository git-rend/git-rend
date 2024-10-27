const cooldowns = new Map();

module.exports = {
  config: {
    name: "marry",
    version: "1.1.14",
    author: "TawsiN",
    description: "Randomly marry a boy with a girl in the group!",
    usage: "/marry",
    cooldown: 30, // Cooldown increased
    category: "fun",
    guide: "Type /marry and the bot will randomly marry you to someone of the opposite gender.\n\nExample: /marry"
  },

  langs: {
    en: {
      noGirls: "No girls found in the group!",
      noBoys: "No boys found in the group!",
      married: "💍 Congratulations to %1 and %2 on their marriage! 🎉",
      loveWords: "May your love be everlasting and full of joy! ❤️",
      blockedMessage: "You've been temporarily blocked from using this command. Please try again later."
    }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { threadID, senderID, messageID } = event;
    const langs = this.langs.en;

    // Check user cooldown
    if (cooldowns.has(senderID) && (Date.now() - cooldowns.get(senderID) < 30000)) { // 30 seconds
      return api.sendMessage(langs.blockedMessage, threadID, messageID);
    }

    cooldowns.set(senderID, Date.now()); // Update the cooldown

    // ... (rest of the command logic remains the same)

    // Error handling during command execution
    try {
      // Existing command logic...

      // Final message sending logic
      await api.sendMessage({
        body: messageText + "\n\n" + langs.loveWords,
        mentions: [
          { tag: senderName, id: senderID },
          { tag: partnerName, id: chosenPartner }
        ]
      }, threadID, messageID);
    } catch (error) {
      if (error.code === 3252001) {
        return api.sendMessage(langs.blockedMessage, threadID, messageID);
      }
      console.error(error); // Log the error for debugging
    }
  }
};
