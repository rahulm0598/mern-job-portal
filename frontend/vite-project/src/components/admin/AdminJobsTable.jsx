import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
  } from "@/components/ui/table";
  import { useSelector } from "react-redux";
  
  const AdminJobsTable = () => {
    const { adminJobs } = useSelector((store) => store.job);
    const jobsArray = Array.isArray(adminJobs) ? adminJobs : [adminJobs];
  
    return (
      
        <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg border border-gray-200 overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Title</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Description</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Salary</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Requirements</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Location</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Experience</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Job Type</TableHead>
                <TableHead className="text-sm font-bold text-gray-700 uppercase px-6 py-3">Position</TableHead>
              </TableRow>
            </TableHeader>
  
            <TableBody className="bg-white divide-y divide-gray-100">
              {jobsArray?.map((job, index) => (
                <TableRow
                  key={job?._id || index}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="px-6 py-4 text-sm font-medium text-gray-800">
                    {job?.title}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {job?.description}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-green-700 font-semibold">
                    ₹{job?.salary?.toLocaleString()}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-gray-700">
                    {job?.requirements}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job?.location}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job?.experienceLevel}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job?.jobType}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-sm text-center">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job?.position}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
  
    );
  };
  
  export default AdminJobsTable;
  