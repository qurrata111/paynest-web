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
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { getMyMenuThunk } from '@/lib/redux/user/userThunk';
import * as Icons from "lucide-react";

export default function ProtectedLayout({ children }: any) {
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: any) => state.auth);
  const { menus } = useSelector((state: any) => state.user);

  const roleId = user?.user_roles?.[0]?.role_id ?? null;

  useEffect(() => {
    dispatch(getMeThunk());
    dispatch(getMyMenuThunk());
  }, []);

  return (
    <div className='flex w-full font-mono bg-amber-300'>
      <ProtectedRoute>
        <SidebarProvider>
          <Sidebar>
            <SidebarContent>
              <SidebarGroup className='mb-8'>
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
              {menus.data?.map((value: any, index: number) => {
                const subMenu: any[] = value?.children || [];
                const Icon = value.icon ? (Icons as any)[value.icon] : null;
                return (
                  <SidebarGroup key={index}>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem >
                          <SidebarMenuButton >
                            <a className="flex items-center gap-2 p-2">
                              {Icon && <Icon />}
                              <span>{value.name}</span>
                            </a>
                          </SidebarMenuButton>
                          {subMenu.length > 0 ? (
                            <SidebarMenuSub>
                              {subMenu.map((val: any, idx: number) => {
                                return (
                                  <SidebarMenuSubItem key={idx}>
                                    <SidebarMenuSubButton {...(val.path ? { href: val.path } : {})}>
                                      {val.name}
                                    </SidebarMenuSubButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          ) : null}
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                )
              })}
            </SidebarContent>
          </Sidebar>
          <div className='flex flex-1 flex-col'>
            <header className='bg-card sticky top-0 z-50 flex h-13.75 items-center justify-between gap-6 border-b px-4 py-2 sm:px-6'>
              <SidebarTrigger className='[&_svg]:!size-5' />
              <DropdownMenu>
                <DropdownMenuTrigger >
                  <div className={"flex items-center justify-center rounded-full h-10 w-10 bg-white text-gray-500 border border-1 border-gray-300 hover:bg-gray-100"} ><UserIcon size={20} /></div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40" align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <a href='/me/profile'>
                        Profile
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                      Setting
                      {/* </a> */}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <a href='/logout' className="flex items-center gap-2 p-2">
                        Logout
                      </a>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
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
