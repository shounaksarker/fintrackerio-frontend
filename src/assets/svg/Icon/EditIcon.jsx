import React from 'react';
import Image from 'next/image';
import editIcon from '@/assets/svg/edit.svg';

const EditIcon = ({ title, className, imgClass, titleClass }) => {
  return (
    <div className={`flex items-center gap-x-1 rounded bg-sky-700 p-1 ${className}`}>
      <Image src={editIcon} alt="edit" className={imgClass} />
      {title && <span className={titleClass}>{title}</span>}
    </div>
  );
};

export default EditIcon;
