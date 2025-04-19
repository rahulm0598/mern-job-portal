// src/components/admin/AdminApplicationsTable.jsx
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AdminApplicationsTable = () => {
  const { jobApplicants, loading } = useSelector((store) => store.application);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!jobApplicants || jobApplicants.length === 0) {
    return <div className="text-center py-8">No applications found.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Applicant Name</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Job Title</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobApplicants.map((application) => (
            <tr key={application.applicationId} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-800">{application.applicantName}</td>
              <td className="px-6 py-4 text-sm text-gray-800">{application.jobTitle}</td>
              <td className="px-6 py-4 text-sm text-gray-800 capitalize">{application.status}</td>
              <td className="px-6 py-4 text-sm">
                <Link to={`/admin/application/${application.applicationId}`}>
                  <Button variant="outline" className="hover:bg-orange-50 hover:text-orange-600">
                    View Details
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminApplicationsTable;