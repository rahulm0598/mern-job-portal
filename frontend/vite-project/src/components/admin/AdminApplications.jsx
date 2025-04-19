// src/components/admin/AdminApplications.jsx
import useGetJobApplicants from '@/hooks/useGetJobApplicants';
import AdminApplicationsTable from './AdminApplicationsTable';

const AdminApplications = () => {
  useGetJobApplicants();
  return (
    <div className="min-h-screen w-full bg-gray-100 px-6 py-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Job Applications</h1>
        </div>
        <div className="bg-white shadow-xl rounded-xl border border-gray-200 overflow-hidden">
          <AdminApplicationsTable />
        </div>
      </div>
    </div>
  );
};

export default AdminApplications;