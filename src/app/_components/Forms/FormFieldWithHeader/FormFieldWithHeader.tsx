import { Label } from '@/app/_components/ui/label';
import { CircleCheck, CircleX } from 'lucide-react';
import { type ReactNode } from 'react';

interface Props {
    title: string;
    children: ReactNode;
    description?: string;
    required?: boolean;
    validated?: boolean;
}

export const FormFieldWithHeader = ({
    title,
    children,
    description = undefined,
    required = false,
    validated = undefined,
}: Props) => {
    const icon = validated ? (
        <CircleCheck className="h-4 w-4 stroke-teal-500" />
    ) : (
        <CircleX className="h-4 w-4 stroke-red-500" />
    );

    return (
        <div className="space-y-3 relative">
            <header className="flex items-center justify-between">
                <Label className="flex items-center gap-x-2 " htmlFor="name">
                    <span className="font-medium">
                        {title} {required && <span className="text-flow-turquoise">*</span>}
                    </span>
                </Label>
                {validated != undefined && icon}
            </header>
            {children}
            {description && <div className="font-inter font-light text-stone-600">{description}</div>}
        </div>
    );
};
