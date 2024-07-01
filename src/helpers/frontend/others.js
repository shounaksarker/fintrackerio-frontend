import axios from 'axios';
import { notification } from '@/components/notification';

export const fetchRecord = async (url, set, loader, rest = {}) => {
  const res = await axios.post(url, rest.dateRange, { headers: rest });
  if (res.data.success) {
    set(res.data.data);
  } else {
    notification(res.data.msg || 'Failed to load (inc/exp) data.', { type: 'error', id: 'fetchsError' });
  }
  loader(false);
};
