import BalanceDetails from '@/components/home/BalanceDetails';
import RecentTransection from '@/components/home/RecentTransection';
import YearlySummery from '@/components/home/YearlySummery';
import ClearMonthButton from '@/components/home/ClearMonthButton';
import BudgetOverview from '@/components/home/BudgetOverview';
import FinancialHealthScore from '@/components/home/FinancialHealthScore';
import ExpenseInsights from '@/components/home/ExpenseInsights';
import SeedDemoButton from '@/components/home/SeedDemoButton';

const Home = async () => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex flex-col gap-3">
        <SeedDemoButton />
        <ClearMonthButton />
      </div>

      <BalanceDetails />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <FinancialHealthScore />
        <ExpenseInsights />
      </div>

      <BudgetOverview />
      <RecentTransection />
      <YearlySummery />
    </div>
  );
};

export default Home;
