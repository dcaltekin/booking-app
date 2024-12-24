import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("user");
  const [editingRoom, setEditingRoom] = useState(null);
  const [editedRoomData, setEditedRoomData] = useState({
    number: "",
    type: "",
    isAvailable: true,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/rooms`)
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);
  const handleEdit = (room) => {
    setEditingRoom(room._id);
    setEditedRoomData({
      number: room.number,
      type: room.type,
      isAvailable: room.isAvailable,
    });
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedRoomData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveEdit = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/api/rooms/${editingRoom}`,
        editedRoomData
      )
      .then((response) => {
        setRooms(
          rooms.map((room) =>
            room._id === editingRoom ? { ...room, ...editedRoomData } : room
          )
        );
        setEditingRoom(null);
      })
      .catch((error) => {
        console.error("Error saving room update:", error);
      });
  };
  const handleCancelEdit = () => {
    setEditingRoom(null);
  };

  if (loading) {
    return <div className="text-center text-xl">Loading rooms...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Available Rooms</h2>
      {rooms.length === 0 ? (
        <p className="text-center text-lg">No rooms available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <div
              key={room._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 relative"
            >
              {role === "admin" && editingRoom !== room._id && (
                <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-blue-600"
                  onClick={() => handleEdit(room)}
                >
                  Edit
                </button>
              )}
              {editingRoom === room._id ? (
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    Edit Room {room.number}
                  </h3>
                  <div className="mb-4">
                    <label htmlFor="number" className="block text-gray-700">
                      Room Number
                    </label>
                    <input
                      id="number"
                      name="number"
                      type="text"
                      value={editedRoomData.number}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700">
                      Room Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={editedRoomData.type}
                      onChange={handleChange}
                      className="w-full mt-2 p-2 border border-gray-300 rounded"
                    >
                      <option value="Basic">Basic</option>
                      <option value="Premium">Premium</option>
                      <option value="Suite">Suite</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="isAvailable"
                      className="block text-gray-700"
                    >
                      Available
                    </label>
                    <input
                      id="isAvailable"
                      name="isAvailable"
                      type="checkbox"
                      checked={editedRoomData.isAvailable}
                      onChange={handleChange}
                      className="mt-2"
                    />
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    Room {room.number}
                  </h3>
                  <p className="text-lg text-gray-600 mb-2">
                    Type: {room.type}
                  </p>
                  <p
                    className={`text-lg font-semibold mb-4 ${
                      room.isAvailable ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    Status: {room.isAvailable ? "Available" : "Not Available"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Added on: {new Date(room.createdAt).toLocaleDateString()}
                  </p>

                  {room.isAvailable ? (
                    <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                      Reserve
                    </button>
                  ) : (
                    <button
                      className="mt-4 w-full bg-blue-200 text-white py-2 rounded"
                      disabled
                    >
                      Not Available
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
