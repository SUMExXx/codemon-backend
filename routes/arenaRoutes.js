const express = require('express');
const router = express.Router();
const ShortId = require('shortid')
const axios = require('axios');
const queue = require('../jobQueue')
const problem = require('../problems/problem')
require('dotenv').config()

// router.post('/executeCode', async (req, res) => {

//   const language = req.body.language
//   const code = req.body.code
//   const id = Date.now();
//   queue.pushToQueue(id, code, language, req, res)

//   // const codeData = {
//   //   code: code,
//   //   language: language
//   // }

//   // try {

//   //   var data

//   //   switch(language) {
//   //     case "cpp":
//   //       data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_CPP_PATH}/${process.env.SERVER_CPP_EXECUTION_ENDPOINT}`, codeData);
//   //       break;
//   //     case "java":
//   //       data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_JAVA_PATH}/${process.env.SERVER_JAVA_EXECUTION_ENDPOINT}`, codeData);
//   //       break;
//   //     default:
//   //       // code block
//   //   }
    
//   //   const response = {
//   //     state: data.data.state,
//   //     output: data.data.output
//   //   }

//   //   res.status(200).send(response);
//   // } catch (error) { 
//   //   console.error('Error sending data:', error.message);
//   //   res.status(500).send('Failed to send data');
//   // }

// });

// function processQueue() {
//     if (queue.getQueue().length > 0) {
//         const { id, code, language, req, res } = queue.shiftQueue();
        
//         setTimeout(async () => {
//             const processedData = await processData(id, code, language);
//             res.json(processedData);
//             console.log(`Processed data sent back for ID: ${id}`);
//         }, 2000);
//     }
// }

// async function processData(id, code, language) {

//   const codeData = {
//     code: code,
//     language: language
//   }

//   var response = {}

//   try {

//     var data

//     switch(language) {
//       case "cpp":
//         data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_CPP_PATH}/${process.env.SERVER_CPP_EXECUTION_ENDPOINT}`, codeData);
//         // data = {data: {state: "fine", output: "hello"}}
//         break;
//       case "java":
//         data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_JAVA_PATH}/${process.env.SERVER_JAVA_EXECUTION_ENDPOINT}`, codeData);
//         break;
//       default:
//         // code block
//     }
    
//     response = {
//       state: data.data.state,
//       output: data.data.output
//     }

//     // res.status(200).send(response);
//   } catch (error) { 
//     console.error('Error sending data:', error.message);
//     // res.status(500).send('Failed to send data');
//   }

//   console.log(response)
//     return response;
// }

// setInterval(processQueue, 1000);

router.post('/problem', (req, res) => {

  // const problemId = req.bosy.problemId;

  res.send(problem.problem);
})

router.post('/test', async (req, res) => {
  // const problemId = req.bosy.problemId;
  const language = req.body.language
  const code = req.body.code

  // const datatype = problem.problem.datatype;
  const testCaseShow = problem.problem.test_case_show;
  const testCaseHidden = problem.problem.test_case_hidden;

  const codeData = {
    code: code,
    language: language,
    // datatype: datatype,
    testCaseShow: testCaseShow,
    testCaseHidden: testCaseHidden,
  }

  var response = {}

  try {

    var data

    switch(language) {
      case "cpp":
        data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_ARENA_CPP_PATH}/${process.env.SERVER_ARENA_CPP_TEST_ENDPOINT}`, codeData);
        // data = {data: {state: "fine", output: "hello"}}
        // console.log(data)
        break;
      case "java":
        data = await axios.post(`${process.env.SERVER_IP}:${process.env.SERVER_PORT}/${process.env.SERVER_ARENA_JAVA_PATH}/${process.env.SERVER_ARENA_JAVA_TEST_ENDPOINT}`, codeData);
        break;
      default:
        // code block
    }
    
    // response = {
    //   result: data.data.result
    // }

    const result = data.data.result

    var report = []

    var fullPass = true;

    testCaseShow.map((testcase) => {
      if(testcase.input in result){
        const userInput = result[testcase.input];
        if(userInput.output == testcase.expected_output){
          const time = parseInt(userInput.endTime) - parseInt(userInput.startTime)
          report.push({"status": "pass", "input": testcase.input, "output": userInput.output, "expected": testcase.expected_output, "time": time.toString()})
        }else{
          report.push({"status": "fail", "input": testcase.input, "output": userInput.output, "expected": testcase.expected_output, "time": '-1'})
          fullPass = false;
        }
      }else{
        report.push({"status": "fail", "input": testcase.input, "output": "", "expected": testcase.expected_output, "time": '-1'})
        fullPass = false;
      }
    })

    response = {
      report: report,
      fullPass: fullPass
    }

    res.status(200).send(response);
  } catch (error) { 
    console.error('Error sending data:', error.message);
    res.status(500).send('Failed to send data');
  }

})

module.exports = router;