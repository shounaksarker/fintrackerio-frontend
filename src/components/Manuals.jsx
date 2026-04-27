import Image from 'next/image';
import React from 'react';

const Manuals = ({ name, instruction, bn }) => {
  return (
    <>
      <h1 className="page-title text-center">{bn ? name.bn : name.en}</h1>
      <div className="flex flex-col gap-y-4">
        {instruction.map((info, index) => {
          return (
            <div key={index} className="app-surface flex flex-col gap-y-3 rounded-3xl p-5">
              <span className="leading-7 text-finance-ink">{bn ? info.bn : info.en}</span>
              {info.img && (
                <Image
                  className="mx-auto rounded-2xl border border-finance-border"
                  src={info.img}
                  alt=""
                  width={800}
                  height={500}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Manuals;
