import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,

  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { fetchAppliedJobs } from '@/redux/applicationSlice';

const AppliedJobs = () => {
  const dispatch = useDispatch();
  const { appliedJobs, loading, error } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(fetchAppliedJobs());
  }, [dispatch]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="w-[80%] mx-auto mt-8">
        <h1 className="text-2xl font-bold text-gray-800">Applied Jobs</h1>
        <Table className="shadow-md border-2">
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Job Role</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appliedJobs.length > 0 ? (
              appliedJobs.map((application) => (
                <TableRow key={application._id}>
                  <TableCell>
                    {application.createdAt
                      ? new Date(application.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell>{application.job?.title || 'N/A'}</TableCell>
                  <TableCell>{application.job?.company?.name || 'N/A'}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant="outline"
                      className={`capitalize ${
                        application.status === 'accepted'
                          ? 'bg-green-100 text-green-800 border-green-300'
                          : application.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                          : 'bg-red-100 text-red-800 border-red-300'
                      }`}
                    >
                      {application.status || 'N/A'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No jobs applied
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                Total Applications: {appliedJobs.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJobs;