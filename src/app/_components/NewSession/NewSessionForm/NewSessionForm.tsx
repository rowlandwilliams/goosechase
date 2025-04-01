'use client';

import { FormFieldWithHeader } from '../../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Input } from '../../ui/input';
import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Combobox } from '@/app/_components/ui/combobox';
import { Button } from '@/app/_components/ui/something';
import { Camera } from 'lucide-react';
import { api } from '@/trpc/react';
import { Textarea } from '@/app/_components/ui/textarea';
import { useNewSurfSessionStore } from '@/store/newSurfSession';
import { Rating } from '@/app/_components/ui/rating';
import { Dialog, DialogContent, DialogHeader } from '@/app/_components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';
import { LoadingSpinner } from '@/app/_components/SHARED/LoadingSpinner/LoadingSpinner';

interface Props {
    sessionName: string;
    handleSessionNameChange: ({ newName }: { newName: string }) => void;
    location: string | null;
    setLocation: Dispatch<SetStateAction<string | null>>;
    surfSessionId: string;
}

export const NewSessionForm = ({
    sessionName,
    handleSessionNameChange,
    location,
    setLocation,
    surfSessionId,
}: Props) => {
    const locationsQuery = api.location.locations.useQuery();
    const surfSessionScreenshotsQuery = api.surfSession.allScreenshots.useQuery({ surfSessionId });
    const { comments, setComments } = useNewSurfSessionStore();
    const [success, setSuccess] = useState(false);

    const handleSelect = (value: string) => setLocation(value);

    const locationSet = !!location;

    const createScreenshotMutation = api.surfSession.createScreenshot.useMutation();

    const handleCreateScreenshot = (e: FormEvent) => {
        e.preventDefault();

        if (!location) return;

        createScreenshotMutation.mutate(
            { spotName: location, surfSessionId },
            {
                onSuccess: (data) => {
                    console.log('Screenshot created successfully:', data);
                    setSuccess(true);
                },
                onError: (error) => {
                    console.error('Error creating screenshot:', error);
                },
            }
        );
    };

    return (
        <form className="space-y-8 shrink-0 max-w-[600px]">
            <FormFieldWithHeader description="A sentence to help you remember your session." title="Session Name">
                <Input
                    className="min-w-[500px]"
                    onChange={(e) => handleSessionNameChange({ newName: e.target.value })}
                    value={sessionName}
                />
            </FormFieldWithHeader>
            <FormFieldWithHeader title="Location">
                <div className="flex gap-4">
                    <Combobox
                        options={
                            locationsQuery.data?.map(({ name, surfForecastUrlString, breakType }) => ({
                                label: name,
                                value: surfForecastUrlString,
                                subLabel: breakType ?? undefined,
                            })) ?? []
                        }
                        noResultsMessage="No locations found"
                        searchPlaceholder="Search locations"
                        selectOptionString="Select Location"
                        value={location ?? ''}
                        handleSelect={handleSelect}
                    />
                </div>
            </FormFieldWithHeader>
            <FormFieldWithHeader title="Comments">
                <Textarea
                    value={comments ?? ''}
                    placeholder="Add any useful details about the session"
                    onChange={(e) => setComments(e.target.value)}
                />
            </FormFieldWithHeader>
            <FormFieldWithHeader title="Rating">
                <Rating rating={5} variant="indigo" showText={false} />
            </FormFieldWithHeader>
            {locationSet && (
                <Button onClick={handleCreateScreenshot}>
                    {createScreenshotMutation.isPending ? (
                        <LoadingSpinner inline /> // Display spinner when loading
                    ) : (
                        <Camera /> // Display Camera icon when not loading
                    )}{' '}
                    Create Screenshot
                </Button>
            )}
            <Dialog open={success} onOpenChange={setSuccess}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Screenshot Created!</DialogTitle>
                    </DialogHeader>
                    <p>Your surf session screenshot was successfully created.</p>
                </DialogContent>
            </Dialog>
        </form>
    );
};
