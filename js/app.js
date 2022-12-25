const textarea = document.querySelector("#word");
const result = document.querySelector("#result > span");
const button = document.querySelector("#translate-btn");
const replaceBtn = document.querySelector(".replace");
const divLang1 = document.querySelector(".lang1");
const divLang2 = document.querySelector(".lang2");
const audioIcons = document.querySelectorAll(".bi-mic");
const copyIcons = document.querySelectorAll(".bi-clipboard");

let lang1 = "en";
let lang2 = "uz";

// Translate Text
button.addEventListener("click", async () => {
  const word = textarea.value;
  if (!word) {
    result.innerHTML = "So'z kiritilmadi";
  } else {
    const apiUrl = `https://api.mymemory.translated.net/get?q=${word}&langpair=${lang1}|${lang2}`;
    const jsonData = await fetch(apiUrl);
    const data = await jsonData.json();
    result.innerHTML = data.responseData.translatedText;
    console.log(data);
  }

  console.log();
});

// Replace Language
replaceBtn.addEventListener("click", () => {
  let text;
  if (lang1 == "en") {
    divLang1.innerHTML = "Uzbek";
    divLang2.innerHTML = "English";
    text = result.innerHTML;
    result.innerHTML = textarea.value;
    textarea.value = text;
    lang1 = "uz";
    lang2 = "en";
  } else {
    divLang1.innerHTML = "English";
    divLang2.innerHTML = "Uzbek";
    text = result.innerHTML;
    result.innerHTML = textarea.value;
    textarea.value = text;
    lang1 = "en";
    lang2 = "uz";
  }
});

// Speak Text
audioIcons.forEach((item) => {
  item.addEventListener("click", () => {
    let textAudio;
    if (item.classList.contains("from")) {
      textAudio = new SpeechSynthesisUtterance(textarea.value);
      textAudio.lang = lang1;
    } else {
      textAudio = new SpeechSynthesisUtterance(result.innerHTML);
      textAudio.lang = lang2;
    }
    speechSynthesis.speak(textAudio);
  });
});

// Copy Text
copyIcons.forEach((item) => {
  item.addEventListener("click", () => {
    if (item.classList.contains("from")) {
      navigator.clipboard.writeText(textarea.value);
    } else {
      navigator.clipboard.writeText(result.innerHTML);
    }
  });
});
