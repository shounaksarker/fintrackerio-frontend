import Image from 'next/image';
import React from 'react';

const Manuals = ({ name, instruction, bn }) => {
  return (
    <>
      <h1 className="mb-8 text-center text-3xl underline underline-offset-4">{bn ? name.bn : name.en}</h1>
      <div className="flex flex-col gap-y-6">
        {instruction.map((info, index) => {
          return (
            <div key={index} className="flex flex-col gap-y-3">
              <span>
                {index + 1}. {bn ? info.bn : info.en}
              </span>
              {info.img && <Image className="mx-auto" src={info.img} alt="" width={800} height={500} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Manuals;
