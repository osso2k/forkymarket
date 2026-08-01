import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  userID: string;
  username: string;
  createdAt: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-zinc-400">No profile data found.</p>
      </div>
    );
  }
  const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    navigate("/login")

  }

  return (
    <div className="min-h-screen w-full flex justify-center pt-16">
      <div className="shadow-md shadow-mauve-700 rounded h-[60%] w-[80%] p-8">
        <div className="w-full flex justify-between">
        <h1 className="text-2xl">{user.username}</h1>
        <button className="border rounded px-4 py-2 cursor-pointer bg-mauve-700 hover:opacity-80" onClick={logout}>Logout</button>
        </div>
        <p className="text-zinc-400 mt-2 font-sans">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default Profile;