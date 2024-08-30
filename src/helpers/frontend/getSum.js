const getSum = (data, target) => {
  const result = !data
    ? 0
    : data.reduce((accumulator, currentItem) => {
        return accumulator + parseFloat(currentItem[target]);
      }, 0);
  return result;
};

const getIndividualSum = (data = []) => {
  const terminalTotals = {};

  data.forEach((item) => {
    const { terminal_name: name, amount } = item;
    const parsedAmount = parseFloat(amount);
    terminalTotals[name] = (terminalTotals[name] || 0) + parsedAmount;
  });

  return terminalTotals;
};

const formattedAmount = (value) => {
  return value
    ? Number(value).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    : 0.0;
};

export { getSum, getIndividualSum, formattedAmount };
