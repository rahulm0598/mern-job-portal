import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
const Companies = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  return (
    <div className="py-16">
      <div className="flex items-center justify-between">
        <h1>All Companies</h1>
        <Button
          onClick={() => navigate("/admin/create/company")}
         className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:from-orange-600 hover:to-yellow-500 transition-all duration-200 px-6 py-3 text-sm font-medium rounded-lg shadow-md"
        >
          Create New
        </Button>
      </div>
      <div>
        <CompaniesTable />
      </div>
    </div>
  );
};
export default Companies;
