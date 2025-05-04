// import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardHeader() {
  return (
    <div>
      {/* Header */}
      <header className="bg-gradient-to-r from-emerald-800 to-emerald-950 text-white px-0 sm:px-6 py-6">
        <div className="container mx-auto">
          {/* navbar */}
          <div className="flex items-center justify-between mb-8">
            {/* Task */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-emerald-700 flex items-center justify-center">
                <span className="text-white">⏱</span>
              </div>
              <span className="text-xl font-semibold">Tasko</span>
            </div>
            {/* Task List and Spin*/}
            <div className="hidden sm:flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-700 flex items-center justify-center">
                  <span className="text-white text-xs">📋</span>
                </div>
                <span>Task List</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-emerald-700 flex items-center justify-center">
                  <span className="text-white text-xs">🔄</span>
                </div>
                <span>Spin</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
                  <span className="text-white text-xs">T</span>
                </div>
                <span>Thomas M.</span>
              </div>
            </div>
          </div>

          {/* header bottom side */}
          <div className="flex justify-between items-center">
            <div className="md:pb-14">
              <p className="text-emerald-300">Hi Thomas</p>
              <h1 className="sm:text-3xl text-2xl font-bold">Welcome to Dashboard</h1>
            </div>
            <div className="w-64 h-32 relative">
              {/* <Image
                src="/placeholder.svg?height=128&width=256"
                alt="Dashboard illustration"
                width={256}
                height={128}
                className="object-contain"
              /> */}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
