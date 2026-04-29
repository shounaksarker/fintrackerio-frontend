'use client';

import React, { useState } from 'react';
import { GENERAL_MANUALS, USER_MANUALS } from '@/assets/constants';
import Button from '@/components/fields/Button';
import Manuals from '@/components/Manuals';

const { name: gmName, instruction: gmInstruction } = GENERAL_MANUALS;
const { name: umName, instruction: umInstruction } = USER_MANUALS;

const Page = () => {
  const [bn, setBn] = useState(true);
  return (
    <div className="page-shell">
      <div className="page-toolbar">
        <div>
          <h1 className="page-title">User Manual</h1>
          <p className="page-subtitle">Step-by-step guidance for using FinTracker.</p>
        </div>
        <Button color="secondary" onClick={() => setBn(!bn)}>
          {bn ? 'Eng' : 'বাংলা'}
        </Button>
      </div>
      <div className="flex flex-col gap-y-8">
        <Manuals name={umName} instruction={umInstruction} bn={bn} />
        <Manuals name={gmName} instruction={gmInstruction} bn={bn} />
      </div>
    </div>
  );
};

export default Page;
