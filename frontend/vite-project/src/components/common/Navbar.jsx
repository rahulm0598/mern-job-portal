// Navbar.jsx
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { setLoading, setUser } from '@/redux/authSlice';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logouthandler = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('http://localhost:3000/api/user/logout', {
        withCredentials: true,
      });

      if (response.data.success) {
        dispatch(setUser(null));
        toast.success('You have been logged out successfully');
        navigate('/login');
      }
    } catch (error) {
      console.log("error in logout", error);
      toast.error('Something went wrong during logout');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <header className="bg-white border-b shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-3xl font-bold text-orange-600">
          Jobify
        </Link>
        <nav className="hidden md:flex gap-6 text-gray-800 text-sm font-medium">
          <ul className="flex items-center gap-6">
            {user?.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Companies
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Jobs
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/applications"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Applications
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/home"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Home
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Jobs
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/explore"
                    className="hover:text-orange-600 transition duration-200 relative group"
                  >
                    Explore
                    <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-orange-600 transition-all group-hover:w-full"></span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {/* Auth Buttons or Avatar */}
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="outline" className="hover:bg-orange-50 hover:text-orange-600">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-orange-600 text-white hover:bg-orange-700">
                  Signup
                </Button>
              </Link>
            </>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar className="w-10 h-10 border-2 border-orange-500">
                    <AvatarImage
                      src={typeof user.profile === 'string' ? user.profile : user.profile?.profilePhoto || 'https://github.com/shadcn.png'}
                      alt="User Avatar"
                      className="object-cover"
                    />
                  </Avatar>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-64 mt-2 shadow-xl border rounded-lg">
                <h2 className="text-base font-semibold text-gray-800">{user.name}</h2>
                <p className="text-sm text-gray-500 mb-4 truncate">{user?.profile?.bio || "No bio available."}</p>
                <div className="flex flex-col gap-2">
                  {user?.role === "student" && (
                    <Link to="/profile">
                      <Button variant="ghost" className="justify-start w-full px-2 hover:bg-orange-50">
                        Profile
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={logouthandler}
                    variant="destructive"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;