'use client';

import { CircleCheck, GitPullRequestDraft, RefreshCcw, Save, Trash2 } from 'lucide-react';
import { NewSessionForm } from './NewSessionForm/NewSessionForm';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { useSearchParams } from 'next/navigation';
import { api } from '@/trpc/react';
import { useCallback, useEffect } from 'react';
import { useNewSurfSessionStore } from '@/store/newSurfSession';

export const NewSession = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const { sessionName, setSessionName } = useNewSurfSessionStore();

    const surfSessionQuery = api.surfSession.surfSession.useQuery({ id: sessionId ?? '' }, { enabled: !!sessionId });
    const updateSessionMutation = api.surfSession.updateSurfSession.useMutation({
        onSuccess: () => {
            void surfSessionQuery.refetch(); // Refetch data after successful mutation
        },
    });

    const handlePublish = useCallback(() => {
        if (sessionId) {
            updateSessionMutation.mutate({ id: sessionId, name: sessionName });
        }
    }, [sessionId, sessionName, updateSessionMutation]);
    const changesMade = sessionName !== surfSessionQuery.data?.name;

    // Update the sessionName state when the query loads the session data
    useEffect(() => {
        if (surfSessionQuery.data?.name) {
            setSessionName(surfSessionQuery.data.name);
        }
    }, [surfSessionQuery.data?.name, setSessionName]);

    useEffect(() => {
        if (sessionId && changesMade) {
            const autosaveTimeout = setTimeout(() => {
                handlePublish();
            }, 2000); // Autosave after 2 seconds of inactivity

            return () => clearTimeout(autosaveTimeout); // Cleanup on sessionName change
        }
    }, [sessionName, sessionId, surfSessionQuery.data?.name, handlePublish, changesMade]);

    const handleSessionNameChange = ({ newName }: { newName: string }) => {
        setSessionName(newName);
    };

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
                    <Button onClick={handlePublish} className="h-8" disabled={!changesMade}>
                        <Save />
                        Save
                    </Button>
                    <Button onClick={handlePublish} variant={'destructive'} className="h-8">
                        <Trash2 />
                        Delete
                    </Button>
                </section>
            </header>
            <NewSessionForm sessionName={sessionName} handleSessionNameChange={handleSessionNameChange} />
        </section>
    );
};
