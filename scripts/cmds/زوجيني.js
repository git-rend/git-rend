module.exports = { config: {
                      name: "زوجيني",
                      aliases: ["زوجني"],
                      version: "1.1.11", 
                      author: "TawsiN",
                      role: 0,
                      description: "الزواج بشكل عشوائي (بنت مع ولد) في المجموعة",
                      countdown: 5,
                      category: "fun",
                      guide: { ar: "{pn}" }
                           },

  onStart: async function ({ api, event, usersData, message, role }) {
    if (role < 2) return message.reply("الأمر تحت الصيانة، المطور محمد تانجيرو فقط يستطيع استخدامه وتجريبه حاليا");
    
    const { threadID, senderID, messageID } = event;
    const axios = require ("axios");
    const fs = require ("fs-extra");
    
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
    //let chosenPartner;
    if (senderGender === "boy") {
      if (girls.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا توجـد بنـات في المجموعـة", threadID, messageID);
      let chosenPartner = girls[Math.floor(Math.random() * girls.length)];
    } else {
      if (boys.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا يوجـد أولاد فـي المجموعـة", threadID, messageID);
      let chosenPartner = boys[Math.floor(Math.random() * boys.length)];
    }

    // Fetch profile pictures using the existing logic
    //const senderPFP = await usersData.getAvatarUrl(senderID);
    //const partnerPFP = await usersData.getAvatarUrl(chosenPartner);
    const senderPFP = await axios.get( `https://graph.facebook.com/${senderID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
    fs.writeFileSync( __dirname + "/cache/1.png", Buffer.from(senderPFP, "utf-8") );
    const partnerPFP = await axios.get( `https://graph.facebook.com/${chosenPartner}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" } )).data; 
    fs.writeFileSync( __dirname + "/cache/2.png", Buffer.from(partnerPFP, "utf-8") );
    
    // Prepare mention text
    //const senderName = userInfo[senderID].name || 'User';
    const senderName = await usersData.getName(senderID); 
    //const partnerInfo = await api.getUserInfo(chosenPartner);
    //const partnerName = partnerInfo[chosenPartner].name || 'User';
    const partnerName = await usersData.getName(chosenPartner);
    var lovePercent = Math.floor(Math.random() * 101);

    //Prepare mentions name
    var tags = [];
        tags.push({id: senderID, tag: senderName}); //Mention the sender
        tags.push({id: chosenPartner, tag: partnerName}); //Mention the partner
    
    // create images
    var images = [];
        images.push(fs.createReadStream(__dirname + "/cache/1.png")); //Sender's profile picture
        images.push(fs.createReadStream(__dirname + "/cache/2.png")); //Partner's profile picture
    
    // Send the congratulatory message
    var message = { body: `❤️‍🔥 مباࢪڪ زواجڪما 💍🎉\n• ا[ ${senderName} ]ا\n          ا[💜🫶💙]ا\n• ا[ ${partnerName} ]ا\n    نسبة الࢪومنسية: ${lovePercent} %`,
                    mentions: tags, attachment: images }
    return api.sendMessage(message, threadID,/* (fs.unlinkSync(__dirname + '/cache/1.png');
        fs.unlinkSync(__dirname + '/cache/2.png')),*/messageID);
  }
};




/*module.exports = { config: {
                      name: "زوجيني",
                      aliases: ["زوجني"],
                      version: "1.1.11", 
                      author: "TawsiN",
                      role: 0,
                      description: "الزواج بشكل عشوائي (بنت مع ولد) في المجموعة",
                      countdown: 5,
                      category: "fun",
                      guide: { ar: "{pn}" }
                           },

  onStart: async function ({ api, event, usersData, message, role }) {
    if (role < 2) return message.reply("الأمر تحت الصيانة، المطور محمد تانجيرو فقط يستطيع استخدامه وتجريبه حاليا");
    
    const { threadID, senderID, messageID } = event;
    
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
      if (girls.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا توجـد بنـات في المجموعـة", threadID, messageID);
      chosenPartner = girls[Math.floor(Math.random() * girls.length)];
    } else {
      if (boys.length === 0) return api.sendMessage("🌹 للأسف لا يمڪن تزويجك\nلا يوجـد أولاد فـي المجموعـة", threadID, messageID);
      chosenPartner = boys[Math.floor(Math.random() * boys.length)];
    }

    // Fetch profile pictures using the existing logic
    const senderPFP = await usersData.getAvatarUrl(senderID);
    const partnerPFP = await usersData.getAvatarUrl(chosenPartner);

    // Prepare mention text
    const senderName = userInfo[senderID].name || 'User';
    const partnerInfo = await api.getUserInfo(chosenPartner);
    const partnerName = partnerInfo[chosenPartner].name || 'User';
    var lovePercent = Math.floor(Math.random() * 101);
    
    // Send the congratulatory message
    await api.sendMessage({
      body: `❤️‍🔥 مباࢪڪ زواجڪما 💍🎉\n• ا[ ${senderName} ]ا\n          ا[💜🫶💙]ا\n• ا[ ${partnerName} ]ا\n    نسبة الࢪومنسية: ${lovePercent} %`,
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
*/
