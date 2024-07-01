'use client';

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Button from '@/components/fields/Button';
import { DataContext } from '@/context/DataContext';
import Loader from '@/components/fields/Loader';
import EditUserModal from '@/components/modals/EditUserModal';
import { notification } from '@/components/notification';
import { EDIT_USER_URL } from '@/helpers/frontend/apiEndpoints';
import { EDIT_USER_VALUE } from '@/assets/constants/stateValue';
import editIcon from '@/assets/svg/edit.svg';

const Page = () => {
  const { user, getUser } = useContext(DataContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(EDIT_USER_VALUE);

  const getUserData = async () => {
    await getUser();
  };
  const submitUserInfo = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await axios.put(EDIT_USER_URL, userData);
    if (res.data.success) {
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

  return (
    <div className="px-4">
      {user ? (
        <div className="mt-4 flex w-full flex-col gap-y-4 rounded-lg bg-lightGray/30 p-4 shadow-md">
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

          <EditUserModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            info={user}
            data={userData}
            setData={setUserData}
            handleSubmit={submitUserInfo}
            loading={loading}
          />
        </div>
      ) : (
        <div className="flex h-screen w-full items-center justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Page;
