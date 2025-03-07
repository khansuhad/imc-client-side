"use client"
import { useSession } from 'next-auth/react';
import React from 'react';

const UserInfo = () => {
    const session = useSession()
    console.log(session);
    return (
        <div className='text-white'>
            <p>user : {session?.data?.user?.name}</p>
            <p>email : {session?.data?.user?.role}</p>
        </div>
    );
};

export default UserInfo;