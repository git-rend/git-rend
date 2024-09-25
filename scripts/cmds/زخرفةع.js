module.exports.config = {
                name: "زخرفةع",
		version: "1.3",
		author: "محمد تانجيرو",
		countDown: 5,
		role: 0,
		description: { ar: "زخرفة أي كلمة أو جملة تكتبها بالانجليزي أو الفرنسي" },
		category: "events",
		guide: { ar: "{pn} [النص]" }
			   };
module.exports.onStart = async function({ api, event, args }) {
    const { threadID, messageID, senderID, body } = event;
 var content = args.join(" ").toLowerCase();
      if (!content) return api.sendMessage("يرجى إدخال النص الذي تريد زخرفته", threadID, messageID);

      let a = content.replace(/أ/g, "أ").replace(/ا/g, "آ").replace(/ب/g, "بہ").replace(/ت/g, "تہ").replace(/ث/g, "ٿ").replace(/ج/g, "جہ").replace(/ح/g, "حہ").replace(/خ/g, "خہ").replace(/د/g, "د").replace(/ذ/g, "ذ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "سہ").replace(/ش/g, "شہ").replace(/ص/g, "صہ").replace(/ض/g, "ضہ").replace(/ط/g, "طہ").replace(/ظ/g, "ظہ").replace(/ع/g, "عہ").replace(/غ/g, "غہ").replace(/ف/g, "فہ").replace(/ق/g, "قہ").replace(/ك/g, "كہ").replace(/ل/g, "ل").replace(/م/g, "مہ").replace(/ن/g, "نہ").replace(/ه/g, "هہ").replace(/و/g, "وٌ").replace(/ي/g, "يہ").replace(/ى/g, "ى").replace(/ئ/g, "ئ");
      let b = content.replace(/أ/g, "آ").replace(/ا/g, "آ").replace(/ب/g, "بۣۗہ").replace(/ت/g, "تۣۗہ").replace(/ث/g, "ثۣۗہ").replace(/ج/g, "جۣۗہ").replace(/ح/g, "حۣۗہ").replace(/خ/g, "خۣۗہ").replace(/د/g, "دُ").replace(/ذ/g, "ذۣ").replace(/ر/g, "ر").replace(/ز/g, "زۣ").replace(/س/g, "سۣۗہ").replace(/ش/g, "شۣۗہ").replace(/ص/g, "صۣۗہ").replace(/ض/g, "ضۣۗہ").replace(/ط/g, "طۣۗہ").replace(/ظ/g, "ظۣۗہ").replace(/ع/g, "عۣۗہ").replace(/غ/g, "غۣۗہ").replace(/ف/g, "فۣۗہ").replace(/ق/g, "قۣۗہ").replace(/ك/g, "كۣۗہ").replace(/ل/g, "لَ").replace(/م/g, "مۣۗہ").replace(/ن/g, "نۣۗہ").replace(/ه/g, "هۣۗہ").replace(/و/g, "وۣ").replace(/ي/g, "يۣۗہ").replace(/ى/g, "ى").replace(/ئ/g, "ئ");
      let c = content.replace(/أ/g, "ٱ").replace(/ا/g, "ٱ").replace(/ب/g, "بّےـ").replace(/ت/g, "تُےـ").replace(/ث/g, "ثًےـ").replace(/ج/g, "جَےـ").replace(/ح/g, "حًےـ").replace(/خ/g, "خٌےـ").replace(/د/g, "دِ").replace(/ذ/g, "ذٌ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "سًےـ").replace(/ش/g, "شّےـ").replace(/ص/g, "صِےـ").replace(/ض/g, "ضےـ").replace(/ط/g, "طٌےـ").replace(/ظ/g, "ظٌےـ").replace(/ع/g, "عَےـ").replace(/غ/g, "غّےـ").replace(/ف/g, "فُےـ").replace(/ق/g, "قَےـ").replace(/ك/g, "كےـ").replace(/ل/g, "لَ").replace(/م/g, "مِےـ").replace(/ن/g, "نٌےـ").replace(/ه/g, "هےـِ").replace(/و/g, "وٌ").replace(/ي/g, "يّےـ").replace(/ى/g, "ى").replace(/ئ/g, "ئ");    
      let d = content.replace(/أ/g, "أ").replace(/ا/g, "ا").replace(/ب/g, "ب").replace(/ت/g, "تہ").replace(/ث/g, "ثہ").replace(/ج/g, "جہ").replace(/ح/g, "حہ").replace(/خ/g, "خہ").replace(/د/g, "د").replace(/ذ/g, "ذ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "سہ").replace(/ش/g, "شہ").replace(/ص/g, "ص").replace(/ض/g, "ض").replace(/ط/g, "طہ").replace(/ظ/g, "ظ").replace(/ع/g, "عہ").replace(/غ/g, "غہ").replace(/ف/g, "فُہ").replace(/ق/g, "ق").replace(/ك/g, "كُہ").replace(/ل/g, "لہ").replace(/م/g, "م").replace(/ن/g, "ن").replace(/ه/g, "ه").replace(/و/g, "و").replace(/ي/g, "يہ").replace(/ى/g, "ى").replace(/ئ/g, "ئ");
      let e = content.replace(/أ/g, "أ").replace(/ا/g, "ا").replace(/ب/g, "بہ").replace(/ت/g, "تہ").replace(/ث/g, "ثہ").replace(/ج/g, "جہ").replace(/ح/g, "حہ").replace(/خ/g, "خہ").replace(/د/g, "د").replace(/ذ/g, "ذ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "سہ").replace(/ش/g, "شہ").replace(/ص/g, "صہ").replace(/ض/g, "ض").replace(/ط/g, "طہ").replace(/ظ/g, "ظہ").replace(/ع/g, "عہ").replace(/غ/g, "غہ").replace(/ف/g, "فُہ").replace(/ق/g, "قہ").replace(/ك/g, "كُہ").replace(/ل/g, "لہ").replace(/م/g, "مہ").replace(/ن/g, "نہ").replace(/ه/g, "ه").replace(/و/g, "و").replace(/ي/g, "يہ").replace(/ى/g, "ى").replace(/ئ/g, "ئ");
      let f = content.replace(/أ/g, "أ").replace(/ا/g, "ا").replace(/ب/g, "بـٌـٌٌـٌٌٌـٌٌـٌ").replace(/ت/g, "تـٌـٌٌـ").replace(/ث/g, "ثُ").replace(/ج/g, "جـ,ـ").replace(/ح/g, "حـًـًًـًًًـًًـًـ").replace(/خ/g, "ځـٌٌـٌٌ").replace(/د/g, "ڊ").replace(/ذ/g, "ڏ").replace(/ر/g, "ر").replace(/ز/g, "ڒٍ").replace(/س/g, "ڛـ,ـ").replace(/ش/g, "شُـُـُُـُ").replace(/ص/g, "صُـ,ـ").replace(/ض/g, "ض").replace(/ط/g, "طُـٌـٌٌـٌ").replace(/ظ/g, "ظً").replace(/ع/g, "عٌـِـِِـِـ").replace(/غ/g, "غٍـُـُُـُُُـُُُُـُُُـُُـُ").replace(/ف/g, "فُـ,ـ").replace(/ق/g, "قٌـ,ـ").replace(/ك/g, "كُـُ").replace(/ل/g, "لُـِـِِـِِِـِِـِـ").replace(/م/g, "مـْـْْـْ").replace(/ن/g, "نـِِـِـ").replace(/ه/g, "ﮩ").replace(/و/g, "وُ").replace(/ي/g, "ي").replace(/ى/g, "ﮯ").replace(/ئ/g, "ئ");
      let g = content.replace(/أ/g, "أ").replace(/ا/g, "ا").replace(/ب/g, "بٰٰ").replace(/ت/g, "تہٰ").replace(/ث/g, "ثہٰـ").replace(/ج/g, "ج").replace(/ح/g, "حہٰ").replace(/خ/g, "خ").replace(/د/g, "د").replace(/ذ/g, "ذ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "سہٰ").replace(/ش/g, "ش").replace(/ص/g, "صہٰ").replace(/ض/g, "ض").replace(/ط/g, "طہٰ").replace(/ظ/g, "ظ").replace(/ع/g, "ع").replace(/غ/g, "غ").replace(/ف/g, "فہٰ").replace(/ق/g, "ق").replace(/ك/g, "كہٰ").replace(/ل/g, "لہٰ").replace(/م/g, "م").replace(/ن/g, "ن").replace(/ه/g, "ه").replace(/و/g, "و").replace(/ي/g, "يٰ").replace(/ى/g, "ﮯ").replace(/ئ/g, "ئ");
      let h = content.replace(/أ/g, "أ").replace(/ا/g, "آإ").replace(/ب/g, "بـ♥̨̥̬̩").replace(/ت/g, "تـ♥̨̥̬̩").replace(/ث/g, "ثـ♥̨̥̬̩").replace(/ج/g, "جـ♥̨̥̬̩").replace(/ح/g, "حـ♥̨̥̬̩").replace(/خ/g, "خ").replace(/د/g, "د").replace(/ذ/g, "ذ").replace(/ر/g, "ر").replace(/ز/g, "ز").replace(/س/g, "س").replace(/ش/g, "ش").replace(/ص/g, "ص").replace(/ض/g, "ض").replace(/ط/g, "ط♥̨̥̬̩").replace(/ظ/g, "ظ♥̨̥̬̩").replace(/ع/g, "ع").replace(/غ/g, "غ♥̨̥̬̩").replace(/ف/g, "ف").replace(/ق/g, "قـ♥̨̥̬̩").replace(/ك/g, "گ♥̨̥̬̩").replace(/ل/g, "ل").replace(/م/g, "مـ♥̨̥̬̩").replace(/ن/g, "ن").replace(/ه/g, "هـ♥̨̥̬̩").replace(/و/g, "و").replace(/ي/g, "ي").replace(/ى/g, "ے").replace(/ئ/g, "ئ");
      let i = content.replace(/أ/g, "أ").replace(/ا/g, "آ̯͡").replace(/ب/g, "ب̯͡").replace(/ت/g, "ت̯͡").replace(/ث/g, "ث̯͡").replace(/ج/g, "ج̯͡").replace(/ح/g, "ح̯͡").replace(/خ/g, "خ̯͡").replace(/د/g, "د̯͡").replace(/ذ/g, "ذ̯͡").replace(/ر/g, "ر̯͡").replace(/ز/g, "ز̯͡").replace(/س/g, "س̯͡").replace(/ش/g, "ش̯͡").replace(/ص/g, "ص̯͡").replace(/ض/g, "ض").replace(/ط/g, "ط̯͡").replace(/ظ/g, "ظ̯͡").replace(/ع/g, "ع̯͡").replace(/غ/g, "غ̯͡").replace(/ف/g, "ف̯͡").replace(/ق/g, "ق̯͡ ").replace(/ك/g, "ك̯͡").replace(/ل/g, "ل̯͡").replace(/م/g, "م̯͡").replace(/ن/g, "ن̯͡").replace(/ه/g, "ہ̯͡").replace(/و/g, "ۆ̯͡").replace(/ي/g, "ي̯͡").replace(/ى/g, "ﮯ̯͡").replace(/ئ/g, "ئ");
  return api.sendMessage(a + "\n\n" + b + "\n\n" + c + "\n\n" + d + "\n\n" + e + "\n\n" + f + "\n\n" + g + "\n\n" + h + "\n\n" + i + "\n\n═════◄∘∘❀∘∘►════", threadID, messageID);
}

//أ بَ ت ث جٍ حٍ خـ دِ ذَ رٍ زْ س شُ ص ض طُ ظً عٍ غ فُ قٌ ڪ لُِ م ن هـ وُ ي آ ئ ﮯ

//أ ب͠ ت͠ ث͠ ج͠ ح͠ خ͠ د͠ ذ͠ ر ز͠ س͠ ش͠ ص͠ ض ط͠ ظ͠ ع͠ غ͠ ف͠ ق͠ گ͠ ل͠ م͠ ن͠ ه͠ و͠ ي͠ آ͠ ئ ے͠

//أ ب̷ ت̷ ث̷ ج̷ ح̷ خ̷ د̷ِ ذ̷ ر̷ ز̷ س̷ ش̷ُ ص̷ ض ط̷ُ ظ̷ً ع̷ٍ غ̷ ف̷َ ق̷ گ̷ ل̷ م̷ ن̷ ہ̷ ۆ̷ ي̷ ٵ̷  ئ ﮯ̷

//أ ب̲ ت̲ ث̲ ج̲ ح̲ خ̲ د̲ ذ̲ ر̲ ز̲ س̲ ش̲ ص̲ ض ط̲ ظً̲ ع̲ غ̲ ف̲ ق̲ ك̲ ل̲ م̲ ن̲ ہ̲ ۆ̲ ي̲ آ̲ ئ ﮯ̲

//أ ̜̌ب تـ, ثـ جٍ و خ ﮃ ذ رٍ زً سًٌُُ شُ ص ض طُ ظً ۶ غ فَ ق گ لُ مـ ن ه̷̸̐ ۈ يَ إآ ئ ﮯ

//أ ب̀́ ت̀́ ث̀́ ج̀́ ح̀́ خ̀́ د̀́ ذ̀́ ر̀́ ز̀́ س̀́ ش̀́ ص̀́ ض ط̀́ ظ̀́ ع̀́ غ̀́ ف̀́ ق̀́ ك̀́ ل̀́ م̀́ ن̀́ ه̀́ ۈ̀́ ي̀́ آ̀́ ئ ﮯ

//أ ب ت ث جٍ حٍ خـ دِ ڌ رٍ ز س شُ ص ض طُ ظً عٍ غ فَ ق گ لُ م ن ہ ۆ يَ آ ئ ﮯ
