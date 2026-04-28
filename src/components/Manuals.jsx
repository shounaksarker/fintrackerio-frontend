'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const ManualItem = ({ info, index, bn, isOpen, onToggle }) => {
  const text = bn ? info.bn : info.en;
  const shortText = text.length > 92 ? `${text.slice(0, 92)}...` : text;

  return (
    <article className="app-surface overflow-hidden rounded-2xl transition-colors hover:bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 p-3 text-left focus-visible:ring-2 focus-visible:ring-pest/20 md:p-4"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pest/10 text-sm font-black text-pest">
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="line-clamp-2 text-sm font-bold leading-6 text-finance-ink md:text-base">
            {isOpen ? text : shortText}
          </span>
        </span>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-finance-border bg-white text-lg font-bold text-finance-muted transition-transform ${isOpen ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <div className="border-t border-finance-border px-3 pb-4 pt-3 md:px-4">
          <p className="text-sm font-medium leading-7 text-finance-muted md:text-base">{text}</p>
          {info.img && (
            <Image
              className="mt-4 rounded-2xl border border-finance-border"
              src={info.img}
              alt=""
              width={800}
              height={500}
            />
          )}
        </div>
      )}
    </article>
  );
};

const Manuals = ({ name, instruction, bn }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="page-title">{bn ? name.bn : name.en}</h2>
        <span className="rounded-full border border-finance-border bg-white/80 px-3 py-1 text-xs font-bold text-finance-muted">
          {instruction.length} steps
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {instruction.map((info, index) => {
          return (
            <ManualItem
              key={index}
              info={info}
              index={index}
              bn={bn}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Manuals;
