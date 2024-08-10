'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Button from '@/components/fields/Button';
import { DataContext } from '@/context/DataContext';
import Loader from '@/components/fields/Loader';
import { notification } from '@/components/notification';
import { EDIT_USER_URL } from '@/helpers/frontend/apiEndpoints';
import { EDIT_USER_VALUE } from '@/assets/constants/stateValue';
import editIcon from '@/assets/svg/edit.svg';
import userIcon from '@/assets/images/user.png';
import { USER } from '@/assets/constants';
import { MALE_ICONS } from '@/assets/constants/userIcon';
import EditUserModal from '@/components/modals/EditUserModal';
import ConfirmModal from '@/components/modals/ConfirmModal';

const Page = () => {
  const { user, getUser } = useContext(DataContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(EDIT_USER_VALUE);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  const getUserData = async () => {
    await getUser();
  };
  const submitUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.put(EDIT_USER_URL, userData);
    if (res.data.success) {
      if (typeof window !== 'undefined' && res.data.success) {
        localStorage.removeItem(USER);
      }
      notification(res.data.msg, { type: 'success', id: 'createSource' });
      setUserData(EDIT_USER_VALUE);
      setModalOpen(false);
    } else {
      notification(res.data.msg || 'Failed to edit user details', { type: 'error', id: 'editSource' });
    }
    getUserData();
    setLoading(false);
  };

  useEffect(() => {
    if (!user) {
      getUserData();
    }
  }, []);

  const handleImg = (imgUrl) => {
    setSelectedImg(imgUrl);
    setConfirmModalOpen(true);
  };

  const submitAvaterChange = async (e) => {
    e.preventDefault();
    setConfirmLoading(true);
    const res = await axios.put(EDIT_USER_URL, { avatar: selectedImg });
    if (res.data.success) {
      if (typeof window !== 'undefined' && res.data.success) {
        localStorage.setItem(USER, JSON.stringify({ ...user, avatar: selectedImg }));
        getUser();
      }
      notification('Avatar Changed', { type: 'success', id: 'createSource' });
      setSelectedImg(null);
      setConfirmModalOpen(false);
    } else {
      notification(res.data.msg || 'Failed to edit user details', { type: 'error', id: 'editSource' });
    }
    setConfirmLoading(false);
  };
  return (
    <div className="px-4">
      {user ? (
        <div className="md:flex md:flex-col md:items-center md:justify-center xl:items-start">
          <div className="mt-4 flex w-full flex-col gap-y-4 rounded-lg bg-lightGray/30 p-4 shadow-md md:w-[80%] md:flex-row lg:w-[60%]">
            <div className="mx-auto md:flex md:w-1/3 md:items-center md:justify-center">
              <Image
                src={user.avatar || userIcon}
                alt="userIcon"
                className="size-16 rounded-full bg-white p-3 shadow md:size-28"
                width={512}
                height={512}
              />
            </div>
            <div className="flex flex-col gap-y-3 md:w-2/3">
              <p>
                <span className="itallic font-semibold capitalize">Name: </span>
                <span className="capitalize text-pGray">{user.username}</span>
              </p>
              <p>
                <span className="itallic font-semibold capitalize">Email: </span>
                <span className="text-pGray">{user.email}</span>
              </p>
              <p>
                <span className="itallic font-semibold capitalize">Phone Number: </span>
                <span className="capitalize text-pGray">{user.phone}</span>
              </p>
              <Button
                size="small"
                className="max-w-[150px] justify-center"
                onClick={() => setModalOpen(true)}
                iconLeft={<Image src={editIcon} alt="edit" />}
              >
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-y-2">
            <h1 className="mb-4 text-center text-lg font-semibold underline underline-offset-8 xl:text-start">
              Choose your avatar
            </h1>
            {MALE_ICONS.map((items, index) => {
              return (
                <div key={index}>
                  <h3 className="my-4 ml-3 text-sm font-medium text-pGray underline underline-offset-4">
                    {items.category}
                  </h3>
                  <div className="mb-6 flex flex-wrap gap-3">
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
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      )}
      {user && (
        <>
          <EditUserModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            info={user}
            data={userData}
            setData={setUserData}
            handleSubmit={submitUserInfo}
            loading={loading}
          />
          <ConfirmModal
            modalOpen={confirmModalOpen}
            setModalOpen={setConfirmModalOpen}
            title={'Do you want to change Avatar?'}
            loading={confirmLoading}
            handleSubmit={submitAvaterChange}
          />
        </>
      )}
    </div>
  );
};

export default Page;
