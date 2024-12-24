import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Login from "./components/Login";
import Register from "./components/Register";
import RoomList from "./components/RoomList";

const App = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      try {
        const decodedToken = jwtDecode(storedToken);
        setRole(decodedToken.role);
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  }, []);

  const handleSetToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    try {
      const decodedToken = jwtDecode(newToken);
      setRole(decodedToken.role);
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <div>
      <div className="flex flex-col gap-x-8 items-center justify-center">
        <h1 className="text-3xl font-bold text-center mb-6 mt-8">
          Hotel Room Booking
          {role && (
            <div>
              Hoşgeldin
              <span className="text-red-600">
                {" "}
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </span>
            </div>
          )}
        </h1>
        {token && (
          <button
            onClick={handleLogout}
            className="px-8 h-12 bg-indigo-600 text-white  rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Logout
          </button>
        )}
      </div>

      <div className="">
        {!token ? (
          <>
            <div>
              <Register />
            </div>
            <div>
              <Login setToken={handleSetToken} />
            </div>
          </>
        ) : (
          <>
            {/* <div>Başarıyla giriş yapıldı. </div> */}
            <div>
              <RoomList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
