const express = require('express');
const router = express.Router();
const ShortId = require('shortid')
const axios = require('axios');
const queue = require('../jobQueue')
require('dotenv').config()

router.post('/executeCode', async (req, res) => {

  const language = req.body.language
  const code = req.body.code
  const id = Date.now();
  queue.pushToQueue(id, code, language, req, res)

  // const codeData = {
  //   code: code,
  //   language: language
  // }

  // try {

  //   var data

  //   switch(language) {
  //     case "cpp":
  //       data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_CPP_PATH}/${process.env.SERVER_CPP_EXECUTION_ENDPOINT}`, codeData);
  //       break;
  //     case "java":
  //       data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_JAVA_PATH}/${process.env.SERVER_JAVA_EXECUTION_ENDPOINT}`, codeData);
  //       break;
  //     default:
  //       // code block
  //   }
    
  //   const response = {
  //     state: data.data.state,
  //     output: data.data.output
  //   }

  //   res.status(200).send(response);
  // } catch (error) { 
  //   console.error('Error sending data:', error.message);
  //   res.status(500).send('Failed to send data');
  // }

});

function processQueue() {
    if (queue.getQueue().length > 0) {
        const { id, code, language, req, res } = queue.shiftQueue();
        
        setTimeout(async () => {
            const processedData = await processData(id, code, language);
            res.json(processedData);
            console.log(`Processed data sent back for ID: ${id}`);
        }, 2000);
    }
}

async function processData(id, code, language) {

  const codeData = {
    code: code,
    language: language
  }

  var response = {}

  try {

    var data

    switch(language) {
      case "cpp":
        data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_CPP_PATH}/${process.env.SERVER_CPP_EXECUTION_ENDPOINT}`, codeData);
        // data = {data: {state: "fine", output: "hello"}}
        break;
      case "java":
        data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_JAVA_PATH}/${process.env.SERVER_JAVA_EXECUTION_ENDPOINT}`, codeData);
        break;
      default:
        // code block
    }
    
    response = {
      state: data.data.state,
      output: data.data.output
    }

    // res.status(200).send(response);
  } catch (error) { 
    console.error('Error sending data:', error.message);
    // res.status(500).send('Failed to send data');
  }

  console.log(response)
    return response;
}

setInterval(processQueue, 1000);

module.exports = router;