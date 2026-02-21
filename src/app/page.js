import BalanceDetails from '@/components/home/BalanceDetails';
import RecentTransection from '@/components/home/RecentTransection';
import YearlySummery from '@/components/home/YearlySummery';
import SeedDemoButton from '@/components/home/SeedDemoButton';
import ClearMonthButton from '@/components/home/ClearMonthButton';

const Home = async () => {
  return (
    <div className="flex flex-col gap-y-8">
      <SeedDemoButton />
      <BalanceDetails />
      <ClearMonthButton />
      <RecentTransection />
      <YearlySummery />
    </div>
  );
};

export default Home;
