const express = require('express');
const router = express.Router();
const ShortId = require('shortid')
const axios = require('axios');
const queue = require('../jobQueue')
const problem = require('../problems/problem')
const Problems = require('../models/problems')
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

router.post('/problem', async (req, res) => {

  const problemId = req.body.id;

  await Problems.findOne({id: problemId}).then(async (problem) => {
    res.send(problem);
  })

  // res.send(problem.problem)
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

router.post('/create', async (req, res) => {
    try {
        const predefinedData = {
            id: 1,
            title: "Sum of Natural Numbers till n",
            description: "<h1 class='text-2xl font-bold mb-4 text-gray-800'>Problem: Sum of Natural Numbers till n</h1><p class='text-gray-700 mb-4'>Given a positive integer <code class='bg-gray-100 p-1 rounded'>n</code>, write a function that calculates the sum of all natural numbers from <code class='bg-gray-100 p-1 rounded'>1</code> to <code class='bg-gray-100 p-1 rounded'>n</code>. A natural number is a positive integer greater than <code class='bg-gray-100 p-1 rounded'>0</code>.</p><p class='text-gray-700 mb-4'>The sum of the first <code class='bg-gray-100 p-1 rounded'>n</code> natural numbers can be computed using the following formula:</p><pre class='bg-gray-100 p-4 rounded-lg mb-4'><code class='text-gray-900'>Sum = n * (n + 1) / 2</code></pre><p class='text-gray-700 mb-4'>Implement the following function:</p><pre class='bg-gray-100 p-4 rounded-lg mb-4'><code class='text-gray-900'>function sumOfNaturalNumbers(n: number): number;</code></pre><p class='text-gray-700 mb-4'><strong>Input:</strong> A single integer <code class='bg-gray-100 p-1 rounded'>n</code> (1 ≤ <code class='bg-gray-100 p-1 rounded'>n</code> ≤ 10<sup>6</sup>), representing the upper limit of the natural numbers to sum.</p><p class='text-gray-700 mb-4'><strong>Output:</strong> A single integer representing the sum of all natural numbers from <code class='bg-gray-100 p-1 rounded'>1</code> to <code class='bg-gray-100 p-1 rounded'>n</code>.</p><p class='text-gray-700 mb-4'><strong>Example:</strong></p><pre class='bg-gray-100 p-4 rounded-lg mb-4'><code class='text-gray-900'>{`// Example 1\nconst result = sumOfNaturalNumbers(5);\nconsole.log(result); // Output: 15\n\n// Example 2\nconst result = sumOfNaturalNumbers(10);\nconsole.log(result); // Output: 55`}</code></pre><p class='text-gray-700 mb-4'><strong>Constraints:</strong> The input integer <code class='bg-gray-100 p-1 rounded'>n</code> is guaranteed to be a positive integer and does not exceed 10<sup>6</sup>.</p>",
            boilerplate: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\t// your code goes here\n\n}",
            test_case_show: [
                {
                    input: "5",
                    expected_output: "15"
                },
                {
                    input: "10",
                    expected_output: "55"
                }
            ],
            test_case_hidden: [
                {
                    input: "100",
                    expected_output: "5050"
                },
                {
                    input: "1",
                    expected_output: "1"
                }
            ],
            difficulty: "Easy"
        };

        // Create a new problem instance with predefined data
        const newProblem = new Problems(predefinedData);

        // Save the problem to MongoDB
        await newProblem.save();
        res.status(201).json(newProblem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;