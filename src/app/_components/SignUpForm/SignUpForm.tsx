'use client';

import { FormFieldWithHeader } from '@/app/_components/Forms/FormFieldWithHeader/FormFieldWithHeader';
import { UserFlowForm } from '@/app/_components/SHARED/UserFlow/UserFlowForm/UserFlowForm';
import { Input } from '@/app/_components/ui/input';
import { Lock, Mail, UserRoundPen } from 'lucide-react';
import { useState } from 'react';

export const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <UserFlowForm
            footerQuestion="Already have an account?"
            footerRedirectButtonHref="/login"
            footerRedirectButtonText="Sign In"
            formTitle="Create an account"
            handleSubmit={() => {}}
            loading={false}
            submitButtonText="Sign Up"
        >
            <div className='grid grid-cols-2 gap-8'>
                <FormFieldWithHeader title="Name">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <UserRoundPen className="h-5 w-5 stroke-stone-500" />
                        </div>
                        <Input
                            type="email"
                            required
                            className="p-2.5 pl-10 md:min-w-96"
                            placeholder="Full Name"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </FormFieldWithHeader>
                <FormFieldWithHeader title="Email">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Mail className="h-5 w-5 stroke-stone-500" />
                        </div>
                        <Input
                            type="email"
                            required
                            className="p-2.5 pl-10 md:min-w-96"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </FormFieldWithHeader>
                <FormFieldWithHeader title="Password">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 stroke-stone-500" />
                        </div>
                        <Input
                            type="password"
                            required
                            className="p-2.5 pl-10 "
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </FormFieldWithHeader>
                <FormFieldWithHeader title="Confirm Password">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Lock className="h-5 w-5 stroke-stone-500" />
                        </div>
                        <Input
                            type="password"
                            required
                            className="p-2.5 pl-10 "
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </FormFieldWithHeader>
            </div>
        </UserFlowForm>
    );
};
