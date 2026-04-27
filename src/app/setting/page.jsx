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
import EditUserModal from '@/components/modals/EditUserModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import TransferView from '@/components/settings/TransferView';
import AvatarView from '@/components/settings/AvatarView';

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
    <div className="page-shell">
      {user ? (
        <div className="space-y-6">
          <div className="page-toolbar">
            <div>
              <h1 className="page-title">Settings</h1>
              <p className="page-subtitle">Update profile, avatar, and auto-transfer preferences.</p>
            </div>
          </div>
          <div className="app-surface flex w-full flex-col gap-y-4 rounded-3xl p-5 md:flex-row md:items-center lg:max-w-3xl">
            <div className="mx-auto md:flex md:w-1/3 md:items-center md:justify-center">
              <Image
                src={user.avatar || userIcon}
                alt="userIcon"
                className="size-20 rounded-full bg-white p-2 shadow-soft ring-4 ring-white md:size-28"
                width={512}
                height={512}
              />
            </div>
            <div className="flex flex-col gap-y-3 md:w-2/3">
              <p className="text-sm">
                <span className="font-semibold capitalize text-finance-muted">Name: </span>
                <span className="capitalize text-finance-ink">{user.username}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold capitalize text-finance-muted">Email: </span>
                <span className="text-finance-ink">{user.email}</span>
              </p>
              <p className="text-sm">
                <span className="font-semibold capitalize text-finance-muted">Phone Number: </span>
                <span className="capitalize text-finance-ink">{user.phone}</span>
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
          <div className="app-surface w-full rounded-3xl p-5">
            <TransferView />
          </div>
          <AvatarView handleImg={handleImg} />
          {/* Support Kori */}
          <div className="flex w-full items-center justify-center gap-x-3 rounded-2xl border border-amber-200 bg-amber-50/80 p-4 shadow-soft lg:max-w-3xl">
            <span className="text-2xl">☕</span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-gray-800">Enjoying FinTracker?</span>
              <span className="text-xs text-gray-500">Your support keeps this project alive!</span>
            </div>
            <a
              href="https://www.supportkori.com/shounak"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto rounded-lg bg-black px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#e6c800]"
            >
              ☕ Support
            </a>
          </div>
        </div>
      ) : (
        <div className="flex min-h-[40vh] w-full items-center justify-center">
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
