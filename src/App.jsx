import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";
import { useRef, useState, useId } from "react";
import "./assets/styles/pop.css";

const BHASHINI_API_KEY = "3816246d10-bcc2-482c-9770-ca8d65c74531";
const BHASHINI_USER_ID = "1b3dee391c3346b09e6de07602b3e0bd";


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

const translator = new BhashiniTranslator(BHASHINI_API_KEY, BHASHINI_USER_ID);

const default_content = `Education providers have certain responsibilities for student visa holders.
          Use our education program guide to understand education and training in Australia for students from overseas.`;

const App = () => { 
  const [targetLanguage, setTargetLanguage] = useState("none");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [postContent, setPostContent] = useState(default_content);
  const [rerenderKey, setRerenderKey] = useState(0);
  const textRef = useRef();
  const textAreaId = useId();


  const targetLanguageButton = document.querySelector("#targetLanguage");
  const errorMessage = document.querySelector(".error__message");

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
    document.getElementById("translateButton").focus();
  };

  const handleTranslateClick = () => {
    targetLanguageButton.setAttribute("disabled", "true");
    if (targetLanguage === "none") {
      targetLanguageButton.removeAttribute("disabled");
      errorMessage.style.display = "flex";
      return;
    }
    errorMessage.style.display = "none";

    translator
      .translateDOM(textRef.current, sourceLanguage, targetLanguage, 22)
      .then((res) => {
        // console.log(res.textContent);
        setPostContent(res.textContent);
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
    <main>
      <section className="content__section" >
        <label htmlFor={textAreaId}> Write your post below </label>
          {/* <p>
            Education providers have certain responsibilities for student visa holders.
            Use our education program guide to understand education and training in Australia for students from overseas.
          </p> */}
          <textarea 
          name="content" 
          id={textAreaId} 
          className="content" 
          placeholder="paste your content here" 
          rows={20} 
          cols={60} 
          ref={textRef} 
          value={postContent} 
          onChange={e => setPostContent(e.target.value)}></textarea>
      </section>
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
    </main>
  );
};

export default App;
