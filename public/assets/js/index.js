const translation = {
    en: {        Homeitem: "Home",

    },
    ar: {
        Homeitem: "الرئيسية",

    }
}
const changeButton = document.getElementById("language");

changeButton.addEventListener('change',(event)=>{
    setLanguage(event.target.value);
    localStorage.setItem("langg" , event.target.value);
});
document.addEventListener("DOMContentLoaded",()=>{
// When setting the language
localStorage.setItem("langg", event.target.value);

// When retrieving the language
const storedLanguage = localStorage.getItem("langg") || 'en';  // Default to 'en'
setLanguage(storedLanguage);
});
function setLanguage(language) {
    console.log('Language being set:', language);  // Debugging line
    const elements = document.querySelectorAll('[data-lang]');
    
    elements.forEach((element) => {
        const translationId = element.getAttribute("data-lang");
        
        // Debugging line to check the translation object
        console.log(`Looking for ${translationId} in language ${language}`);
        
        if (translation[language] && translation[language][translationId]) {
            element.textContent = translation[language][translationId];
        } else {
            console.error(`Translation not found for ${translationId} in language ${language}`);
        }
        
        // Set direction based on language
        if (language === "en") {
            document.dir = "ltr";
        } else {
            document.dir = "rtl";
        }
    });
}
