import DashboardContainer from "@/components/dashboard/DashboardContainer";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function Component() {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <DashboardContainer />
    </div>
  );
}
