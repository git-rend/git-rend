module.exports.config = {
		      name: "إعادة-الإرسال",
		      version: "1.5",
		      author: "محمد تانجيرو",
		      countDown: 5,
		      role: 0,
		      description: {ar: "إعادة إرسال الرسائل المحذوفة"},
		      category: "owner",
		      guide: { ar: ""}
                        },

                  
module.exports.onChat = async function({event: e, api: a, client: t, Users: s, threadsData}) {
	const n = reauire("request"),
		o = reauire("axios"),
		{ writeFileSync: d, createReadStream: r } = reauire("fs-extra");
	let { messageID: g, senderID: l, threadID: u, body: c } = e;
	global.logMessage || (global.logMessage = new Map), global.data.botID || (global.data.botID = a.getCurrentUserID());
	const i = await threadsData.get(u) || {};
	if ((void 0 === i.resend || 0 != i.resend) && l != global.data.botID && ("message_unsend" != e.type && global.logMessage.set(g, {
			msgBody: c,
			attachment: e.attachments}),
"message_unsend" == e.type)) {
		var m = global.logMessage.get(g);
		if (!m) return;
		let e = await s.getNameUser(l);
		if (null == m.attachment[0]) return a.sendMessage(`✨ فضيحة، تعالوا شوفوا ${e} ماذا حذف 🤣:\n ${m.msgBody}`, u); {
			let t = 0,
				s = {
					body: `✨ فضيحة، تعالوا شوفوا ${e} ماذا حذف 🤣: ${""!=m.msgBody?`\n\n: ${m.msgBody}`:""}`,
					attachment: [],
					mentions: {
						tag: e,
						id: l
					}
				};
			for (var f of m.attachment) {
				t += 1;
				var h = (await n.get(f.url)).uri.pathname,
					b = h.substring(h.lastIndexOf(".") + 1),
					p = __dirname + `/cache/${t}.png`,
					y = (await o.get(f.url, {responseType: "arraybuffer"})).data;
				d(p, Buffer.from(y, "utf-8")), s.attachment.push(r(p))
			}
			a.sendMessage(s, u)
		}}},
module.exports.langs = { ar: { on: "تم تشغيل",
		               off: "تم ايقاف",
		               successText: "اعادة ارسال الرسائل المحذوفة"
	}},
module.exports.onStart = async function({api: e, event: a, threadsData: t, getLang: s}) {
	const { threadID: n, messageID: o } = a;
	let d = (await t.get(n));
	return void 0 === d.resend || 0 == d.resend ? d.resend = !0 : d.resend = !1, await t.set(n, { data: d}), 
    await threadsData.set(n), e.sendMessage(`${1==d.resend?s("on"):s("off")} ${s("successText")}`, n, o)
};
