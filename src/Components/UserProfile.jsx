import React, { useContext, useState } from 'react';
import { updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import toast from 'react-hot-toast';
import { AuthContext } from '../Provider/AuthProvider';
import Loading from './Loading';
import UseRole from './Hooks/Userole';
import { auth } from '../firebase/firebase.config';

const UserProfile = () => {
    const { user } = useContext(AuthContext);
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [loading, setLoading] = useState(false);
    const [role, isRoleLoading] = UseRole();

    const handleUpdate = (e) => {
        e.preventDefault();
        setLoading(true);

        updateProfile(user, { displayName: name, photoURL })
            .then(() => {
                toast.success('Profile updated successfully ✅');
                setShowForm(false);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleChangePassword = () => {
        if (!user?.email) {
            toast.error('No email found for this user!');
            return;
        }

        sendPasswordResetEmail(auth, user.email)
            .then(() => {
                toast.success('Password reset email sent! 📧');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="w-11/12 max-w-md mx-auto mt-10 mb-10">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative h-32">
                    <img
                        src="https://i.imgur.com/TflM6tr.jpeg"
                        alt="Cover"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="relative -mt-16 flex justify-center">
                    <img
                        src={user?.photoURL || "https://i.ibb.co/2FsfXqM/default-avatar.png"}
                        alt="User Avatar"
                        className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
                    />
                </div>
                <div className="m-2 rounded-2xl">
                    <p className='p-2 text-center w-1/2 mx-auto font-bold bg-orange-200'>
                            {isRoleLoading ? 'Loading...' : role || 'User'}
                        </p>
                </div>

                <div className="px-6 pb-6">
                    <div className="flex flex-col items-center mb-4">
                        <h2 className="text-2xl font-bold text-slate-900">
                            User Name : {user?.displayName || "Anonymous User"}
                        </h2>
                        <p className="text-gray-600">
                            User Email : {user?.email || "No email available"}
                        </p>
                        
                    </div>

                    <div className="flex flex-col gap-3 mb-4">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="btn bg-[#FFAA6E] rounded-xl w-full"
                        >
                            {showForm ? "Cancel" : "Update Profile"}
                        </button>
                        <button
                            onClick={handleChangePassword}
                            className="btn btn-outline btn-secondary rounded-xl w-full"
                        >
                            Change Password
                        </button>
                    </div>

                    {showForm && (
                        <form onSubmit={handleUpdate} className="space-y-3">
                            <input
                                type="text"
                                placeholder="Enter new name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <input
                                type="text"
                                placeholder="Enter new image URL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="input input-bordered w-full"
                            />
                            <button type="submit" className="btn btn-neutral w-full">
                                Save Changes
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
