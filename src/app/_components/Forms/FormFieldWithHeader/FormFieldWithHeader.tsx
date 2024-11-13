import { type ReactNode } from 'react';

interface Props {
    title: string;
    children: ReactNode;
    description?: string;
}

export const FormFieldWithHeader = ({ title, children, description = undefined }: Props) => {
    return (
        <div className="space-y-3">
            <h1 className="font-medium tracking-wide text-sm text-stone-700">{title}</h1>
            {children}
            {description && <div className="font-inter font-light text-stone-600">{description}</div>}
        </div>
    );
};
