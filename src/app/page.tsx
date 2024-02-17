"use client";

import { useState, useEffect } from 'react';

type User = {
  id: number;
  username: string;
};

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8080/users/')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
  }, []);

  if (isLoading) return <p className="text-center text-blue-500 font-semibold">
    Loading...
  </p>;

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-800 rounded-lg">
      <h1 className="text-3xl font-bold text-blue-300 mb-4 text-center">Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-400 text-center">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-gray-200">
            <thead className="text-gray-400 bg-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Username</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-700">
                  <td className="px-4 py-2 font-bold">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
