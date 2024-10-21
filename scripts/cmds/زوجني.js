module.exports = {
  config: {
    name: "زوجني",
    version: "1.1.11", 
    author: "TawsiN",
    role: 0,
    description: "الزواج بشكل عشوائي (بنت مع ولد) في المجموعة",
    countdown: 5,
    category: "fun",
    guide: { ar: "{pn}" }
  },

  langs: {
    ar: {
      noGirls: "No girls found in the group!",
      noBoys: "No boys found in the group!",
      married: "💍 Congratulations to %1 and %2 on their marriage! 🎉",
      loveWords: "May your love be everlasting and full of joy! ❤️"
    }
  },

  onStart: async function ({ api, event, usersData, message }) {
    const { threadID, senderID, messageID } = event;
    const langs = this.langs.en;

    // Fetching user info
    const userInfo = await api.getUserInfo(senderID);
    const senderGender = userInfo[senderID].gender === 2 ? "boy" : "girl"; // Assuming gender 2 is male and 1 is female

    // Fetch all participants
    const allUsers = await api.getThreadInfo(threadID);

    // Separate boys and girls from the group
    const boys = [];
    const girls = [];
    for (let userID of allUsers.participantIDs) {
      if (userID == senderID) continue; // Skip the sender
      const user = await api.getUserInfo(userID);
      if (user[userID].gender === 2) boys.push(userID); // Gender 2 = Male
      if (user[userID].gender === 1) girls.push(userID); // Gender 1 = Female
    }

    // Randomly select the appropriate gender
    let chosenPartner;
    if (senderGender === "boy") {
      if (girls.length === 0) return api.sendMessage(langs.noGirls, threadID, messageID);
      chosenPartner = girls[Math.floor(Math.random() * girls.length)];
    } else {
      if (boys.length === 0) return api.sendMessage(langs.noBoys, threadID, messageID);
      chosenPartner = boys[Math.floor(Math.random() * boys.length)];
    }

    // Fetch profile pictures using the existing logic
    const senderPFP = await usersData.getAvatarUrl(senderID);
    const partnerPFP = await usersData.getAvatarUrl(chosenPartner);

    // Prepare mention text
    const senderName = userInfo[senderID].name || 'User';
    const partnerInfo = await api.getUserInfo(chosenPartner);
    const partnerName = partnerInfo[chosenPartner].name || 'User';

    // Format marriage message
    const messageText = langs.married
      .replace("%1", `@${senderName}`)
      .replace("%2", `@${partnerName}`);

    // Send the congratulatory message
    await api.sendMessage({
      body: messageText + "\n\n" + langs.loveWords,
      mentions: [
        { tag: senderName, id: senderID }, // Mention the sender
        { tag: partnerName, id: chosenPartner } // Mention the partner
      ],
      attachment: [
        await global.utils.getStreamFromURL(senderPFP), // Sender's profile picture
        await global.utils.getStreamFromURL(partnerPFP)  // Partner's profile picture
      ]
    }, threadID, messageID);
  }
};
