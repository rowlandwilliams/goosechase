'use client';

import { FormFieldWithHeader } from '../../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Input } from '../../ui/input';
import { type Dispatch, type SetStateAction } from 'react';

interface Props {
    setSessionName: Dispatch<SetStateAction<string>>;
}

export const NewSessionForm = ({ setSessionName }: Props) => {
    return (
        <form className="pt-6 space-y-8 max-w-[600px]">
            <FormFieldWithHeader description="A sentence to help you remember your session." title="Session Name">
                <Input onChange={(e) => setSessionName(e.target.value)} />
            </FormFieldWithHeader>
        </form>
    );
};
