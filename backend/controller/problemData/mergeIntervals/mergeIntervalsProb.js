import mongoose from "mongoose";

const starterCodeMergeIntervals = `function merge(intervals) {
  // Write your code here
};`;

const mergeIntervalsProblem = [
  {
    id: 7,
    title: "Merge Intervals",
    difficulty: "Medium",
    problemStatement: `<p className='mt-3'>
      You are given an array of intervals where <code>intervals[i] = [start_i, end_i]</code>,
      merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.
    </p>`,

    // ✅ Example references (DB ObjectIds)
    examples: [
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4005"),
      new mongoose.Types.ObjectId("68bbdb23ed3810308a2f4006"),
    ],

    constraints: `<li className='mt-2'><code>1 ≤ intervals.length ≤ 10^4</code></li>
    <li className='mt-2'><code>intervals[i].length == 2</code></li>
    <li className='mt-2'><code>0 ≤ start_i ≤ end_i ≤ 10^4</code></li>`,

    order: 7,

    starterCode: starterCodeMergeIntervals,

    handlerFunction: `function handleMergeIntervals(merge, assert) {
      const tests = [
        [[[1,3],[2,6],[8,10],[15,18]], [[1,6],[8,10],[15,18]]],
        [[[1,4],[4,5]], [[1,5]]],
        [[[1,4],[0,2],[3,5]], [[0,5]]],
        [[[1,4],[5,6]], [[1,4],[5,6]]],
      ];

      for (let [input, expected] of tests) {
        const result = merge(input);
        assert.deepStrictEqual(result, expected);
      }
      return true;
    }`,
  },
];

export default mergeIntervalsProblem;
