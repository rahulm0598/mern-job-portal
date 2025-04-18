import React, { useState } from 'react';
import { Edit, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import AppliedJobs from './AppliedJobs';
import UpdateProfileModel from './UpdateProfileModel';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react'; // For loading spinner

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setisOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-600" />
      </div>
    );
  }

  return (
    <div className="my-8 w-full px-4 sm:px-6 lg:px-8">
      <div className="p-6 rounded-xl shadow-lg border border-gray-200 max-w-4xl mx-auto bg-white transition-all duration-300">
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-6">
          <img
            src={user.profile?.profilePhoto || '/default-avatar.png'}
            alt="Profile"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-orange-500"
          />
          <div className="flex-1">
            <h1 className="text-gray-900 font-bold text-2xl sm:text-3xl">{user?.name}</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-2">{user?.profile?.bio || 'No bio available'}</p>

            <div className="mt-4 flex items-center gap-3 text-gray-700 text-sm sm:text-base">
              <Mail className="w-5 h-5 text-orange-600" />
              <span>{user?.email}</span>
            </div>

            <div className="mt-2 flex items-center gap-3 text-gray-700 text-sm sm:text-base">
              <Phone className="w-5 h-5 text-orange-600" />
              <span>{user?.phoneNumber || 'No phone number'}</span>
            </div>
          </div>

          {/* Edit Icon */}
          <button
            onClick={() => setisOpen(true)}
            aria-label="Edit Profile"
            className="self-start p-2 rounded-full hover:bg-orange-100 transition-colors"
          >
            <Edit className="w-5 h-5 text-orange-600 hover:text-orange-800" />
          </button>
        </div>

        {/* Skills Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {user?.profile?.skills && user.profile.skills.length > 0 ? (
              user.profile.skills.map((item, index) => (
                <Badge
                  key={index}
                  className="bg-orange-500 text-white px-3 py-1 text-sm font-medium hover:bg-orange-600 transition-colors"
                >
                  {item}
                </Badge>
              ))
            ) : (
              <p className="text-gray-500 italic">No skills added</p>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900">Resume</h2>
          {user?.profile?.resume ? (
            <a
              href={`${user.profile.resume}?format=pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 font-medium hover:underline text-sm sm:text-base"
            >
              {user.profile.resumeName || 'View Resume'}
            </a>
          ) : (
            <p className="text-gray-500 italic">No resume uploaded</p>
          )}
        </div>
      </div>

      {/* Applied Jobs Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Applied Jobs</h2>
        <AppliedJobs />
      </div>

      {/* Profile Modal */}
      <UpdateProfileModel open={open} setisOpen={setisOpen} />
    </div>
  );
};

export default Profile;