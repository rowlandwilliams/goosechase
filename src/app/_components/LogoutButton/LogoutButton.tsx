'use client';

import { signOut } from 'next-auth/react';
import { Button } from '../ui/button';
import { LogOutIcon } from 'lucide-react';

export const LogoutButton = () => {
    const handleSignOut = async () => {
        await signOut();
    };
    return (
        <Button variant={'outline'} onClick={handleSignOut}>
            <LogOutIcon />
        </Button>
    );
};
