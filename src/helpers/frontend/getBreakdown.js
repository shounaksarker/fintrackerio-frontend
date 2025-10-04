const moment = require('moment');

const getBreakdown = (currentMonth = [], prevMonth = [], categoryName = 'expense_category_name') => {
  const currentMonthBreakdown = {};
  const prevMonthBreakdown = {};

  const updateBreakdown = (breakdown, expense) => {
    if (!breakdown[expense[categoryName]]) {
      breakdown[expense[categoryName]] = {
        totalAmount: 0,
        icon: null,
        spendsOn: [], // for expense_category
        comparison: {
          previousMonthTotal: 0,
          difference: 0,
          percentage: 0,
        },
      };
    }
    breakdown[expense[categoryName]].totalAmount += parseFloat(expense.amount);
    breakdown[expense[categoryName]].icon = expense.icon;
    if (categoryName === 'expense_category_name') {
      breakdown[expense[categoryName]].spendsOn.push({
        name: expense.spend_on,
        amount: parseFloat(expense.amount),
        terminal: expense.terminal_name,
        description: expense.description,
        date: moment(expense.date).format('DD/MM/YYYY'),
        allExpenseData: expense,
      });
    }
  };

  currentMonth.forEach((expense) => {
    updateBreakdown(currentMonthBreakdown, expense);
  });

  prevMonth.forEach((expense) => {
    updateBreakdown(prevMonthBreakdown, expense);
  });

  // Calculate comparison data and update current month breakdown
  Object.keys(currentMonthBreakdown).forEach((category) => {
    const currentAmount = currentMonthBreakdown[category].totalAmount || 0;
    const prevAmount = prevMonthBreakdown[category]?.totalAmount || 0;
    const difference = currentAmount - prevAmount;
    const percentage = prevAmount !== 0 ? ((difference / prevAmount) * 100).toFixed(1) : null;

    currentMonthBreakdown[category].comparison = {
      prevMonthTotal: prevAmount,
      difference,
      percentage,
    };
  });

  return {
    currentMonthBreakdown,
    prevMonthBreakdown,
  };
};

export default getBreakdown;
