import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm uppercase tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-3 font-serif text-4xl">Η σελίδα δεν βρέθηκε</h1>
      <p className="mt-3 text-muted">The page you asked for is not on GO CUBA.</p>
      <Link href="/el" className="btn-gold mt-8 inline-flex">
        GO CUBA
      </Link>
    </div>
  );
}
