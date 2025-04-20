import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'react-toastify';
import { Loader2, FileText, ArrowLeft } from 'lucide-react';

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
        console.log('Fetching application with ID:', applicationId);
        const response = await axios.get(`http://localhost:3000/api/application/${applicationId}`, {
          withCredentials: true,
        });
        console.log('API Response:', response.data);
        if (response.data.success) {
          setApplication(response.data.application);
        } else {
          toast.error(response.data.message || 'Failed to fetch application');
        }
      } catch (error) {
        console.error('Fetch error:', error.response?.data || error.message);
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
      const response = await axios.put(
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
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <p className="text-2xl font-semibold text-gray-800 mb-4">Application not found</p>
        <Button
          onClick={() => navigate('/admin/applications')}
          variant="outline"
          className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-50 transition-colors duration-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
          <Button
            onClick={() => navigate('/admin/applications')}
            variant="ghost"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors duration-300"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </Button>
        </div>
        <Card className="bg-white shadow-2xl rounded-xl overflow-hidden border-none">
          <CardHeader className="bg-gray-50 border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-gray-900">Application Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Applicant Name</label>
                <p className="text-lg font-semibold text-gray-900">{application.applicant?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Job Title</label>
                <p className="text-lg font-semibold text-gray-900">{application.job?.title || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Company</label>
                <p className="text-lg font-semibold text-gray-900">{application.job?.company?.name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <Badge
                  variant={
                    application.status === 'accepted'
                      ? 'success'
                      : application.status === 'rejected'
                      ? 'destructive'
                      : 'default'
                  }
                  className="capitalize px-3 py-1 text-sm font-medium"
                >
                  {application.status}
                </Badge>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Additional Details</label>
              <div className="mt-2 space-y-2 text-gray-700">
                <p>Email: {application.applicant?.email || 'N/A'}</p>
                <p>Phone: {application.applicant?.phoneNumber || 'N/A'}</p>
                <p>Applied On: {new Date(application.createdAt).toLocaleDateString() || 'N/A'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Resume</label>
              <div className="mt-2">
                {application.applicant?.profile?.resume ? (
                  <Button
                    variant="outline"
                    asChild
                    className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-300"
                  >
                    <a
                      href={application.applicant.profile.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="h-5 w-5" />
                      {application.applicant.profile.resumeName || 'View Resume'}
                    </a>
                  </Button>
                ) : (
                  <p className="text-gray-500">No resume uploaded</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => handleStatusChange('accepted')}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium transition-all duration-300"
                disabled={application.status === 'accepted' || statusLoading}
              >
                {statusLoading && application.status === 'accepted' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Accept
              </Button>
              <Button
                onClick={() => handleStatusChange('rejected')}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-300"
                disabled={application.status === 'rejected' || statusLoading}
              >
                {statusLoading && application.status === 'rejected' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Reject
              </Button>
              <Button
                onClick={() => handleStatusChange('pending')}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium transition-all duration-300"
                disabled={application.status === 'pending' || statusLoading}
              >
                {statusLoading && application.status === 'pending' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                Set Pending
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationDetails;