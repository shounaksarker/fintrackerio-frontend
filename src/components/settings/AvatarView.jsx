import React from 'react';
import Image from 'next/image';
import { PERSON_ICONS } from '@/assets/constants/userIcon';

const AvatarView = ({ handleImg }) => {
  return (
    <div className="app-surface flex flex-col gap-y-2 rounded-3xl p-5">
      <h1 className="text-lg font-black text-finance-ink">Choose Your Avatar</h1>
      {PERSON_ICONS.map((items, index) => {
        return (
          <div key={index}>
            <h3 className="my-4 text-sm font-bold text-finance-muted">{items.category}</h3>
            <div className="mb-6 flex flex-wrap gap-3">
              {items.icons.map((icon, i) => {
                return (
                  <button
                    key={i}
                    className="rounded-full transition-shadow duration-200 hover:ring-4 hover:ring-pest/15"
                    onClick={() => handleImg(icon.src)}
                  >
                    <Image
                      src={icon}
                      width={512}
                      height={512}
                      alt="user_icon"
                      className="size-16 rounded-full bg-white p-2 shadow-soft md:size-20"
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
