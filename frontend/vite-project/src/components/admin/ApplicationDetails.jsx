// src/components/admin/ApplicationDetails.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from 'lucide-react';
import { toast } from 'react-toastify';
import { Loader2 } from 'lucide-react';

const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusLoading, setStatusLoading] = useState(false);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/application/${applicationId}`, {
          withCredentials: true,
        });
        if (response.data.success) {
          setApplication(response.data.application);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to fetch application details');
      } finally {
        setLoading(false);
      }
    };
    fetchApplication();
  }, [applicationId]);

  const handleStatusChange = async (status) => {
    try {
      setStatusLoading(true);
      const response = await axios.post(
        `http://localhost:3000/api/application/status/${applicationId}`,
        { status },
        { withCredentials: true }
      );
      if (response.data.success) {
        setApplication({ ...application, status });
        toast.success('Status updated successfully');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-8 bg-gray-100 min-h-screen">
        <p className="text-xl text-gray-800">Application not found.</p>
        <Button
          onClick={() => navigate('/admin/applications')}
          variant="outline"
          className="mt-4 hover:bg-orange-50 hover:text-orange-600"
        >
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 px-6 py-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Application Details</h1>
        <Card className="shadow-xl border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Application Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Applicant Name</label>
                <p className="text-lg text-gray-800">{application.applicant?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Job Title</label>
                <p className="text-lg text-gray-800">{application.job?.title || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Company</label>
                <p className="text-lg text-gray-800">{application.job?.company?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Status</label>
                <Badge
                  variant={application.status === 'accepted' ? 'success' : application.status === 'rejected' ? 'destructive' : 'default'}
                  className="capitalize"
                >
                  {application.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Additional Details</label>
              <p className="text-gray-600">Email: {application.applicant?.email || 'N/A'}</p>
              <p className="text-gray-600">Phone: {application.applicant?.phoneNumber || 'N/A'}</p>
              <p className="text-gray-600">
                Applied On: {new Date(application.createdAt).toLocaleDateString() || 'N/A'}
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => handleStatusChange('accepted')}
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={application.status === 'accepted' || statusLoading}
              >
                {statusLoading && application.status === 'accepted' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Accept
              </Button>
              <Button
                onClick={() => handleStatusChange('rejected')}
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={application.status === 'rejected' || statusLoading}
              >
                {statusLoading && application.status === 'rejected' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Reject
              </Button>
              <Button
                onClick={() => handleStatusChange('pending')}
                className="bg-gray-500 hover:bg-gray-600 text-white"
                disabled={application.status === 'pending' || statusLoading}
              >
                {statusLoading && application.status === 'pending' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Set Pending
              </Button>
            </div>
            <Button
              onClick={() => navigate('/admin/applications')}
              variant="outline"
              className="hover:bg-orange-50 hover:text-orange-600"
            >
              Back to Applications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetails;