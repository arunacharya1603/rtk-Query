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
  const { data: searchResults } = useSearchUsersQuery(searchTerm, {
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

  const displayUsers = searchTerm ? searchResults : users;

  return (
    <div>
      {isLoading && <h3>Loading...</h3>}
      {isError && <h3>Error fetching users.</h3>}
      <ul>
        {(displayUsers?.slice().reverse() || []).map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
        <br />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </>
    </div>
  );
};

export default User;
