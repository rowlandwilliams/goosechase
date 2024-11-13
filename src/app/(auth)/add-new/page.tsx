import { NewSessionForm } from '~/app/_components/NewSessionForm/NewSessionForm';

export default function AddNewSurfSession() {
    return (
        <section className="max-w-[600px] ml-10 divide-y">
            <header className="font-haas font-extrabold tracking-wide text-base pb-6">Input Surf Session below</header>
            <NewSessionForm />
        </section>
    );
}
