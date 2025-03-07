"use client"
import React, { useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { fetchGetUserInfo } from '@/redux/features/user/userSlice/userSlice';
import { useDispatch, useSelector } from 'react-redux';
  
const AuthButton = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.users);
    const session = useSession()
    console.log(userInfo,session);
    useEffect(() =>{
      dispatch(fetchGetUserInfo(session?.data?.user?.email))
    },[dispatch])
    return (
        <div className='z-50'>
           {session?.data?.user?.email  ?     <DropdownMenu>
                  <DropdownMenuTrigger><figure className='w-12 h-12 rounded-full border-[2px] border-white'><img src={userInfo?.image || 'https://res.cloudinary.com/dc3czyqsb/image/upload/v1739842044/czkyrznb4mn6q05i0oal.png' }  className=' w-full h-full rounded-full' alt='logo'/></figure></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem> <Link href={ session?.data?.user?.role === "admin" ? "/dashboard/admin" : "dashboard/user"}>Dashboard</Link>  </DropdownMenuItem>
    <DropdownMenuItem><Button variant={"default"} onClick={() => signOut()}>Sign Out</Button></DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> :  <Button variant={"default"} onClick={() => signIn()}>Sign in</Button>}
        </div>
    );
};

export default AuthButton;