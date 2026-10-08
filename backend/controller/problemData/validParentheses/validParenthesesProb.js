import mongoose from "mongoose";

const starterCodeValidParentheses = `function validParentheses(s) {
  // Write your code here
};`;

const validParenthesesProblem = [
  {
    id: 4,
    title: "Valid Parentheses",
    difficulty: "Easy",

    problemStatement: `
      <p className='mt-3'>
        Given a string <code>s</code> containing characters <code>(){}[]</code>, 
        determine if the string is valid.
      </p>
      <ul>
        <li class='mt-2'>Open brackets must be closed by the same type.</li>
        <li class='mt-2'>Open brackets must be closed in the correct order.</li>
        <li class='mt-2'>Every close bracket must have a matching open bracket.</li>
      </ul>
    `,

    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4201"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4202"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4203"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4204"),
    ],

    constraints: `
      <li class='mt-2'><code>1 ≤ s.length ≤ 10⁴</code></li>
      <li class='mt-2'><code>s</code> only contains characters <code>()[]{}.</code></li>
    `,

    order: 4,

    starterCode: starterCodeValidParentheses,

    handlerFunction: `function handleValidParentheses(validParentheses, assert) {
      const tests = ["()", "()[]{}", "(]", "([)]", "{[]}"];
      const answers = [true, true, false, false, true];

      for (let i = 0; i < tests.length; i++) {
        const result = validParentheses(tests[i]);
        assert.strictEqual(result, answers[i]);
      }
      return true;
    }`,
  },
];

export default validParenthesesProblem;
