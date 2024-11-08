import React from 'react';
import Image from 'next/image';
import { PERSON_ICONS } from '@/assets/constants/userIcon';

const AvatarView = ({ handleImg }) => {
  return (
    <div className="mt-10 flex flex-col gap-y-2">
      <h1 className="mb-4 text-center text-lg font-semibold underline underline-offset-8 xl:text-start">
        Choose your avatar
      </h1>
      {PERSON_ICONS.map((items, index) => {
        return (
          <div key={index}>
            <h3 className="my-4 ml-3 text-sm font-medium text-pGray underline underline-offset-4">
              {items.category}
            </h3>
            <div className="mb-6 flex flex-wrap justify-between gap-3 md:justify-normal">
              {items.icons.map((icon, i) => {
                return (
                  <button key={i} onClick={() => handleImg(icon.src)}>
                    <Image
                      src={icon}
                      width={512}
                      height={512}
                      alt="user_icon"
                      className="size-16 rounded-full bg-gray-100 p-2 shadow md:size-20"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvatarView;
