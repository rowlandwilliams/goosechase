'use client';

import { CircleCheck, GitPullRequestDraft, RefreshCcw } from 'lucide-react';
import { NewSessionForm } from './NewSessionForm/NewSessionForm';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { api } from '~/trpc/react';
import { useState } from 'react';

export const NewSession = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const [sessionName, setSessionName] = useState('');

    const surfSession = api.surfSession.surfSession.useQuery({ id: sessionId ?? '' }, { enabled: !!sessionId });

    const updateSessionMutation = api.surfSession.updateSurfSession.useMutation({});

    const handlePublish = () => {
        if (sessionId) {
            updateSessionMutation.mutate(
                { id: sessionId, name: sessionName }
                // {
                //     onSuccess: () => {
                //         router.push(`/add-new?id=${newSessionId}`);
                //     },
                //     onError: (error) => {
                //         console.error('Error creating session:', error);
                //     },
                // }
            );
        }
    };

    console.log(surfSession.data);

    return (
        <section className="px-4">
            <header className="flex justify-between items-center border-b border-dashed pb-4">
                <h1 className="text-base font-medium">Input Surf Session below</h1>
                <section className="flex gap-2 items-center">
                    <div className="text-xs flex gap-1.5 items-center bg-red-100 px-4 rounded-full py-1 text-red-600 font-medium">
                        <GitPullRequestDraft className="h-3 w-3" />
                        Draft
                    </div>
                    <Separator orientation="vertical" className="h-4 mx-2" />
                    <div className="text-stone-600 flex gap-1 items-center w-[162px]">
                        {updateSessionMutation.isPending ? (
                            <>
                                <RefreshCcw className="h-4 w-4" />
                                Saving Session...
                            </>
                        ) : (
                            <>
                                <CircleCheck className="h-4 w-4" />
                                Last saved 2 minutes ago
                            </>
                        )}
                    </div>
                    <Separator orientation="vertical" className="h-4 mx-2" />
                    <Button onClick={handlePublish} className="h-8">
                        Publish
                    </Button>
                </section>
            </header>
            <NewSessionForm setSessionName={setSessionName} />
        </section>
    );
};
