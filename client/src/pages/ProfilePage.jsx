import NavSideBar from "../components/NavSideBar";
import { Link } from 'react-router-dom';

function ProfilePage() {
    return (
        <div className="flex flex-row h-screen overflow-hidden">
            <NavSideBar />
            <div className="overflow-y-auto overflow-x-hidden w-full">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Profile</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Account Information</h2>
          <p className="text-gray-600"><strong>Username:</strong> [Username]</p>
          <p className="text-gray-600"><strong>Email:</strong> [Email]</p>
          {/* Add more account details as needed */}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Actions</h2>
          <ul className="list-none pl-0">
            <li className="mb-2">
              <Link to="/profile/edit" className="text-blue-500 hover:underline">Edit Profile</Link>
            </li>
            <li>
              <button onClick={() => console.log('Implement Logout')} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Logout</button>
            </li>
            {/* Add more actions/links as needed */}
          </ul>
        </div>

        
      </div>
            </div>
        </div>
    )
}

export default ProfilePage;