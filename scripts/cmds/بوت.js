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
module.exports.onStart = async function ( api, event ) {
return api.sendMessage ("بوت أكاني",event.threadID, event.messageID)
  }
