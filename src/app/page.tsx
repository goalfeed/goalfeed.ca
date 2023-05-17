import Image from 'next/image';

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center h-screen mx-8">
            <div className="mb-8">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={400}
                    height={400}
                />
            </div>
            <h1 className="text-4xl font-bold">Game over</h1>
            <h2 className="text-2xl font-bold">Thank you for your support!</h2>
            <p className="text-lg text-gray-500 mt-2">We would like to inform you that the Goalfeed service has been
                discontinued. Unfortunately, we are no longer able to provide the service moving forward. Rest assured,
                we have refunded existing customers for the final month of service to ensure a fair resolution.</p>
            <p className="text-lg text-gray-500 mt-2"> If you have any issues or questions regarding the discontinuation
                or any other concerns, please feel free to reach out to us. You can contact us via email at
                admin@goalfeed.com</p>
            <p className="text-lg text-gray-500 mt-2">We apologize for any inconvenience this may cause and appreciate
                your understanding.</p>
        </main>
    );
}
