import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import AdminJobsTable from "./AdminJobsTable";

const AdminJobs = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();

  return (
    <div className="min-h-screen w-full bg-gray-100 px-6 py-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-4xl font-bold text-gray-800">
            Admin Job Listings
          </h1>
          <Button
            onClick={() => navigate("/admin/create/job")}
            className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 px-6 py-3 text-sm font-medium rounded-lg shadow-md"
          >
            + Create New Job
          </Button>
        </div>

        {/* Table Section */}
        <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <AdminJobsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminJobs;
