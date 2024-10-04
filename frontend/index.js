import { backend } from 'declarations/backend';

const inputText = document.getElementById('inputText');
const languageSelect = document.getElementById('languageSelect');
const translateBtn = document.getElementById('translateBtn');
const outputText = document.getElementById('outputText');
const speakBtn = document.getElementById('speakBtn');
const historyList = document.getElementById('historyList');

translateBtn.addEventListener('click', translateText);
speakBtn.addEventListener('click', speakTranslation);

async function translateText() {
    const text = inputText.value;
    const targetLang = languageSelect.value;
    
    if (!text) return;

    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            const translatedText = data.responseData.translatedText;
            outputText.textContent = translatedText;
            
            // Add translation to backend
            await backend.addTranslation(text, translatedText, targetLang);
            
            // Update history
            updateHistory();
        } else {
            outputText.textContent = 'Translation failed. Please try again.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        outputText.textContent = 'An error occurred. Please try again.';
    }
}

function speakTranslation() {
    const text = outputText.textContent;
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languageSelect.value;
    speechSynthesis.speak(utterance);
}

async function updateHistory() {
    const translations = await backend.getTranslations();
    historyList.innerHTML = '';
    translations.forEach(t => {
        const li = document.createElement('li');
        li.textContent = `${t.original} -> ${t.translated} (${t.language})`;
        historyList.appendChild(li);
    });
}

// Initial history load
updateHistory();
