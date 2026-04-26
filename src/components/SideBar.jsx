'use client';

import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import DownArrow from '@/assets/svg/Icon/DownArrow';
import UpArrow from '@/assets/svg/Icon/UpArrow';
import ArrowRight from '@/assets/svg/Icon/ArrowRight';
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

  const visibleMenu = menu.filter((item) => !item.adminOnly || user?.is_admin);

  const isItemActive = (item) => {
    if (item.path) return pathName === item.path;
    return item.submenu?.some((subItem) => pathName === subItem.path);
  };

  const toggleSubMenu = (index) => {
    setSidebarOpen((prevState) => ({
      ...prevState,
      [index]: !prevState?.[index],
    }));
  };

  const closeMobileSidebar = () => {
    setSideBarOpen(false);
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
        if (sideBarOpen) {
          setSideBarOpen(false);
        }
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [setSidebarOpen, sideBarOpen]);

  if (isAuthPage) return null;

  return (
    <>
      <div className="fixed right-3 top-5 z-50 flex size-9 items-center justify-center rounded-xl border border-white/20 bg-gray-950/85 shadow-card backdrop-blur lg:hidden">
        <Hamburger
          checked={!!sideBarOpen}
          onClick={() => {
            setSideBarOpen(!sideBarOpen);
          }}
        />
      </div>

      {sideBarOpen && <div className="fixed inset-0 z-30 bg-gray-950/55 backdrop-blur-sm lg:hidden" />}

      <aside className="lg:w-1/4 xl:w-1/5 2xl:w-[17%]">
        <div
          ref={sidebarRef}
          className={`fixed left-0 top-0 z-40 flex h-screen w-[86vw] max-w-80 flex-col justify-between overflow-hidden border-r border-white/10 bg-gray-950 text-white shadow-card transition-transform duration-300 lg:z-20 lg:w-full lg:max-w-64 lg:translate-x-0 ${
            sideBarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-br from-finance-accent/35 via-pest/20 to-transparent" />

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="px-5 pb-5 pt-6">
              <Link href="/" onClick={closeMobileSidebar} className="group flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-pest via-finance-accent to-finance-pink text-lg font-black text-white shadow-glow">
                  F
                </div>
                <div>
                  <h1 className="text-xl font-black leading-none tracking-tight">
                    Fin<span className="text-pest">Tracker</span>
                  </h1>
                  <p className="mt-1 text-xs font-medium text-white/50">Personal finance hub</p>
                </div>
              </Link>
            </div>

            <nav className="scrollbar-thin min-h-0 flex-1 overflow-y-auto px-3 pb-4">
              <div className="flex flex-col gap-1">
                {visibleMenu.map((item, index) => {
                  const active = isItemActive(item);
                  const subMenuOpen = Boolean(sidebarOpen?.[index]);

                  return (
                    <div key={index}>
                      {item?.submenu ? (
                        <button
                          type="button"
                          className={`group flex w-full items-center justify-between rounded-xl p-3 text-sm font-semibold transition-all ${
                            active
                              ? 'bg-white text-finance-ink shadow-soft'
                              : 'text-white/72 hover:bg-white/8 hover:text-white'
                          }`}
                          onClick={() => toggleSubMenu(index)}
                        >
                          <span className="flex min-w-0 items-center gap-3">
                            <span
                              className={`sidebar-menu-icon flex size-9 shrink-0 items-center justify-center rounded-xl transition ${
                                active
                                  ? 'bg-pest/12 text-pest [&_path]:fill-none [&_path]:stroke-current'
                                  : 'bg-white/6 text-white/70 group-hover:bg-white/10'
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span className="truncate">{item.title}</span>
                          </span>
                          <span className="ml-2 shrink-0 opacity-70 transition">
                            {subMenuOpen ? (
                              <UpArrow color={active ? '#101828' : '#fff'} height={14} weight={14} />
                            ) : (
                              <DownArrow color={active ? '#101828' : '#fff'} />
                            )}
                          </span>
                        </button>
                      ) : (
                        <Link
                          href={item?.path || ''}
                          onClick={closeMobileSidebar}
                          className={`group flex w-full items-center gap-3 rounded-xl p-3 text-sm font-semibold transition-all ${
                            active
                              ? 'bg-white text-finance-ink shadow-soft'
                              : 'text-white/72 hover:bg-white/8 hover:text-white'
                          }`}
                        >
                          <span
                            className={`sidebar-menu-icon flex size-9 shrink-0 items-center justify-center rounded-xl transition ${
                              active
                                ? 'bg-pest/12 text-pest'
                                : 'bg-white/6 text-white/70 group-hover:bg-white/10'
                            }`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.title}</span>
                        </Link>
                      )}

                      {item?.submenu && subMenuOpen && (
                        <div className="ml-6 mt-1 border-l border-white/10 py-1 pl-4">
                          {item.submenu.map((subItem, subIndex) => {
                            const subActive = pathName === subItem.path;
                            return (
                              <Link href={subItem.path || ''} key={subIndex} onClick={closeMobileSidebar}>
                                <div
                                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                                    subActive
                                      ? 'bg-pest/15 font-semibold text-white'
                                      : 'hover:bg-white/8 text-white/55 hover:text-white'
                                  }`}
                                >
                                  <ArrowRight /> {subItem.title}
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>
          </div>

          <div className="relative border-t border-white/10 p-3">
            <Link
              href="/setting"
              onClick={closeMobileSidebar}
              className="bg-white/6 mb-3 flex items-center gap-3 rounded-2xl border border-white/10 p-3 transition hover:bg-white/10"
            >
              <Image
                src={user?.avatar || userIcon}
                alt=""
                width={40}
                height={40}
                className="size-10 rounded-full bg-white p-0.5"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold capitalize">{user?.username || 'User'}</div>
                <div className="truncate text-xs text-white/45">{user?.email || 'View profile'}</div>
              </div>
            </Link>

            <button
              type="button"
              className="bg-white/6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-pRed/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 lg:justify-start"
              onClick={logout}
              disabled={logoutLoading}
            >
              <Logout />
              {logoutLoading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
