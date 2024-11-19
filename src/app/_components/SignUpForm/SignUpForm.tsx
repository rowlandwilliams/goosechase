'use client';

import { FormFieldWithHeader } from '@/app/_components/Forms/FormFieldWithHeader/FormFieldWithHeader';
import { UserFlowForm } from '@/app/_components/SHARED/UserFlow/UserFlowForm/UserFlowForm';
import { PasswordInputWithValidation } from '@/app/_components/SignUpForm/PasswordInputWithValidation/PasswordInputWithValidation';
import { PasswordInputWithValidationConfirmPasswordValidator } from '@/app/_components/SignUpForm/PasswordInputWithValidation/PasswordInputWithValidationConfirmPasswordValidator/PasswordInputWithValidationConfirmPasswordValidator';
import { PasswordInputWithValidationPasswordValidator } from '@/app/_components/SignUpForm/PasswordInputWithValidation/PasswordInputWithValidationPasswordValidator/PasswordInputWithValidationPasswordValidator';
import { validatePassword } from '@/app/_components/SignUpForm/utils/utils';
import { Input } from '@/app/_components/ui/input';
import { api } from '@/trpc/react';
import { type SignUpDetailsOptions } from '@/types/user-flow';
import { Mail, Origami, UserRoundPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { type ChangeEvent, type FormEvent, useState } from 'react';

export const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const signUpMutation = api.userFlow.signUp.useMutation();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        signUpMutation.mutate(
            { email, password, name },
            {
                onSuccess: () => {
                    setSuccess(true);
                },
                onError: (error) => {
                    console.error('Error creating user:', error);
                },
            }
        );
    };

    const handleSuccessSubmit = async (e: FormEvent) => {
        e.preventDefault();
        router.push('/login');
    };

    const passwordOptions: SignUpDetailsOptions = [
        {
            label: 'Password',
            handleChange: (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value),
            inputType: 'password',
            value: password,
            required: true,
            dataCy: 'password',
            passwordValidator: <PasswordInputWithValidationPasswordValidator password={password} />,
            validationAchieved: validatePassword(password),
        },
        {
            label: 'Confirm Password',
            handleChange: (e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value),
            inputType: 'password',
            value: confirmPassword,
            required: true,
            dataCy: 'confirm-password',
            passwordValidator: (
                <PasswordInputWithValidationConfirmPasswordValidator
                    confirmPassword={confirmPassword}
                    password={password}
                />
            ),
            validationAchieved: password === confirmPassword,
        },
    ];

    const readyToSubmit = validatePassword(password) && password === confirmPassword;

    return (
        <UserFlowForm
            footerQuestion={success ? undefined : 'Already have an account?'}
            footerRedirectButtonHref="/login"
            footerRedirectButtonText="Sign In"
            formTitle={success ? 'Successfully created your account' : 'Create an account'}
            handleSubmit={success ? handleSuccessSubmit : handleSubmit}
            loading={signUpMutation.isPending}
            submitButtonText={success ? 'Login' : 'Sign Up'}
            readyToSubmit={readyToSubmit}
        >
            {success ? (
                <div className="flex flex-col space-y-8 items-center">
                    <Origami className="h-24 w-24 animate-bounce stroke-stone-400" />
                    <div className="text-xl">Happy gooosechasin&apos; {name}!</div>
                </div>
            ) : (
                <div className="grid grid-ols-2 gap-6">
                    <FormFieldWithHeader title="Name" required>
                        <div className="relative">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserRoundPen className="h-5 w-5 stroke-stone-500" />
                            </div>
                            <Input
                                type="text"
                                required
                                className="p-2.5 pl-10 md:min-w-96"
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </FormFieldWithHeader>
                    <FormFieldWithHeader title="Email" required>
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
                    {passwordOptions.map((option) => (
                        <PasswordInputWithValidation
                            key={option.label}
                            option={option}
                            passwordValidator={option.passwordValidator}
                            validationAchieved={option.validationAchieved}
                        />
                    ))}
                </div>
            )}
        </UserFlowForm>
    );
};
