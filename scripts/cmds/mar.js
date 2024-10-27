const cooldowns = new Map();

module.exports = {
  config: {
    name: "mar",
    version: "1.1.15",
    author: "TawsiN",
    description: "Randomly marry a boy with a girl in the group!",
    usage: "/marry",
    cooldown: 30, // Command cooldown
    category: "fun",
    guide: "Type /marry and the bot will randomly marry you to someone of the opposite gender.\n\nExample: /marry"
  },

  langs: {
    en: {
      noGirls: "No girls found in the group!",
      noBoys: "No boys found in the group!",
      married: "💍 Congratulations to %1 and %2 on their marriage! 🎉",
      loveWords: "May your love be everlasting and full of joy! ❤️",
      blockedByFacebook: "You've been temporarily blocked by Facebook from using this command. Please try again later.",
      cooldownMessage: "Please wait a bit before using this command again."
    }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { threadID, senderID, messageID } = event;
    const langs = this.langs.en;

    // Check command cooldown
    const lastUsed = cooldowns.get(senderID) || 0;
    const timeSinceLastUse = Date.now() - lastUsed;
    const cooldown = this.config.cooldown * 1000;

    if (timeSinceLastUse < cooldown) {
      const remainingTime = Math.ceil((cooldown - timeSinceLastUse) / 1000);
      return api.sendMessage(`${langs.cooldownMessage} Try again in ${remainingTime} seconds.`, threadID, messageID);
    }

    // Update the cooldown timestamp for the user
    cooldowns.set(senderID, Date.now());

    try {
      // Your command logic here
      // Example: finding a match, sending the "marriage" message, etc.

      await api.sendMessage({
        body: langs.married,
        mentions: [
          { tag: "User1", id: senderID }, // Replace with real user data
          { tag: "User2", id: "partnerID" } // Replace with real partner data
        ]
      }, threadID, messageID);

    } catch (error) {
      // Check for Facebook's temporary block error
      if (error.code === 3252001) {
        return api.sendMessage(langs.blockedByFacebook, threadID, messageID);
      }
      
      console.error("Unexpected error:", error);
      return api.sendMessage("An unexpected error occurred. Please try again later.", threadID, messageID);
    }
  }
};
