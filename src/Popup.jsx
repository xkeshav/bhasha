/* eslint-disable react/prop-types */
import { useState } from "react";
import "./assets/styles/pop.css";

const LANGUAGE_MAPPER = {
  hi: "Hindi",
  en: "English",
  ta: "Tamil",
  te: "Telugu",
  ml: "Malayalam",
  mr: "Marathi",
  bn: "Bengali",
  as: "Assamese",
  gu: "Gujarati",
  kn: "Kannada",
  or: "Odia",
  pa: "Punjabi",
}

export const Popup = ({  targetLang, bhashiniTranslator }) => {
  
  const [targetLanguage, setTargetLanguage] = useState(targetLang || "none");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [rerenderKey, setRerenderKey] = useState(0);

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
    document.getElementById("translateButton").focus();
  };

  const handleTranslateClick = () => {
    const targetLanguageButton = document.getElementById("targetLanguage");
    targetLanguageButton.setAttribute("disabled", "true");

    const errorMessage = document.querySelector(".error__message");
    if (targetLanguage === "none") {
      targetLanguageButton.removeAttribute("disabled");
      errorMessage.style.display = "flex";
      return;
    }
    errorMessage.style.display = "none";
    bhashiniTranslator
      .translateDOM(document.body, sourceLanguage, targetLanguage, 22)
      .then((res) => {
        console.log({res});
        targetLanguageButton.removeAttribute("disabled");
        setSourceLanguage(targetLanguage);
        setRerenderKey((prev) => prev + 1);
      })
      .catch(() => {
        targetLanguageButton.removeAttribute("disabled");
      });
  };


  const handleReset = () => {
    window.location.reload();
  };

  return (
    <div key={rerenderKey} className="container__language" >
      <div className="selection" >
        <label className="selection__label" > Translate to: </label>
        <select
          id="targetLanguage"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          className="language__dropdown"
        >
          <option value="none">Select Language</option>
          {Object.entries(LANGUAGE_MAPPER).map(([code,name], i) => (
            <option key={i} value={code}>{name}</option>
          ))}
        </select>
      </div>
      <div className="error__message" >
        <span>Please select a target language</span>
      </div>

      <div className="container__btn" >
          <button
            id="translateButton"
            disabled={false}
            onClick={handleTranslateClick}
            className="btn__translate"
          >
          Translate
          </button>
          <button
            className="btn__reset"
            onClick={handleReset}
          >
          Reset
          </button>
      </div>
    </div>
  );
};

export default Popup;
