'use client';

import { FormFieldWithHeader } from '../../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Input } from '../../ui/input';
import { type FormEvent, useState } from 'react';
import { Combobox } from '@/app/_components/ui/combobox';
import { Button } from '@/app/_components/ui/button';
import { Camera } from 'lucide-react';
import { api } from '@/trpc/react';
import { Textarea } from '@/app/_components/ui/textarea';
import { useNewSurfSessionStore } from '@/store/newSurfSession';

interface Props {
    sessionName: string;
    handleSessionNameChange: ({ newName }: { newName: string }) => void;
}

export const NewSessionForm = ({ sessionName, handleSessionNameChange }: Props) => {
    const [location, setLocation] = useState('');
    const { comments, setComments } = useNewSurfSessionStore();

    const handleSelect = (value: string) => setLocation(value);

    const locationSet = location.length > 0;

    const createScreenshotMutation = api.surfSession.createScreenshot.useMutation();

    const handleCreateScreenshot = (e: FormEvent) => {
        e.preventDefault();

        createScreenshotMutation.mutate({ spotName: 'fraserburgh' });
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
                        options={[
                            { label: 'Fraserburgh', value: 'fraserburgh' },
                            { label: 'Thurso East', value: 'thurso' },
                            { label: 'East Sands', value: 'east-sands' },
                        ]}
                        noResultsMessage="No locations found"
                        searchPlaceholder="Search locations"
                        selectOptionString="Select Location"
                        value={location}
                        handleSelect={handleSelect}
                    />
                    {locationSet && (
                        <Button onClick={handleCreateScreenshot}>
                            <Camera /> Create Screenshot
                        </Button>
                    )}
                </div>
            </FormFieldWithHeader>
            <FormFieldWithHeader title="Comments">
                <Textarea
                    value={comments ?? ''}
                    placeholder="Add any useful details about the session"
                    onChange={(e) => setComments(e.target.value)}
                />
            </FormFieldWithHeader>
        </form>
    );
};
