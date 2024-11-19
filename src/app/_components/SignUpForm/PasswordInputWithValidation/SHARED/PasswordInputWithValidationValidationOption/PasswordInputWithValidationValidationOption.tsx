import { CircleCheck, CircleX } from 'lucide-react';

interface Props {
    achieved: boolean;
    label: string;
}

export const PasswordInputWithValidationValidationOption = ({ achieved, label }: Props) => {
    const icon = achieved ? (
        <CircleCheck className="h-4 w-4 stroke-teal-500" />
    ) : (
        <CircleX className="h-4 w-4 stroke-red-500" />
    );
    return (
        <div className="flex items-center gap-x-2">
            {icon}
            {label}
        </div>
    );
};
