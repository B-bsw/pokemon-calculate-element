import Link from 'next/link'

export default function NotFound() {
    return (
        <div
            className={
                '-mt-25 flex h-screen flex-col items-center justify-center'
            }
        >
            <h2 className={'text-5xl'}>Not Found 404</h2>
            <Link
                href="/"
                className="my-4 rounded-md border px-2 py-1 font-medium transition-all hover:bg-black hover:text-white not-dark:hover:bg-white not-dark:hover:text-black"
            >
                Return Home
            </Link>
        </div>
    )
}
