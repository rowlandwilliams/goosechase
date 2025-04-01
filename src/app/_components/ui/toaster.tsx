/* eslint-disable react/jsx-props-no-spreading */
import { Toast, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './toast';
import { useToast } from '@/hooks/ui/use-toast';
import { BrainwaveIcon } from '@/app/_components/SHARED/Icons/BrainwaveIcon/BrainwaveIcon';
import { CircleAlert } from 'lucide-react';

export const Toaster = () => {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(({ id, title, description, isError, includeLogo, action, ...props }) => {
                return (
                    <Toast key={id} {...props}>
                        <div className="grid gap-1" data-cy={`${isError ? 'error' : 'success'}-toast`}>
                            {includeLogo && <BrainwaveIcon dim={22} />}
                            {isError && (
                                <ToastTitle className="flex items-start gap-x-2">
                                    <CircleAlert />
                                    {title ?? 'An error occurred'}
                                </ToastTitle>
                            )}
                            {title && !isError && <ToastTitle>{title}</ToastTitle>}
                            {description && <ToastDescription>{description}</ToastDescription>}
                        </div>
                        {action}
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
};
