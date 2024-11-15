'use client';

import { BreadcrumbPage } from '@/app/_components/ui/breadcrumb';
import { useNewSurfSessionStore } from '@/store/newSurfSession';
import { usePathname } from 'next/navigation';

export const AuthLayoutNavbarBreadcrumbBreadcrumbPage = () => {
    const pathname = usePathname();
    const { sessionName } = useNewSurfSessionStore();
    const breadcrumbPage = pathname.includes('add-new') ? sessionName : 'Some stuff';

    return <BreadcrumbPage>{breadcrumbPage}</BreadcrumbPage>;
};
