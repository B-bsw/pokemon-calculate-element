import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100">
            <h2 className="text-5xl font-bold tracking-widest">404</h2>
            <Link
                href="/"
                className="my-4 rounded-md border px-2 py-1 font-medium transition-all hover:bg-zinc-900 hover:text-zinc-50 dark:hover:bg-zinc-50 dark:hover:text-zinc-900"
            >
                Return Home
            </Link>
        </div>
    )
}
