import { GitPullRequestDraft } from 'lucide-react';

export const DraftTag = () => {
    return (
        <div className="text-xs flex gap-1.5 items-center bg-red-100 px-4 rounded-full py-1 text-red-600 font-medium">
            <GitPullRequestDraft className="h-3 w-3" />
            Draft
        </div>
    );
};
