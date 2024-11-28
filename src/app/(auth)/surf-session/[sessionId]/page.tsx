// app/surf-session/[sessionId]/page.tsx

import { api } from '@/trpc/server';
import { notFound } from 'next/navigation';

interface SurfSessionPageProps {
    params: {
        sessionId: string;
    };
}

export default async function SurfSessionPage({ params }: SurfSessionPageProps) {
    const { sessionId } = params;

    // Fetch the surf session using Prisma
    const surfSession = await api.surfSession.surfSession({ id: sessionId });

    if (!surfSession) {
        return notFound();
    }

    return (
        <div>
            <h1>Surf Session: {sessionId}</h1>
        </div>
    );
}
