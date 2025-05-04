import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, PlusIcon, Trash2Icon } from "lucide-react";
// import Image from "next/image";

export default function DashboardContainer() {
  return (
    <div>
      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto sm:p-6 p-0 -mt-6">
          {/* task main */}
          <div className="bg-white rounded-lg shadow-sm sm:p-6 p-2 md:mt-[-50px]">
            {/* filter option */}
            <div className="sm:flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold md:text-start text-center mb-4 sm:mb-0">
                All Task List
              </h2>
              <div className="flex flex-col sm:flex-row sm:justify-start sm:items-center gap-4 justify-center items-center text-center">
                <Select>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select Task Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="art">Art and Craft</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Task" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Task</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inprogress">InProgress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-emerald-400 hover:bg-emerald-500 text-white">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add New Task
                </Button>
              </div>
            </div>

            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  status: "Pending" | "InProgress" | "Done";
  assignee?: {
    avatar: string;
    initial: string;
  };
}

function TaskCard({ task }: { task: Task }) {
  const statusColors = {
    Pending: "text-purple-500",
    InProgress: "text-amber-500",
    Done: "text-emerald-500",
  };

  const statusDot = {
    Pending: "bg-purple-500",
    InProgress: "bg-amber-500",
    Done: "bg-emerald-500",
  };

  return (
    <Card className="p-4 relative">
      <button className="absolute top-4 right-4 text-red-300 hover:text-red-500">
        <Trash2Icon size={16} />
      </button>

      <div className="flex gap-3 mb-3">
        <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center">
          <span className="text-emerald-700 font-medium">B</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          {task.assignee ? (
            <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-white text-xs">
                {task.assignee.initial}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <CalendarIcon size={14} />
            </div>
          )}
          <span>{task.date}</span>
        </div>

        <div className="flex items-center gap-1">
          <div
            className={`h-2 w-2 rounded-full ${statusDot[task.status]}`}
          ></div>
          <span className={`text-sm ${statusColors[task.status]}`}>
            {task.status}
          </span>
        </div>
      </div>
    </Card>
  );
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "Pending",
  },
  {
    id: 2,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "InProgress",
    assignee: {
      avatar: "/avatar1.png",
      initial: "A",
    },
  },
  {
    id: 3,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "Done",
  },
  {
    id: 4,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "InProgress",
  },
  {
    id: 5,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "Done",
    assignee: {
      avatar: "/avatar2.png",
      initial: "J",
    },
  },
  {
    id: 6,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "Pending",
    assignee: {
      avatar: "/avatar3.png",
      initial: "T",
    },
  },
  {
    id: 7,
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description.",
    date: "Friday, April 19 - 2024",
    status: "Pending",
  },
];
