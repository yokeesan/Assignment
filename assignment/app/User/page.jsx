"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Page = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://api.github.com/users");
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-10 py-10">
      <h1 className="text-center font-extrabold text-3xl py-4">Users</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:grid-cols-2">
        {users.map((item, index) => {
          return (
            <div key={index} className="p-4 border rounded-lg">
              <div className='flex justify-between '>
                <div>
                  <h2 className='font-semibold'>{item.login}</h2>
                  <p className='text-sm'>ID: {item.id}</p>
                  <p className='text-sm'>Node ID: {item.node_id}</p>
                </div>
                <div className=''>
                  <img
                    src={item.avatar_url}
                    alt={`${item.login}'s avatar`}
                    width="100"
                    className='border rounded-[800px]'
                  />
                </div>
              </div>
              <a
                href={item.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-bold underline text-sm"
              >
                GitHub Profile
              </a>
              <p>
                <a
                  href={item.followers_url}
                  target="_blank"
                  rel="Followers"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  Followers
                </a>
              </p>
              <p>
                <a
                  href={item.following_url}
                  target="_blank"
                  rel="Following"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  Following
                </a>
              </p>
              <p>
                <a
                  href={item.gists_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  Gists
                </a>
              </p>
              <p>
                <a
                  href={item.subscriptions_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  Subscriptions
                </a>
              </p>
              <p>
                <a
                  href={item.organizations_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  {" "}
                  Starred_url
                </a>
              </p>
              <p>
                <a
                  href={item.events_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  {" "}
                  Subscriptions
                </a>
              </p>
              <p>
                <a
                  href={item.repos_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  {" "}
                  Organizations
                </a>
              </p>
              <p>
                <a
                  href={item.received_events_url}
                  target="_blank"
                  rel="Gists"
                  className="text-blue-700 font-bold underline text-sm"
                >
                  {" "}
                  Repos
                </a>
              </p>
              <p>Type: {item.type}</p>
              {item.site_admin && (
                <span className="inline-block bg-yellow-500 text-white text-xs font-bold px-2 rounded mt-2">
                  Site Admin
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
