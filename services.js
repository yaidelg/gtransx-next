module.exports = [
  {
    URL: (src, tgt, text) => `http://localhost:3000/?op=translate&sl=${src}&tl=${tgt}&text=${text}`,
    SELECTOR: ".lmt__translations_as_text__text_btn",
    NAME: "Local",
  },
  {
    URL: (src, tgt, text) => `https://translate.google.com/#view=home&op=translate&sl=${src}&tl=${tgt}&text=${text}`,
    SELECTOR: ".tlid-result > .result > .result-footer > .tlid-copy-translation-button",
    NAME: "Google",
  },
  {
    URL: (src, tgt, text) => `https://www.deepl.com/en/translator#${src}/${tgt}/${text}`,
    SELECTOR: ".lmt__target_toolbar > .lmt__target_toolbar__copy > button",
    NAME: "Deepl",
  },
  {
    URL: (src, tgt, text) => `https://www.bing.com/translator?from=${src}&to=${tgt}&text=${text}`,
    SELECTOR: "#tta_out > #tta_outoption > #tta_outctrl #tta_copyIcon",
    NAME: "Bing",
  },
];
