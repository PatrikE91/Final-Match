const { Room } = require("../domain/room");

const getRoomByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const rooms = await Room.findRoomByUserId(userId);
    return res.status(201).json({ rooms: rooms });
  } catch (e) {
    console.error(e);

    return res.status(500).json({ message: "Unable to get user" });
  }
};

const deleteRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const deletedRoom = await Room.deleteRoom(roomId);
    if(!deletedRoom){
      return res.status(400).json({ message: 'no room deleted' });

    }
    return res.status(201).json({ rooms: deletedRoom });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to get user" });
  }
};

module.exports = { getRoomByUserId, deleteRoomById };
