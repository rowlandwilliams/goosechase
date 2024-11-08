'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/Button';

export const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut();
    };
    return <Button onClick={handleSignOut}>Log out</Button>;
};
