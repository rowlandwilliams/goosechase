import React from 'react';
import { api } from '@/trpc/server';
import { DraftTag } from '@/app/_components/SHARED/DraftTag/DraftTag';

export const SurfSessionGrid = async () => {
    const surfSession = await api.surfSession.getSurfSessions();

    return (
        <div className="grid md:grid-cols-4 gap-6">
            {surfSession.map((surfSession) => (
                <div key={surfSession.id} className="shadow border rounded-md bg-white">
                    <header className="flex justify-between items-center p-4">
                        <h1 className="font-medium font-funnel text-base">{surfSession.name}</h1>
                        {surfSession.isDraft && <DraftTag />}
                    </header>
                </div>
            ))}
        </div>
    );
};
