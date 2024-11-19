import { LoadingSpinner } from '@/app/_components/SHARED/LoadingSpinner/LoadingSpinner';
import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { type ReactNode, type FormEvent } from 'react';

interface Props {
    handleSubmit: (e: FormEvent) => Promise<void>;
    submitButtonText: string;
    formTitle: string;
    children: ReactNode;
    loading: boolean;
    footerQuestion: string;
    footerRedirectButtonHref: string;
    footerRedirectButtonText: string;
}

export const UserFlowForm = ({
    handleSubmit,
    submitButtonText,
    formTitle,
    children,
    loading,
    footerQuestion,
    footerRedirectButtonHref,
    footerRedirectButtonText,
}: Props) => {
    return (
        <form
            className="max-w-max bg-white shadow-xl border border-stone-100 p-1.5 rounded-md space-y-6"
            onSubmit={(e) => void handleSubmit(e)}
        >
            <div className="px-12 pt-12 pb-4 space-y-8">
                <h1 className="text-[22px] font-medium text-stone-800">{formTitle}</h1>
                <div className="space-y-4">{children}</div>
                <div className="pt-2 mx-auto flex items-center">
                    <Button type="submit" className="w-full max-w-80 mx-auto bg-indigo-600">
                        {loading ? <LoadingSpinner inline /> : submitButtonText}
                    </Button>
                </div>
                <div className="w-2/3 text-center mx-auto text-stone-500">
                    By clicking continue, you agree to our{' '}
                    <span className="underline underline-offset-4">Terms of Service</span> and{' '}
                    <span className="underline underline-offset-4">Privacy Policy.</span>
                </div>
            </div>
            <div className="bg-stone-50 font-light text-center text-sm py-6 rounded-md">
                {footerQuestion}{' '}
                <Link href={footerRedirectButtonHref} className="text-cyan-500 ml-1 font-medium">
                    {footerRedirectButtonText}
                </Link>
            </div>
        </form>
    );
};
