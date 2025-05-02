import VerificationForm from "@/components/verification-form"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-white">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-sm flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
          <Image
            src="/verification-illustration.png"
            alt="Verification illustration"
            width={300}
            height={300}
            priority
          />
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
          <VerificationForm />
        </div>
      </div>
    </main>
  )
}
