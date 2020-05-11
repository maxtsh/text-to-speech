// Init Speech Synth API
const synth = window.speechSynthesis;

const textForm = document.querySelector('#speak-form'),
      textInput = document.querySelector('#text-input'),
      voiceSelect = document.querySelector('#voice-select'),
      rate = document.querySelector('#rate'),
      rateValue = document.querySelector('#rate-value'),
      pitch = document.querySelector('#pitch'),
      pitchValue = document.querySelector('#pitch-value'),
      body = document.querySelector('body');


// Initialize Voice Inputs
let voices = [];

const getVoices = () => {
    voices = synth.getVoices();
    // Loop Through voices and create option for each one
    voices.forEach((voice) => {
        // Create Option Element
        const option = document.createElement('option');
        // Fill The Option With Voice And Language
        option.textContent = voice.name + '(' + voice.lang +')';
        // Set Needed Option Attribute
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}
getVoices();
// The synth getVoices needs a call back because it is async funtion so we need this below:
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check if Speaking
    if(synth.speaking){
        console.error('Already Speaking');
        return
    }
    if(textInput.value !== ''){
        // Add Background Animation
        // body.style.background = 'url(../img/wave.gif)';
        // body.style.backgroundRepeat = 'repeat-x';
        // body.style.backgroundSize = '100% 100%';

        // Get Speak Text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak End
        speakText.onend = (e) => {
            console.log('Done Speaking.');
            // body.style.background = '';
        }

        // If Speak Error
        speakText.onerror = (e) => {
            console.error('Something Went Wrong');
        }

        // Selected Voice
        const slectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop Through Voices
        voices.forEach((voice) => {
            if(voice.name === slectedVoice){
                speakText.voice = voice;
            }
        });

        // Set Pitch And Rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
    }
}

// Event Listeners

// Text Form Submit
textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate Value Change
rate.addEventListener('change', (e) => rateValue.textContent = rate.value);
// Pitch Value Change
pitch.addEventListener('change', (e) => pitchValue.textContent = pitch.value);
// Voice Select Change Then Speak
voiceSelect.addEventListener('change', (e) => speak());
