/* eslint-disable no-nested-ternary */
import toast from 'react-hot-toast';

export const notification = (message, options = {}) => {
  const {
    id,
    icon,
    type = 'success',
    position = 'top-right',
    style = {
      borderRadius: '10px',
      background: options.type === 'success' ? '#299D91' : options.type === 'error' ? '#c53215' : '#333',
      color: '#fff',
    },
    className = '',
  } = options;

  const x = setTimeout(() => {
    toast.dismiss();
    clearTimeout(x);
  }, 5000);

  toast[type](message, {
    position,
    style,
    className,
    iconTheme: {
      primary: 'white',
      secondary: type === 'error' ? '#c53215' : '#299D91',
    },
    icon,
    id,
  });
};
