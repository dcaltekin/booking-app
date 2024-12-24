import Reservation from "../models/Reservation.js";
import Room from "../models/Room.js";

export const createReservation = async (req, res) => {
  const { room, startDate, endDate } = req.body;

  try {
    const existingRoom = await Room.findById(room);
    if (!existingRoom) {
      return res.status(404).json({ message: "Room not found" });
    }
    if (!existingRoom.isAvailable) {
      return res.status(400).json({ message: "Room is not available" });
    }
    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "Start date and End date are required." });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res
        .status(400)
        .json({ message: "Start date must be before end date." });
    }
    const reservation = new Reservation({
      room,
      startDate,
      endDate,
    });
    await reservation.save();
    existingRoom.isAvailable = false;
    await existingRoom.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res
      .status(500)
      .json({ message: "Error creating reservation", error: error.message });
  }
};
