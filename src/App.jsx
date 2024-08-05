import BhashiniTranslator from "@scaler-school-of-technology/bhashini-web-translator";
import { useRef, useState, useId } from "react";
import "./assets/styles/app.css";

const BHASHINI_API_KEY = import.meta.env.VITE_BHASHINI_API_KEY;
const BHASHINI_USER_ID = import.meta.env.VITE_BHASHINI_USER_ID;

const LANGUAGE_MAPPER = {
  as: "Assamese",
  bn: "Bengali",
  brx: "Bodo",
  doi: "Dongri",
  gom: "Konkani",
  en: "English",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ks: "Kashmiri",
  mai: "Maithili",
  ml: "Malayalam",
  mni: "Manipuri",
  mr: "Marathi",
  ne: "Nepali",
  or: "Odia",
  pa: "Punjabi",
  sa: "Sanskrit",
  sat: "Santali",
  sd: "Sindhi",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu"
}

// const NATIVE_LANGUAGES = [
//   ('as' , ['Beng'], 'Assamese', ['আপোনাৰ কেনে?']),
//   ('bn' , ['Beng'], 'Bengali', ['আপনি কেমন আছেন?']),
//   ('brx', ['Deva'], 'Bodo', ['नों माबोरै दं?']),
//   ('doi', ['Deva'], 'Dogri', ['थुआढ़ा केह् हाल ऐ?']),
//   ('gom', ['Deva'], 'Konkani', ['तूं कसो आसा?']),
//   ('gu' , ['Gujr'], 'Gujarati', ['તમે કેમ છો?']),
//   ('hi' , ['Deva'], 'Hindi', ['आप कैसे हैं?']),
//   ('kn' , ['Knda'], 'Kannada', ['ನೀವು ಹೇಗಿದ್ದೀರಿ?']),
//   ('ks' , ['Aran', 'Deva'], 'Kashmiri', ['کیتھ کٕن چھ ؟', 'तिमी कसरी छौ?']),
//   ('mai', ['Deva'], 'Maithili', ['अहांक कोना छी?']),
//   ('ml' , ['Mlym'], 'Malayalam', ['സുഖമാണോ?']),
//   ('mni', ['Mtei', 'Beng'], 'Manipuri', ['ꯑꯗꯣꯝ ꯀꯝꯗꯧꯔꯤ?', 'অদোম কম্দৌরি?']),
//   ('mr' , ['Deva'], 'Marathi', ['तू कसा आहेस?']),
//   ('ne' , ['Deva'], 'Nepali', ['तिमीलाई कस्तो छ?']),
//   ('or' , ['Orya'], 'Odia', ['କେମିତି ଅଛନ୍ତି, କେମିତି ଅଛ?']),
//   ('pa' , ['Guru'], 'Punjabi', ['ਤੁਸੀ ਕਿਵੇਂ ਹੋ?']),
//   ('sa' , ['Deva'], 'Sanskrit', ['भवान्‌ कथमसि?']),
//   ('sat', ['Olck'], 'Santali', ['ᱟᱢ ᱪᱮᱫ ᱞᱮᱠᱟ ᱠᱟᱱᱟ?']),
//   ('sd' , ['Arab', 'Deva'], 'Sindhi', ['تون ڪيئن آهين؟', 'तवहां कएं आहिनि?']),
//   ('ta' , ['Taml'], 'Tamil', ['எப்படி இருக்கிறீர்கள்?']),
//   ('te' , ['Telu'], 'Telugu', ['మీరు ఎలా ఉన్నారు?']),
//   ('ur' , ['Aran'], 'Urdu', ['آپ کیسے ہو؟']),
// ]


const translator = new BhashiniTranslator(BHASHINI_API_KEY, BHASHINI_USER_ID);

const default_content = `Education providers have certain responsibilities for student visa holders.
Use our education program guide to understand education and training in Australia for students from overseas.`;

const App = () => { 
  const [targetLanguage, setTargetLanguage] = useState("none");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [postContent, setPostContent] = useState(default_content);
  const [defaultContent, setDefaultContent] = useState('');
  const [rerenderKey, setRerenderKey] = useState(0);
  const textRef = useRef();
  const textAreaId = useId();

  const clickRef = useRef(false);


  const targetLanguageDropdown = document.querySelector("#targetLanguage");
  const errorMessage = document.querySelector(".error__message");
  const loader = document.querySelector(".loader");

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
    document.getElementById("translateButton").focus();
  };

  const handleTranslateClick = () => {
    targetLanguageDropdown.setAttribute("disabled", true);
    if (targetLanguage === "none" || sourceLanguage === targetLanguage) {
      targetLanguageDropdown.removeAttribute("disabled");
      errorMessage.style.display = "flex";
      return;
    }
    clickRef.current = false;
    errorMessage.style.display = "none";
    loader.style.display = "block";
    textRef.current.style.opacity = "0.25";
    setDefaultContent(textRef.current.textContent);
    translator
      .translateDOM(textRef.current, sourceLanguage, targetLanguage, 22)
      .then((res) => {
        setPostContent(res.textContent);
        targetLanguageDropdown.removeAttribute("disabled");
        setSourceLanguage(targetLanguage);
        clickRef.current = true;
        setRerenderKey((prev) => prev + 1);
      })
      .catch(() => {
        clickRef.current = false;
        targetLanguageDropdown.removeAttribute("disabled");
      }).finally(()=> {
        loader.style.display = "none";
        textRef.current.style.opacity = "1";
        errorMessage.style.display = "none";
      })
  };

  const handleReset = () => {
    setPostContent(defaultContent);
    setSourceLanguage("en");
    setTargetLanguage("en");
    window.location.reload();
  };

  const onPost = (e) =>{
    setPostContent(e.target.value);
    setDefaultContent(postContent);
  }

  return (
    <>
    <header>
        <h1>Language Conversion Utility</h1>
        <p>Basic utility which convert content into <b>22</b> indian languages.</p>
    </header>
    <main className="container__main">
      <section className="section__content" >
          <label htmlFor={textAreaId}>Post your content below {targetLanguage && <span>(current language: <mark>{LANGUAGE_MAPPER[targetLanguage] || "English"}</mark> )</span>}
          </label>
            <div className="center"><div className="loader"></div></div>
            <textarea 
            name="content" 
            id={textAreaId} 
            className="content" 
            placeholder="paste your content here" 
            rows={20} 
            cols={60} 
            ref={textRef} 
            value={postContent} 
            autoFocus={true}
            onChange={onPost}></textarea>
      </section>
      <section key={rerenderKey} className="section__language" >
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
        <div className="container__btn" >
            <button
              id="translateButton"
              disabled={targetLanguage === "none"}
              onClick={handleTranslateClick}
              className="btn btn__translate"
            >
            Translate
            </button>
            <button
              id="resetButton"
              className="btn btn__reset"
              onClick={handleReset}
            >
            Reset
            </button>
        </div>
      </section>
      <div className="error__message" >
          <span>Please select a target language</span>
      </div>
    </main>
    <footer>
      &copy; 2024 | RecursiveZero pvt. ltd. | All rights reserved.
    </footer>
    </>
  );
};

export default App;
