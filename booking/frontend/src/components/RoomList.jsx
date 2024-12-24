import React, { useEffect, useState } from "react";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/rooms")
      .then((response) => {
        setRooms(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      });
  }, []);

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
              key={room.number}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Room {room.number}</h3>
                <p className="text-lg text-gray-600 mb-2">Type: {room.type}</p>
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoomList;
