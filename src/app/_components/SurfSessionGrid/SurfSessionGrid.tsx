import React from 'react';
import { api } from '@/trpc/server';
import { DraftTag } from '@/app/_components/SHARED/DraftTag/DraftTag';
import Link from 'next/link';

export const SurfSessionGrid = async () => {
    const surfSession = await api.surfSession.getSurfSessions();

    return (
        <div className="grid md:grid-cols-4 gap-6">
            {surfSession.map((surfSession) => (
                <Link
                    key={surfSession.id}
                    href={`/surf-session/${surfSession.id}`}
                    className="bg-white shadow border rounded-md hover:border-indigo-400"
                >
                    <div className="">
                        <header className="flex justify-between items-center p-4">
                            <h1 className="font-medium font-funnel text-base">{surfSession.name}</h1>
                            {surfSession.isDraft && <DraftTag />}
                        </header>
                    </div>
                </Link>
            ))}
        </div>
    );
};
