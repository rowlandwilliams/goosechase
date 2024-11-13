'use client';

import { api } from '~/trpc/react';
import { FormFieldWithHeader } from '../Forms/FormFieldWithHeader/FormFieldWithHeader';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { LoadingSpinner } from '../SHARED/LoadingSpinner/LoadingSpinner';
import Image from 'next/image';

export const NewSessionForm = () => {
    const mutation = api.surfSession.createScreenshot.useMutation();
    const screenshots = api.surfSession.allScreenshots.useQuery();

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent form submission

        // Call the mutation with the spot name input
        mutation.mutate(
            { spotName: 'fraserbugh' },
            {
                onSuccess: () => {
                    // Refetch screenshots once the mutation is successful
                    screenshots.refetch();
                },
            }
        );
    };

    return (
        <form className="pt-6 space-y-8">
            <FormFieldWithHeader description="A sentence to help you remember your session." title="Session Name">
                <Input />
            </FormFieldWithHeader>
            <FormFieldWithHeader title="Date">date</FormFieldWithHeader>
            <Button onClick={handleClick} className="w-44">
                {mutation.isPending ? (
                    <LoadingSpinner inline />
                ) : (
                    <div className="text-lg w-4 h-4 flex shrink-0 items-center justify-center">+</div>
                )}
                Create Screenshot
            </Button>
            {screenshots.data && (
                <section className="space-y-2">
                    <h1>Screenshots</h1>
                    <div className="flex gap-4">
                        {screenshots.data.map((screenshot) => (
                            <div key={screenshot} className="shadow rounded-md p-2 border overflow-hidden">
                                <Image
                                    src={screenshot}
                                    width={120}
                                    height={100}
                                    className="rounded-md"
                                    alt={'forecast-screenshot'}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {mutation.error && <div>{mutation.error.message}</div>}
        </form>
    );
};
