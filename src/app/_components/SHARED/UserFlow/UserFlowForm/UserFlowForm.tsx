'use client';

import { LoadingSpinner } from '@/app/_components/SHARED/LoadingSpinner/LoadingSpinner';
import { Button } from '@/app/_components/ui/button';
import classNames from 'classnames';
import Link from 'next/link';
import { type ReactNode, type FormEvent } from 'react';

interface Props {
    handleSubmit: (e: FormEvent) => Promise<void>;
    submitButtonText: string;
    formTitle: string;
    children: ReactNode;
    loading: boolean;
    footerRedirectButtonHref: string;
    footerRedirectButtonText: string;
    footerQuestion?: string;
    readyToSubmit?: boolean;
}

export const UserFlowForm = ({
    handleSubmit,
    submitButtonText,
    formTitle,
    children,
    loading,
    footerRedirectButtonHref,
    footerRedirectButtonText,
    footerQuestion = undefined,
    readyToSubmit = true,
}: Props) => {
    return (
        <form
            className="max-w-max bg-white shadow-xl border border-stone-100 p-1.5 rounded-md space-y-6"
            onSubmit={(e) => void handleSubmit(e)}
        >
            <div className={classNames('space-y-10', { 'px-12 pt-12 pb-4': footerQuestion, 'p-12': !footerQuestion })}>
                <h1 className="text-[22px] font-medium text-center text-stone-800">{formTitle}</h1>
                <div className="space-y-4">{children}</div>
                <div className="mx-auto flex items-center">
                    <Button type="submit" className="w-full h-12 mx-auto bg-indigo-600" disabled={!readyToSubmit}>
                        {loading ? <LoadingSpinner inline /> : submitButtonText}
                    </Button>
                </div>
            </div>
            {footerQuestion && (
                <div className="bg-stone-50 font-light text-center text-sm py-6 rounded-md">
                    {footerQuestion}{' '}
                    <Link href={footerRedirectButtonHref} className="text-cyan-500 ml-1 font-medium">
                        {footerRedirectButtonText}
                    </Link>
                </div>
            )}
        </form>
    );
};
