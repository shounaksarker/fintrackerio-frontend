import React from 'react';
import Image from 'next/image';
import deleteIcon from '@/assets/svg/delete.svg';

const DeleteIcon = ({ title, className, imgClass, titleClass }) => {
  return (
    <div className={`flex items-center gap-x-1 rounded bg-red-700 p-1 hover:bg-red-900 ${className}`}>
      <Image src={deleteIcon} alt="edit" className={imgClass} />
      {title && <span className={titleClass}>{title}</span>}
    </div>
  );
};

export default DeleteIcon;
