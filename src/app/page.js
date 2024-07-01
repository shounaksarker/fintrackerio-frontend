import BalanceDetails from '@/components/home/BalanceDetails';
import RecentTransection from '@/components/home/RecentTransection';
import YearlySummery from '@/components/home/YearlySummery';

const Home = async () => {
  return (
    <div className='flex flex-col gap-y-8'>
      <BalanceDetails />
      <RecentTransection />
      <YearlySummery />
    </div>
  );
};

export default Home;
