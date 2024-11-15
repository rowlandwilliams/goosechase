import Image from 'next/image';
import React from 'react';
import { api } from '@/trpc/server';

export const SurfSessionGrid = async () => {
    const surfSession = await api.surfSession.getSurfSessions();

    return (
        <div className="grid md:grid-cols-4 gap-6">
            {surfSession.map((surfSession) => (
                <div key={surfSession.id} className="shadow border rounded-md bg-white">
                    <h1 className="font-haas font-bold p-4">{surfSession.name}</h1>
                </div>
            ))}
        </div>
    );
};
