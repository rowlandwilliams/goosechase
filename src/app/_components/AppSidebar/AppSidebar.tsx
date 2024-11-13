import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '../ui/sidebar';
import { Button } from '../ui/button';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Your Sessions',
            url: '#',
            items: [
                {
                    title: 'Dashboard',
                    url: '#',
                },
                {
                    title: 'Recent',
                    url: '#',
                },
            ],
        },
        {
            title: 'Community',
            url: '#',
            items: [
                {
                    title: 'Session Map',
                    url: '#',
                },
                {
                    title: 'Blog',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader className="font-bold py-4 px-4 font-haas text-base flex !flex-row gap-2 items-center">
                <div className="h-5 w-5 rounded-full bg-gradient-to-t from-blue-800 to-cyan-500"></div>
                <div>RIDE LOGZ</div>
            </SidebarHeader>
            <SidebarContent>
                <div className="px-4 py-2">
                    <Button className="bg-indigo-700 w-full">+ Add Surf Session</Button>
                </div>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
