
/*
https://flaviocopes.com/speech-synthesis-api/
https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
https://www.smashingmagazine.com/2017/02/experimenting-with-speechsynthesis/
https://w3c.github.io/speech-api/#utterance-attributes

 */



export class SpeechSynthesis {
    "use strict"
    
    constructor() {


        this.speechSynthesis = new SpeechSynthesisUtterance();

        this._loadVoices();


        // set default properties
        this.speechSynthesis.volume = 1; // 0 to 1
        this.speechSynthesis.rate = 1.1; // 0.1 to 10
        this.speechSynthesis.pitch = 0.3; //0 to 2

        this.speechSynthesis.lang = 'en-US';
        this.speechSynthesis.voiceURI = 'native';
        this.speechSynthesis.voice = this.getVoice(this.speechSynthesis.lang); // Note: some voices don't support altering params
    }

    _loadVoices() {

        // required for Chrome
        speechSynthesis.onvoiceschanged = () => {
            this.voices = speechSynthesis.getVoices();
        };


        this.voices = speechSynthesis.getVoices();

    }

    setProperty(property, value) {

        this.speechSynthesis[property] = value;

    }

    getVoice(lang) {

        return this.voices.filter(voice => voice.lang == lang)[0];

    }

    getVoices() {

        return this.voices.reduce((acc, voice) => acc.concat(voice.name), []);

    }

    getVoicesRaw() {

        return this.voices

    }

    TTS(text) { // maximum 32767 characters


        this.speechSynthesis.text = text;

        speechSynthesis.speak(this.speechSynthesis);


    }

    replay() {

        speechSynthesis.speak(this.speechSynthesis);

    }

    attachEvent(event, func) {


        this.speechSynthesis[event] = func;

        /*this.speechSynthesis.onend = function (event) {
            console.log('Finished in ' + event.elapsedTime + ' seconds.');
        };*/

    }

}

// if ( 'speechSynthesis' in window ) {

