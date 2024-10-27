module.exports = {
  config: {
    name: "2",
    version: "1.1.12", 
    author: "TawsiN",
    role: 2,
    description: "Randomly marry a boy with a girl in the group!",
    usage: "/marry",
    cooldown: 5,
    category: "fun",
    guide: "Type /marry and the bot will randomly marry you to someone of the opposite gender.\n\nExample: /marry"
  },

  langs: {
    en: {
      noGirls: "No girls found in the group!",
      noBoys: "No boys found in the group!",
      married: "💍 Congratulations to %1 and %2 on their marriage! 🎉",
      loveWords: "May your love be everlasting and full of joy! ❤️"
    }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { threadID, senderID, messageID } = event;
    const langs = this.langs.en;

    // Fetch all participants and sender info at once to minimize API calls
    const allUsers = await api.getThreadInfo(threadID);
    const senderInfo = await api.getUserInfo(senderID);
    const senderGender = senderInfo[senderID].gender === 2 ? "boy" : "girl"; 

    // Separate participants by gender
    const boys = [];
    const girls = [];
    const participantPromises = allUsers.participantIDs.map(async (userID) => {
      if (userID !== senderID) {
        const user = await api.getUserInfo(userID).catch(() => null); // Handle API errors
        if (user && user[userID].gender === 2) boys.push(userID); 
        if (user && user[userID].gender === 1) girls.push(userID);
      }
    });

    // Wait for all promises to resolve
    await Promise.all(participantPromises);

    // Select a partner based on sender's gender
    let chosenPartner;
    if (senderGender === "boy") {
      if (girls.length === 0) return api.sendMessage(langs.noGirls, threadID, messageID);
      chosenPartner = girls[Math.floor(Math.random() * girls.length)];
    } else {
      if (boys.length === 0) return api.sendMessage(langs.noBoys, threadID, messageID);
      chosenPartner = boys[Math.floor(Math.random() * boys.length)];
    }

    // Fetch profile pictures with error handling
    const senderPFP = await usersData.getAvatarUrl(senderID).catch(() => null);
    const partnerPFP = await usersData.getAvatarUrl(chosenPartner).catch(() => null);

    // Prepare mention text
    const senderName = senderInfo[senderID].name || 'User';
    const partnerInfo = await api.getUserInfo(chosenPartner);
    const partnerName = partnerInfo[chosenPartner].name || 'User';

    // Format marriage message
    const messageText = langs.married
      .replace("%1", `@${senderName}`)
      .replace("%2", `@${partnerName}`);

    // Send the message
    await api.sendMessage({
      body: messageText + "\n\n" + langs.loveWords,
      mentions: [
        { tag: senderName, id: senderID },
        { tag: partnerName, id: chosenPartner }
      ],
      attachment: [
        senderPFP ? await global.utils.getStreamFromURL(senderPFP) : null,
        partnerPFP ? await global.utils.getStreamFromURL(partnerPFP) : null
      ].filter(Boolean) // Remove null values
    }, threadID, messageID);
  }
};
