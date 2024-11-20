import { PasswordInputWithValidationValidationOption } from '../SHARED/PasswordInputWithValidationValidationOption/PasswordInputWithValidationValidationOption';

const validateOptions = [
    { label: '8 characters minimum', regex: /^.{8,}$/ },
    { label: 'One number', regex: /\d/ },
    { label: 'One uppercase letter', regex: /[A-Z]/ },
    { label: 'One lowercase letter', regex: /[a-z]/ },
];

interface Props {
    password: string;
}

export const PasswordInputWithValidationPasswordValidator = ({ password }: Props) => {
    return (
        <div className="absolute top-full grid w-full grid-cols-1 gap-2 rounded-sm border bg-white p-4 text-xs text-stone-700 z-50  shadow-md sm:grid-cols-2 ">
            {validateOptions.map(({ label, regex }) => (
                <PasswordInputWithValidationValidationOption
                    key={label}
                    achieved={regex.test(password)}
                    label={label}
                />
            ))}
        </div>
    );
};
