import mongoose from "mongoose";

const starterCodeBestTimeStock = `function maxProfit(prices) {
  // Write your code here
};`;

const bestTimeStockProblem = [
  {
    id: 9,
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",

    problemStatement: `<p className='mt-3'>
      You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.
    </p>
    <p className='mt-3'>
      You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.
    </p>
    <p className='mt-3'>
      Return the <strong>maximum profit</strong> you can achieve. If you cannot achieve any profit, return <code>0</code>.
    </p>`,

    // will be replaced dynamically during seeding
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4020"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4021"),
    ],

    constraints: `
      <li className='mt-2'><code>1 ≤ prices.length ≤ 10^5</code></li>
      <li className='mt-2'><code>0 ≤ prices[i] ≤ 10^4</code></li>
    `,

    order: 9,

    starterCode: starterCodeBestTimeStock,

    handlerFunction: `function handleMaxProfit(maxProfit, assert) {
      const tests = [
        [7, 1, 5, 3, 6, 4],
        [7, 6, 4, 3, 1],
        [1, 2],
        [2, 4, 1]
      ];

      const answers = [5, 0, 1, 2];

      for (let i = 0; i < tests.length; i++) {
        const result = maxProfit(tests[i]);
        assert.strictEqual(result, answers[i]);
      }
      return true;
    }`,
  },
];

export default bestTimeStockProblem;
