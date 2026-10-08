const bestTimeStockExample = [
  {
    id: 1,
    inputText: "prices = [7,1,5,3,6,4]",
    outputText: "5",
    explanation:
      "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 − 1 = 5.",
  },
  {
    id: 2,
    inputText: "prices = [7,6,4,3,1]",
    outputText: "0",
    explanation: "Prices keep decreasing, so no transaction can give profit.",
  },
];

export default bestTimeStockExample;
