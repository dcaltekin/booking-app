import Room from "../models/Room.js";

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching rooms" });
  }
};

export const updateRoom = async (req, res) => {
  const { roomId } = req.params;
  const { number, type, isAvailable } = req.body;
  try {
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    room.number = number || room.number;
    room.type = type || room.type;
    room.isAvailable =
      isAvailable !== undefined ? isAvailable : room.isAvailable;
    const updatedRoom = await room.save();

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error updating room:", error);
    res.status(500).json({ message: "Server error" });
  }
};
