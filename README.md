# openAI Chatbot

#### Voice responsive chatbot

#### By Andrew Le

## Technologies Used

* openAI API
* CSS
* Javascript
* HTML
* webKitSpeechRecognition
* speechSynthesis
* express
* dotEnv

## Description

Thanks for taking a peek at my continued project! What I am attempting to develope is a web app that takes in a user voice prompt and sends the prompt to the openAI API for a voice generated response. Later iterations of the web app will be including a mobile native version and I intend to also impliment a database for user defined assets of "short term memory" for the AI to respond to. The overall idea is to create a more natarual openAI experience, in a way a closer approximation of a digital personal assistent. 

## Setup/Installation Requirements

* node.js
* npm globally installed
* openAI API key
* Latest version of Chrome web Browser
* vsCode

Before downloading a clone of my project to your local machine for testing and alterations please ensure that you have a current and functional key with openAI for use of their API's. 

after downloading a clone of my project from GitHub, navigate to the associated file path and ensure to run these commands in your terminal.

```console
npm i
```

```console
touch .env
```

in the .env file insert your personal openAI API key. The file, when done properly, should look something like this (note: what you see below is not an actual key and will not work)

```dotenv
OPENAI_API_KEY=sk-VADGndgbergbbry1565asdf12asdf1g6e161sdfg681eVASDF54134fdsdfvw
```

at this point you should be able to type in your console to run the project

```console
node script.js
```

## Known Bugs

* there is a known issue with openAI updating their version of the api from 3.x.x. to 4.x.x.
* refer to this [link](https://github.com/openai/openai-node/discussions/217) for documentation of the migration of the code. this project has already migrated the appropriate code to 4.x.x.

## License

I AM THE LAW! In this city, we've got a saying: once is coincidence, twice is a booking offense! -Judge Dredd

## Contact Information

* andrewledev@gmail.com

* see [here](https://lucid.app/lucidchart/57672b93-9bcd-45a4-8b31-190fdce39d9c/edit?viewport_loc=7%2C-123%2C2617%2C1416%2C0_0&invitationId=inv_4ee9f9d1-1143-4e6a-9b50-e606fa5237fc) for my ERD chart

* see [here](https://trello.com/b/jXieEuAo) for my current trello board

* see [here]() for my wireframe