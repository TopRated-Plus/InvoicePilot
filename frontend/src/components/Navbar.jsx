import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link to="/dashboard" className="font-bold text-xl text-green-600">
          Payflo
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/dashboard" 
            className="text-sm text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          <Link 
            to="/bills" 
            className="text-sm text-gray-600 hover:text-gray-900">
            Bills
          </Link>
          <Link 
            to="/clients" 
            className="text-sm text-gray-600 hover:text-gray-900">
            Clients
          </Link>
          <Link 
            to="/settings" 
            className="text-sm text-gray-600 hover:text-gray-900">
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700">
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;