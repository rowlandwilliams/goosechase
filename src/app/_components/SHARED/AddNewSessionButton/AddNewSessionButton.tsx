'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../../ui/button';
import { api } from '@/trpc/react';

export const AddNewSessionButton = () => {
    const pathname = usePathname();
    const router = useRouter();
    const mutation = api.surfSession.createSurfSession.useMutation();

    const handleCreateSession = () => {
        const newSessionId = crypto.randomUUID();

        mutation.mutate(
            { id: newSessionId, name: 'tooooo' },
            {
                onSuccess: () => {
                    router.push(`/add-new?id=${newSessionId}`);
                },
                onError: (error) => {
                    console.error('Error creating session:', error);
                },
            }
        );
    };

    return (
        !pathname.includes('add-new') && (
            <Button size="icon" onClick={handleCreateSession}>
                <span className="text-xl">+</span>
            </Button>
        )
    );
};
