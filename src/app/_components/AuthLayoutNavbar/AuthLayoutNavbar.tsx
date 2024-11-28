import Link from 'next/link';
import { BrainwaveIcon } from '@/app/_components/SHARED/Icons/BrainwaveIcon/BrainwaveIcon';
import { Button } from '@/app/_components/ui/something';
import { Separator } from '@/app/_components/ui/separator';
import { AddNewSessionButton } from '@/app/_components/SHARED/AddNewSessionButton/AddNewSessionButton';
import { LogoutButton } from '@/app/_components/LogoutButton/LogoutButton';
import { AuthLayoutNavbarBreadcrumb } from '@/app/_components/AuthLayoutNavbar/AuthLayoutNavbarBreadcrumb/AuthLayoutNavbarBreadcrumb';

export const AuthLayoutNavbar = () => {
    return (
        <header className="flex h-16 shrink-0 justify-between shadow-sm bg-white items-center gap-2 border-b px-4">
            <div className="flex gap-2 items-center">
                <Link href="/">
                    <Button variant="ghost" size={'icon'} className="!p-0 ml-1">
                        <BrainwaveIcon dim={22} />
                    </Button>
                </Link>
                <Separator orientation="vertical" className="mr-1 h-4" />
                <AuthLayoutNavbarBreadcrumb />
            </div>
            <div className="flex gap-2 items-center">
                <AddNewSessionButton />
                <LogoutButton />
            </div>
        </header>
    );
};
