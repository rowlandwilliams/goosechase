'use client';

import { CircleCheck, RefreshCcw, Save, Trash2 } from 'lucide-react';
import { NewSessionForm } from './NewSessionForm/NewSessionForm';
import { Separator } from '../ui/separator';
import { Button } from '../ui/something';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '@/trpc/react';
import { useCallback, useEffect, useState } from 'react';
import { useNewSurfSessionStore } from '@/store/newSurfSession';
import { DraftTag } from '@/app/_components/SHARED/DraftTag/DraftTag';

export const NewSession = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('id');
    const { sessionName, setSessionName, comments, setComments } = useNewSurfSessionStore();
    const router = useRouter();
    const locationsQuery = api.location.locations.useQuery();
    const [location, setLocation] = useState<string | null>(null);
    const locationId = locationsQuery.data?.find((surfSpot) => surfSpot.surfForecastUrlString === location)?.id;

    const surfSessionQuery = api.surfSession.surfSession.useQuery({ id: sessionId ?? '' }, { enabled: !!sessionId });
    const updateSessionMutation = api.surfSession.updateSurfSession.useMutation({
        onSuccess: () => {
            void surfSessionQuery.refetch(); // Refetch data after successful mutation
        },
    });
    const deleteSessionMutation = api.surfSession.deleteSurfSession.useMutation();

    const handlePublish = useCallback(() => {
        if (sessionId) {
            updateSessionMutation.mutate({
                id: sessionId,
                name: sessionName,
                comments,
                locationId: locationId ?? null,
            });
        }
    }, [sessionId, sessionName, updateSessionMutation, comments, locationId]);

    const changesMade =
        sessionName !== surfSessionQuery.data?.name ||
        comments !== surfSessionQuery.data.comments ||
        locationId !== surfSessionQuery.data.locationId;

    const handleDelete = () => {
        if (sessionId) {
            deleteSessionMutation.mutate(
                {
                    id: sessionId,
                },
                {
                    onSuccess: () => {
                        router.push('/');
                    },
                }
            );
        }
    };

    // Update the sessionName state when the query loads the session data
    useEffect(() => {
        if (surfSessionQuery.data?.name) {
            setSessionName(surfSessionQuery.data.name);
        }
        if (surfSessionQuery.data?.comments) {
            setComments(surfSessionQuery.data.comments);
        }
    }, [surfSessionQuery.data, setSessionName, setComments]);

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
                    <DraftTag />
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
                    <Button onClick={handleDelete} variant={'destructive'} className="h-8">
                        <Trash2 />
                        Discard
                    </Button>
                </section>
            </header>
            <div className="flex gap-12 py-8 px-2">
                <NewSessionForm
                    location={location}
                    setLocation={setLocation}
                    sessionName={sessionName}
                    handleSessionNameChange={handleSessionNameChange}
                />
            </div>
        </section>
    );
};
