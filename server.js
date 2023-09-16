// import openai stuff
import OpenAI from 'openai';

// import express, create the server (app) and assign a port number
import express from 'express'
const app = express()
const port = 3000

// import dotenv to store our openai key in a .env file
import 'dotenv/config'


// OpenAI API setup

  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

// call OpenAI API
const APIcall = async (input) => {

    const prompt = `You are a helpful chatbot. I say: ${input} \n You say:`
   
    const result = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.91,
      max_tokens: 450,
    });
    
    const promptOutput = result.choices.pop();
    return promptOutput.text
  };


// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


// set up route
app.get('/completion/:stuff', async (req, res) => {
    console.log("Received: ", req.params.stuff)
    let answerFromOpenAI = await APIcall(req.params.stuff);
    console.log("Output: ",  answerFromOpenAI)
    res.status(200).json({ completion: answerFromOpenAI })
   })

// run server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })