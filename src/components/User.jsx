import React, { useState } from "react";
import {
  useGetUsersQuery,
  useAddUsersMutation,
  useDeleteUserMutation,
  useSearchUsersQuery,
} from "../RTK/userApi";

const User = () => {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();
  const [addUser] = useAddUsersMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState("");
  const { data: searchResults, isFetching: isSearching } = useSearchUsersQuery(searchTerm, {
    skip: !searchTerm, // Skip the query if searchTerm is empty
  });
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  const handleAddUser = async () => {
    try {
      await addUser(newUser).unwrap();
      setNewUser({ name: "", email: "" });
      refetch(); // Reset form after adding user
    } catch (error) {
      console.error("Failed to add user: ", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete user: ", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Determine which users to display
  const displayUsers = searchTerm ? searchResults : users;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-5 text-center text-gray-700">
          User Management
        </h2>

        {isLoading && <h3 className="text-center text-gray-500">Loading...</h3>}
        {isError && (
          <h3 className="text-center text-red-500">Error fetching users.</h3>
        )}

        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full mb-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
        />

        {/* Display search error message if no results found */}
        {searchTerm && !isSearching && searchResults?.length === 0 && (
          <h3 className="text-center text-red-500">No users found matching "{searchTerm}".</h3>
        )}

        <ul className="space-y-3">
          {(displayUsers?.slice().reverse() || []).map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-md shadow-sm"
            >
              <span>
                {user.name} - {user.email}
              </span>
              <button
                onClick={() => handleDeleteUser(user.id)}
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full mb-3 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-400"
          />
          <button
            onClick={handleAddUser}
            className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
