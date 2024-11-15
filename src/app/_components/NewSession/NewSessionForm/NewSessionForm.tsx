'use client';

import { FormFieldWithHeader } from '../../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Input } from '../../ui/input';

interface Props {
    sessionName: string;
    handleSessionNameChange: ({ newName }: { newName: string }) => void;
}

export const NewSessionForm = ({ sessionName, handleSessionNameChange }: Props) => {
    return (
        <form className="pt-6 space-y-8 max-w-[600px]">
            <FormFieldWithHeader description="A sentence to help you remember your session." title="Session Name">
                <Input onChange={(e) => handleSessionNameChange({ newName: e.target.value })} value={sessionName} />
            </FormFieldWithHeader>
        </form>
    );
};
