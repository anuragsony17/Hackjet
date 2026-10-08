const validParenthesesExample = [
  {
    id: 1,
    inputText: `s = "()"`,
    outputText: "true",
    explanation: "Simple correct pair",
  },
  {
    id: 2,
    inputText: `s = "()[]{}"`,
    outputText: "true",
    explanation: "All bracket types correctly matched",
  },
  {
    id: 3,
    inputText: `s = "(]"`,
    outputText: "false",
    explanation: "Opening '(' cannot be closed by ']'",
  },
  {
    id: 4,
    inputText: `s = "([)]"`,
    outputText: "false",
    explanation: "Wrong order of closing brackets",
  },
];

export default validParenthesesExample;
