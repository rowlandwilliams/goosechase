import { NewSession } from '@/app/_components/NewSession/NewSession';
import { Suspense } from 'react';

export default function AddNewSurfSession() {
    return (
        <Suspense>
            <NewSession />
        </Suspense>
    );
}
