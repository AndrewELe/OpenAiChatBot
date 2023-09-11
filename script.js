let isSpeaking = false;

if ("webkitSpeechRecognition" in window) {

    // Speech Recognition Stuff goes here
    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = "en-US";

    document.querySelector("#start").onclick = () => {
        speechRecognition.start();
    };
    document.querySelector("#stop").onclick = () => {
        speechRecognition.stop();
    };
    document.querySelector("#hide").onclick = () => {
        document.querySelector("#terminal").style.display = "none";
    };
    document.querySelector("#show").onclick = () => {
        document.querySelector("#terminal").style.display = "block";
    };

    speechRecognition.onstart = () => {
        document.querySelector("#status").style.display = "block";
        console.log("Speech Recon has STARTED...")
    };
    speechRecognition.onend = () => {
        document.querySelector("#status").style.display = "none";
        console.log("Speech Recon has ENDED...")
    };
    speechRecognition.onError = () => {
        document.querySelector("#status").style.display = "none";
        console.log("Error!")
    };

    // Set up 'speechRecognition.onresult' to process the recognition results
    speechRecognition.onresult = (event) => {

        if (event.results[0].isFinal) {
            commandInput = event.results[0][0].transcript;
            console.log("Command input: ", commandInput)
            $('#terminal').terminal().exec(commandInput); // inject the command "my_command" into the terminal
        } else {
            console.log("Not logging speech, because condition not met.")
        }
    };


    if ("speechSynthesis" in window) { console.log("Speech Synthesis is supported by browser") } else console.log("Speech Synthesis not supported.")

    let speech = new SpeechSynthesisUtterance();
    const voicesList = window.speechSynthesis.getVoices()
    speech.voice = voicesList.find((voice) => voice.lang === 'en-US')
    speech.lang = "en-US";


    speech.onend = () => {
        setTimeout(() => {
            isSpeaking = false; // update the 'isSpeaking' flag to indicate that speech synthesis is not active
            console.log("isSpeaking set to ", isSpeaking)
            speechRecognition.start()
        }, 1800)

    }


    // set up terminal window and define commands
    $("#terminal").terminal(async function (command, terminal) {
        try {
            const response = await fetch(
                `http://localhost:3000/completion/${command}`,
                {
                    // mode: 'no-cors',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            ).then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log("JSON Response: ", json.completion);
                        speech.text = json.completion;
                        console.log("Speech set to JSON")
                        terminal.echo(json.completion);
                        console.log("Starting Synth...")
                        isSpeaking = true; // update the 'isSpeaking' flag to indicate that speech synthesis is not active
                        console.log("isSpeaking set to ", isSpeaking)
                        speechRecognition.stop();
                        console.log("Speech Recognition stopped.")
                        setTimeout(() => {
                            window.speechSynthesis.speak(speech)
                        }, 1000)
                    });
                }
               
            });

            console.log("Completed!");
        } catch (err) {
            console.error(`Error: ${err}`);
            speech.text = "Server error?"
            terminal.echo("Server error?")
            isSpeaking = true; 
            console.log("isSpeaking set to ", isSpeaking)
            speechRecognition.stop();
            console.log("Speech Recognition stopped.")
            setTimeout(() => {
                window.speechSynthesis.speak(speech)
            }, 1000)

        }
    },

        {
            greetings: 'AI Voicebot',
            name: 'ai_voicebot',
            height: 400,
            width: 800,
            prompt: '> '
        }

    );

} else {
    console.log("Speech Recognition Not Available")
}
