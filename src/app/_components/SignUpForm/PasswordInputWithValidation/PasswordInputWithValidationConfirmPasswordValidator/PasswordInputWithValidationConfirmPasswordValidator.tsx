import React from 'react';
import { PasswordInputWithValidationValidationOption } from '../SHARED/PasswordInputWithValidationValidationOption/PasswordInputWithValidationValidationOption';

interface Props {
    password: string;
    confirmPassword: string;
}

export const PasswordInputWithValidationConfirmPasswordValidator = ({ password, confirmPassword }: Props) => {
    const achieved = password === confirmPassword;
    return (
        <div className="absolute top-full grid w-full grid-cols-2 gap-2 rounded-sm border border-stone-300 bg-white p-4 text-xs  text-stone-700 shadow-md ">
            <PasswordInputWithValidationValidationOption achieved={achieved} label="Passwords must match" />
        </div>
    );
};
