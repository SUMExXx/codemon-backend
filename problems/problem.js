module.exports.problem = {
    "id": 2,
    "title": "Sum of Natural Numbers till n",
    "description": `<h1 className="text-2xl font-bold mb-4 text-gray-800">Problem: Sum of Natural Numbers till n</h1>
              <p className="text-gray-700 mb-4">
                  Given a positive integer <code className="bg-gray-100 p-1 rounded">n</code>, write a function that calculates the sum of all natural numbers from <code className="bg-gray-100 p-1 rounded">1</code> to <code className="bg-gray-100 p-1 rounded">n</code>. A natural number is a positive integer greater than <code className="bg-gray-100 p-1 rounded">0</code>.
              </p>
              <p className="text-gray-700 mb-4">
                  The sum of the first <code className="bg-gray-100 p-1 rounded">n</code> natural numbers can be computed using the following formula:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg mb-4">
                  <code className="text-gray-900">
                      Sum = n * (n + 1) / 2
                  </code>
              </pre>
              <p className="text-gray-700 mb-4">
                  Implement the following function:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg mb-4">
                  <code className="text-gray-900">
                      function sumOfNaturalNumbers(n: number): number;
                  </code>
              </pre>
              <p className="text-gray-700 mb-4">
                  <strong>Input:</strong> A single integer <code className="bg-gray-100 p-1 rounded">n</code> (1 ≤ <code className="bg-gray-100 p-1 rounded">n</code> ≤ 10<sup>6</sup>), representing the upper limit of the natural numbers to sum.
              </p>
              <p className="text-gray-700 mb-4">
                  <strong>Output:</strong> A single integer representing the sum of all natural numbers from <code className="bg-gray-100 p-1 rounded">1</code> to <code className="bg-gray-100 p-1 rounded">n</code>.
              </p>
              <p className="text-gray-700 mb-4">
                  <strong>Example:</strong>
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg mb-4">
                  <code className="text-gray-900">
                      {\`// Example 1
                      const result = sumOfNaturalNumbers(5);
                      console.log(result); // Output: 15

                      // Example 2
                      const result = sumOfNaturalNumbers(10);
                      console.log(result); // Output: 55\`}
                  </code>
              </pre>
              <p className="text-gray-700 mb-4">
                  <strong>Constraints:</strong> The input integer <code className="bg-gray-100 p-1 rounded">n</code> is guaranteed to be a positive integer and does not exceed 10<sup>6</sup>.
              </p>`,
    "boilerplate": `#include <bits/stdc++.h>
using namespace std;

int main() {
	// your code goes here

}`,
    // "datatype": "number",
    "test_case_show": [
        {
            "input": "5",
            "expected_output": "15"
        },
        {
            "input": "10",
            "expected_output": "55"
        }
    ],
    "test_case_hidden": [
        {
            "input": "100",
            "expected_output": "5050"
        },
        {
            "input": "1",
            "expected_output": "1"
        }
    ],
    "difficulty": "Easy"
}
