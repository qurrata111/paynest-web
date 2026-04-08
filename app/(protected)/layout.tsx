"use client";

import {
  ArrowLeftIcon,
  ChartNoAxesCombinedIcon,
  ChartPieIcon,
  ChartSplineIcon,
  FolderArchiveIcon,
  FolderIcon,
  HashIcon,
  HistoryIcon,
  Home,
  UserIcon,
  UsersIcon,
  WalletIcon
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'
import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'
import { useAppDispatch } from '@/lib/redux/hooks';
import { getMeThunk } from '@/lib/redux/auth/authThunk';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RoleId } from '@/utils/enums';

export default function ProtectedLayout({ children }: any) {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: any) => state.auth);

  const roleId = user?.user_roles?.[0]?.role_id ?? null;

  useEffect(() => {
    dispatch(getMeThunk());
  }, []);

  return (
    <div className='flex w-full font-mono bg-amber-300'>
      <ProtectedRoute>
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton >
                        <a href="/home" className="flex items-center gap-2 p-2">
                          <Home />
                          <span>Home</span>
                        </a>
                      </SidebarMenuButton>
                      {/* <SidebarMenuBadge className='bg-primary/10 rounded-full'>5</SidebarMenuBadge> */}
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel></SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton >
                        <a className="flex items-center gap-2 p-2">
                          <WalletIcon />
                          <span>Wallet</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton >
                        <a className="flex items-center gap-2 p-2">
                          <FolderIcon />
                          <span>Transfer</span>
                        </a>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href='/transfer/create'>
                            Create
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href='/transfer/history'>
                            History
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>


                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
              {/* TODO: ADMIN MENU */}
              {[RoleId.SUPERADMIN, RoleId.ADMIN].includes(roleId) ? (
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton >
                          <a className="flex items-center gap-2 p-2">
                            <FolderArchiveIcon />
                            <span>Admin</span>
                          </a>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href='/admin/user'>
                              Users
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              Top Up
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton>
                              Freeze/Unfreeze
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>


                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ) : null}
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton >
                        <a href='/logout' className="flex items-center gap-2 p-2">
                          <ArrowLeftIcon />
                          <span>Logout</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <div className='flex flex-1 flex-col'>
            <header className='bg-card sticky top-0 z-50 flex h-13.75 items-center justify-between gap-6 border-b px-4 py-2 sm:px-6'>
              <SidebarTrigger className='[&_svg]:!size-5' />
            </header>
            <main className='size-full flex-1'>
              {children}
            </main>
            <footer className='fixed bottom-0 w-full flex justify-center bg-card h-10 border-t px-4 sm:px-6'>
              <div className="mt-9 mb-4 text-xs absolute bottom-0">
                Design was inspired from
                <Link target="_blank" href="https://www.figma.com/design/VCMiF0JkUjTbTucdr1HPAq/Wallet-App-UI-Kit--Community" className="text-blue-500 underline ml-2">here</Link>
              </div>
            </footer>
          </div>
        </SidebarProvider>
      </ProtectedRoute>
    </div>
  )
}
