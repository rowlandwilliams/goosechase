'use client';

import { FormFieldWithHeader } from '../../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Input } from '../../ui/input';
import { useState } from 'react';
import { Combobox } from '@/app/_components/ui/combobox';
import { Button } from '@/app/_components/ui/button';
import { Camera } from 'lucide-react';

interface Props {
    sessionName: string;
    handleSessionNameChange: ({ newName }: { newName: string }) => void;
}

export const NewSessionForm = ({ sessionName, handleSessionNameChange }: Props) => {
    const [location, setLocation] = useState('');

    const handleSelect = (value: string) => setLocation(value);

    const locationSet = location.length > 0;

    return (
        <form className="pt-6 space-y-8 max-w-[600px]">
            <FormFieldWithHeader description="A sentence to help you remember your session." title="Session Name">
                <Input onChange={(e) => handleSessionNameChange({ newName: e.target.value })} value={sessionName} />
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
                        <Button>
                            <Camera /> Create Screenshot
                        </Button>
                    )}
                </div>
            </FormFieldWithHeader>
        </form>
    );
};
