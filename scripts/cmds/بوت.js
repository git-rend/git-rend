module.exports.config = {
                  name: "بوت",
                  version:"1.0.0", 
                  role: 2,
                  countdown: 5,
                  author: "محمد تانجيرو", 
                  description:{ ar : ""},
                  category: "تجارب", 
                  guide: { ar : "{pn}"}
                        };
module.exports.onStart = async function ({ api, event }) {
  const first = "💙 بوت أكاني 🫶"; 
  const second = "أجمل وأكيت بوت 🤭";
  { const firstMessage = await api.sendMessage(first, event.threadID);
                         await new Promise((resolve) => setTimeout(resolve, 3000));
                         await api.editMessage( second, firstMessage.messageID, event.threadID);
  }}
