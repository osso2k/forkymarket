import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface User {
  userID: string;
  username: string;
  createdAt: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const faves = ["BTC", "ETH", "XRP", "ADA", "BNB"]
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
    <div className=" w-full flex justify-center pt-16">
      <div className="shadow-md shadow-mauve-700 rounded w-[80%] p-8">
      <div className="w-full mb-10 flex justify-between">
        <FaUser className="h-20 w-20 text-mauve-700 ml-6" />
        <button className="border rounded px-4 py-2 h-10 my-auto cursor-pointer bg-mauve-700 hover:opacity-80" onClick={logout}>Logout</button>
      </div>
        <div className="w-full flex justify-between">
        <h1 className="text-2xl">{user.username}</h1>
        </div>
        <p className="text-zinc-400 mt-2 font-sans mb-5">
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[70%] gap-3 mx-auto ">
          {faves.map((f, idx) => (
            <div key={idx} className="px-4 py-2 text-center text-2xl shadow-md shadow-mauve-600 rounded">
              <p>{f}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;