import { NewSessionForm } from '~/app/_components/NewSessionForm/NewSessionForm';

export default function AddNewSurfSession() {
    return (
        <section className="max-w-[600px] px-4 divide-y">
            <header className="font-medium text-base pb-6">Input Surf Session below</header>
            <NewSessionForm />
        </section>
    );
}
