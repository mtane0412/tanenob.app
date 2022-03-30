import Image from 'next/image'

export default function Zuckerberg() {
    return (
        <div className="flex h-screen">
            <div className="m-auto">
            <Image src="/zuckerberg.png" width={499} height={374} alt="Done is better than perfect." />
            </div>
        </div>
    )
}