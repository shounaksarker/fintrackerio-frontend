'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';
import Button from './Button';

const AuthButton = ({ text = '', loadingText = 'Loading' }) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="small" color="primary" className="flex w-full justify-center">
      {pending ? `${loadingText}...` : text}
    </Button>
  );
};

export default AuthButton;
