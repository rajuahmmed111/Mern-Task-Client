"use client";

import { useState } from "react";
import { Calendar, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import TaskDetailHeader from "@/components/dashboard/taskDetailHeader";

export default function TaskDetails() {
  //   const [status, setStatus] = useState("inprogress")
  const [selectedOption, setSelectedOption] = useState("done");

  return (
    <div>
      <TaskDetailHeader />
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto sm:p-6 p-0 -mt-6">
          <div className="bg-white rounded-lg shadow-sm sm:p-6 p-2 md:mt-[-50px]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h1 className="text-xl font-bold">Task Details</h1>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-purple-600 font-medium">20 Points</span>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 hover:text-amber-700"
                >
                  <Pencil size={16} />
                  Edit Task
                </Button>
                <Link href="/dashboard">
                  <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
                    Back
                  </Button>
                </Link>
              </div>
            </div>

            <hr className="my-4" />

            {/* Task Info */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-emerald-200 flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12Z"
                      fill="#047857"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex-grow">
                <h2 className="text-xl font-bold mb-2">Art and Craft</h2>
                <p className="text-gray-600 mb-6">
                  Select the role that you want to candidates for and upload
                  your job description. Select the role that you want to
                  candidates for and upload your job description. Select the
                  role that you want to candidates for and upload your job
                  description. Select the role that you want to candidates for
                  and upload your job description.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-medium mb-2">End Date</p>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={18} />
                      <span>Friday, April 19 - 2024</span>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-2 opacity-0 md:block hidden">
                      Status
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                      <span className="text-amber-500 font-medium">
                        InProgress
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Change */}
            <div className="mb-6">
              <label className="block font-medium mb-2">Change Status</label>
              <div className="relative">
                <Select
                  value={selectedOption}
                  onValueChange={setSelectedOption}
                >
                  <SelectTrigger className="w-full md:w-96">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Task</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="collaborative">
                      Collaborative Task
                    </SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <div className="absolute top-full left-0 mt-1 bg-white border rounded-md shadow-sm w-full md:w-96 z-10">
                  {selectedOption === "done" && (
                    <div className="p-2">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="all" />
                          <label
                            htmlFor="all"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            All Task
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="ongoing" />
                          <label
                            htmlFor="ongoing"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Ongoing
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="pending" />
                          <label
                            htmlFor="pending"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Pending
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="collaborative" />
                          <label
                            htmlFor="collaborative"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Collaborative Task
                          </label>
                        </div>
                        <div className="flex items-center space-x-2 bg-emerald-50 p-1 rounded">
                          <Checkbox id="done" checked />
                          <label
                            htmlFor="done"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Done
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
              <Button
                variant="outline"
                className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              >
                Delete Task
              </Button>
              <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
