import mongoose from "mongoose";

const starterCodeReverseLinkedList = `
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// Do not edit function name
function reverseLinkedList(head) {
  // Write your code here
};`;

const handlerFunctionReverseLinkedList = `
function handleReverseLinkedList(reverseLinkedList, assert) {

  class LinkedList {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }

  function createLinkedList(values) {
    const head = new LinkedList(values[0]);
    let current = head;
    for (let i = 1; i < values.length; i++) {
      const node = new LinkedList(values[i]);
      current.next = node;
      current = node;
    }
    return head;
  }

  function getListValues(head) {
    const values = [];
    let current = head;
    while (current !== null) {
      values.push(current.value);
      current = current.next;
    }
    return values;
  }

  const tests = [
    [1, 2, 3, 4, 5],
    [5, 4, 3, 2, 1],
    [1, 2, 3],
    [1],
  ];

  const answers = [
    [5, 4, 3, 2, 1],
    [1, 2, 3, 4, 5],
    [3, 2, 1],
    [1],
  ];

  for (let i = 0; i < tests.length; i++) {
    const list = createLinkedList(tests[i]);
    const result = reverseLinkedList(list);
    assert.deepStrictEqual(getListValues(result), answers[i]);
  }

  return true;
}
`;

const problem = [
  {
    id: 2,
    title: "Reverse Linked List",
    problemStatement: `<p className='mt-3'>
      Given the <code>head</code> of a singly linked list, reverse the list, 
      and return <em>the reversed list</em>.
    </p>`,
    examples: [],
    constraints: `<li className='mt-2'>
        The number of nodes in the list is in the range <code>[0, 5000]</code>.
      </li>
      <li className='mt-2'>
        <code>-5000 &lt;= Node.val &lt;= 5000</code>
      </li>`,
    order: 2,
    difficulty: "Hard",
    starterCode: starterCodeReverseLinkedList,
    handlerFunction: handlerFunctionReverseLinkedList,
  },
];

export default problem;
