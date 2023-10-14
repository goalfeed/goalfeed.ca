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
            <h1 className="text-4xl font-bold">Goalfeed is Evolving!</h1>
            <h2 className="text-2xl font-bold">Introducing the Open Source Replacement</h2>
            <p className="text-lg text-gray-500 mt-2">We&apos;re excited to announce that while the old Goalfeed service has been discontinued, a free open source drop-in replacement has been created to take its place. This new service is available as a Go application, which you can find at <a href="https://github.com/goalfeed/goalfeed" target="_blank" rel="noopener noreferrer">goalfeed on GitHub</a>. For those using Home Assistant, there&apos;s also a hassio addon available at <a href="https://github.com/goalfeed/hassio-goalfeed-repository" target="_blank" rel="noopener noreferrer">hassio-goalfeed-repository on GitHub</a>.</p>
            <p className="text-lg text-gray-500 mt-2">All your previous Home Assistant goalfeed automations should work seamlessly with this new service. We encourage contributors to join in and help improve the project!</p>
            <p className="text-lg text-gray-500 mt-2">If you encounter any bugs or have feature requests, we encourage you to <a href="https://github.com/goalfeed/goalfeed/issues" target="_blank" rel="noopener noreferrer">open an issue on GitHub</a>. Alternatively, you can also email us directly at admin@goalfeed.com.</p>
            <p className="text-lg text-gray-500 mt-2">Thank you for your continued support and understanding. We&apos;re excited for this new chapter and hope you are too!</p>
        </main>
    );
}
