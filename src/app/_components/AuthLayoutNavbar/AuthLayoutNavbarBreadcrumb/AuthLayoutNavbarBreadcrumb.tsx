import { AuthLayoutNavbarBreadcrumbBreadcrumbPage } from '@/app/_components/AuthLayoutNavbar/AuthLayoutNavbarBreadcrumb/AuthLayoutNavbarBreadcrumbBreadcrumbPage/AuthLayoutNavbarBreadcrumbBreadcrumbPage';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/app/_components/ui/breadcrumb';

export const AuthLayoutNavbarBreadcrumb = () => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">New Surf Session</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <AuthLayoutNavbarBreadcrumbBreadcrumbPage />
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
};
