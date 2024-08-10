'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import DownArrow from '@/assets/svg/Icon/DownArrow';
import UpArrow from '@/assets/svg/Icon/UpArrow';
import ArrowRight from '@/assets/svg/Icon/ArrowRight';
import Button from '@/components/fields/Button';
import Logout from '@/assets/svg/Icon/Logout';
import userIcon from '@/assets/images/user.png';
import Hamburger from '@/components/fields/Hamburger';
import { DataContext } from '@/context/DataContext';
import { REMOVE_COOKIE } from '@/helpers/frontend/apiEndpoints';
import { USER } from '@/assets/constants';
import { notification } from './notification';
import { AUTH_PATH } from '@/assets/constants/conditionalPath';

const Sidebar = ({ menu }) => {
  const { sidebarOpen, setSidebarOpen, user } = useContext(DataContext);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const sidebarRef = useRef(null);

  const pathName = usePathname();
  const isAuthPage = AUTH_PATH.includes(pathName);

  const toggleSubMenu = (index) => {
    setSidebarOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  const logout = async () => {
    setLogoutLoading(true);
    const res = await axios.get(REMOVE_COOKIE);
    if (typeof window !== 'undefined' && res.data.success) {
      localStorage.removeItem(USER);
      window.location.reload();
    } else {
      notification('Logout Failed.', { type: 'error' });
      setLogoutLoading(false);
    }
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {!isAuthPage && (
        <div className="lg:w-1/4 xl:w-[20%] 2xl:w-[17%]">
          <div className="fixed right-3 top-6 z-50 focus:outline-none lg:hidden">
            <Hamburger
              checked={!!sideBarOpen}
              onClick={() => {
                setSideBarOpen(!sideBarOpen);
              }}
            />
          </div>
          <div
            ref={sidebarRef}
            className={`fixed left-0 top-0 flex h-screen w-full flex-col items-center justify-between bg-gray-900 text-white lg:max-w-64 ${sideBarOpen ? 'z-20 w-full' : 'hidden'} lg:flex lg:items-start`}
          >
            <div className="h-[75%] overflow-y-auto lg:w-full">
              <div className="flex items-center justify-between p-4">
                <h1 className="md:text-2xl">
                  <span className="font-bold uppercase">Fin-</span>Tracker.
                  <span className="font-bold uppercase">io</span>
                </h1>
              </div>
              <div className={`flex flex-col`}>
                {menu.map((item, index) => (
                  <div key={index} className="hover:text-pest md:max-w-64 lg:max-w-full">
                    <Link
                      href={item?.path || ''}
                      onClick={() => {
                        setSideBarOpen(!item?.path);
                      }}
                    >
                      <button
                        className="flex w-full items-center justify-between p-4"
                        onClick={() => toggleSubMenu(index)}
                      >
                        <div className="mr-2 flex">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </div>
                        {item?.submenu && (
                          <span
                            onClick={() => toggleSubMenu(index)}
                            className="ml-auto transform transition duration-300 focus:outline-none"
                          >
                            {sidebarOpen[index] ? (
                              <UpArrow color="#fff" height={14} weight={14} />
                            ) : (
                              <DownArrow color="#fff" />
                            )}
                          </span>
                        )}
                      </button>
                    </Link>
                    {item?.submenu && sidebarOpen[index] && (
                      <div className="pl-8">
                        {item?.submenu.map((subItem, subIndex) => (
                          <Link
                            href={subItem.path || ''}
                            key={subIndex}
                            onClick={() => setSideBarOpen(false)}
                          >
                            <div className="text-md flex items-center gap-x-2 p-2 font-light text-white/80 hover:bg-gray-700">
                              <ArrowRight /> {subItem.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex w-full flex-col gap-y-3 p-3 text-white">
              <Button
                className="flex w-full justify-center !border-black bg-white/10 text-sm lg:justify-start"
                iconLeft={<Logout />}
                onClick={logout}
                disabled={logoutLoading}
              >
                {logoutLoading ? 'Logging out...' : 'Logout'}
              </Button>
              <hr className="border border-slate-700" />
              <Link href="/setting" onClick={() => setSideBarOpen(false)}>
                <Button
                  className="flex w-full items-center justify-center !bg-pBlack hover:!bg-pest-200 lg:justify-start"
                  iconLeft={
                    <Image
                      src={user?.avatar || userIcon}
                      alt=""
                      width={32}
                      height={32}
                      className="rounded-full bg-white p-0.5"
                    />
                  }
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm capitalize">{user?.username}</span>
                    <span className="text-xs text-phGray">View Profile</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
