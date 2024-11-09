import axios from 'axios';
import moment from 'moment';
import { notification } from '@/components/notification';
import { AUTO_TRANSFER_URL, GET_MONTHLY_SUMMERY_URL } from '@/helpers/frontend/apiEndpoints';
import { MAX_DATE_FOR_AUTO_TRANSFER } from '@/assets/constants';

export const fetchRecord = async (url, set, loader, rest = {}) => {
  const res = await axios.post(url, rest.dateRange, { headers: rest });
  if (res.data.success) {
    set(res.data.data);
  } else {
    notification(res.data.msg || 'Failed to load (incm/exp) data.', { type: 'error', id: 'fetchsError' });
  }
  loader(false);
};

export const handleAutoTransfer = async () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  if (currentDay >= 1 && currentDay <= MAX_DATE_FOR_AUTO_TRANSFER) {
    const response = await axios.get(AUTO_TRANSFER_URL);
    const transfer_info = response.data.data;

    if (transfer_info?.is_transfer_allowed && !transfer_info?.options?.is_this_month_done) {
      const date = moment(currentDate);
      const from = date.clone().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
      const to = date.clone().subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
      const incomeDate = date.clone().startOf('month').format('YYYY-MM-DD');

      const monthly_summery_response = await axios.post(GET_MONTHLY_SUMMERY_URL, { from, to });
      if (monthly_summery_response.data.success && monthly_summery_response.data.data.remain) {
        return {
          from,
          to,
          expenseDate: to,
          incomeDate,
          transfer_info,
          remain: monthly_summery_response.data.data.remain,
        };
      }
    }
  }
  return {};
};

export const isObjectEmpty = (obj) => !Object.entries(obj).length;
