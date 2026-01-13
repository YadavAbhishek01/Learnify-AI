// src/pages/Profile.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Authcontext } from '../context/Authcontext';
import { PdfContext } from '../context/Pdfcontext';

const Profile = () => {
  const { authUser, logoutUser ,UpdateProfile,loading} = useContext(Authcontext);
  const {pdfdata,allcard}=useContext(PdfContext)
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    profile_pic: '',
    documentsCount: 0,
    flashcardsCount: 0,
    quizzesCount: 0
  });
  useEffect(() => {
    if (authUser) {
      setUserData({
        name: authUser.name || '',
        email: authUser.email || '',
        profile_pic: authUser.profile_pic || '',
        documentsCount: authUser.documentsCount || 12,
        flashcardsCount: authUser.flashcardsCount || 156,
        quizzesCount: authUser.quizzesCount || 23
      });
    }
  }, [authUser]);
  const handleSave = async () => {
  const formdata=new FormData();

  formdata.append("name",userData.name);
  formdata.append("email",userData.email);
  if(userData.profile_pic)
  {
    formdata.append("file",userData.profile_pic);
  }
  UpdateProfile(formdata)
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="text-gray-600 mt-1">Manage your account settings</p>
          </div>
          <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-2.5 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            {editMode ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="shrink-0">
              <div className="relative group">
                <div className="w-28 h-28 bg-linear-to-br from-emerald-400 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-200">
                  {userData.profile_pic ? (
                    <img src={userData.profile_pic} alt="Avatar" className="w-28 h-28 rounded-3xl object-cover" />
                  ) : (
                    <span className="text-3xl text-white font-bold">👤</span>
                  )}
                </div>
                {editMode && (
                  <label className="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-lg cursor-pointer hover:bg-emerald-600 transition-colors">
                    📷
                    <input type="file" className="hidden" accept="image/*" onChange={(e)=>setUserData({...userData,profile_pic:e.target.files[0]})} />
                  </label>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {editMode ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({...userData, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-emerald-500 outline-none text-3xl font-bold text-gray-900 px-2 py-1"
                  />
                ) : (
                  userData.name
                )}
              </h2>
              {editMode ? (
                  <input
                    type="text"
                    value={userData.email}
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-gray-200 focus:border-emerald-500 outline-none text-3xl font-bold text-gray-900 px-2 py-1"
                  />
                ) : (
                  userData.email
                )}
              {/* <p className="text-gray-500 text-lg mb-1">{userData.email}</p> */}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📄</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{pdfdata.length}</p>
            <p className="text-sm text-gray-500 mt-1">Documents</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">{allcard.length}</p>
            <p className="text-sm text-gray-500 mt-1">Flashcards</p>
          </div>
          <div className="bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🧪</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">0</p>
            <p className="text-sm text-gray-500 mt-1">Quizzes</p>
          </div>
        </div>

        {/* Action Buttons */}
        {editMode && (
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-8 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <button className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></button>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex-1 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 py-4 px-8 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Danger Zone */}
        <div className="bg-linear-to-r from-red-50 to-pink-50 rounded-3xl p-8 border border-red-100">
          <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span>
            Danger Zone
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-6 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2">
              Delete Account
            </button>
            {/* <button
              onClick={()=>logoutUser()}
              className="flex-1 bg-white border-2 border-red-200 hover:border-red-300 text-red-700 py-3 px-6 rounded-2xl font-medium hover:bg-red-50 transition-all duration-200"
            >
              Logout
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
