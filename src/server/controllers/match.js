// import Match from "../domain/match.js";
// const { prisma } = require("@prisma/client");
const { Match } = require("../domain/match");
const { Room } = require("../domain/room");

const getMatch = async (req, res) => {
  const { loggedUserId, userId } = req.params;
  try {
    const matchExists = await Match.findMatch(loggedUserId, userId);
    if (!matchExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "match doesn't exist" });
    }
    return res.status(201).json({ status: "success", match: matchExists });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to get user" });
  }
};

const createMatch = async (req, res) => {
  const { userId, userIdToMatch } = req.params;
  try {
    const matchExists = await Match.findMatch(userId, userIdToMatch);
    if (matchExists) {
      return res
        .status(400)
        .json({ status: "failed", message: "user A already matched user B" });
    }
    const match = await Match.matchUsers(userId, userIdToMatch);

    const userBLikesUserA = await Match.findMatch(userIdToMatch, userId);
    if (userBLikesUserA) {
      const room = await Room.createRoom(userId, userIdToMatch);
      const updatedRoom = await Room.assignRoom(room, userId, userIdToMatch);
    }
    return res.status(201).json({ status: "success", match: match });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to get user" });
  }
};

const removeMatch = async (req, res) => {
  const { userId, idToUnmatch } = req.params;
  try {
    const removedMatches = await Match.removeMatch(userId, idToUnmatch);
    return res.status(201).json({
      status: "success",
      match: removedMatches,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to get user" });
  }
};
const getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAllMatches();

    return res.status(201).json({ matches: matches });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Unable to send the message" });
  }
};

module.exports = { createMatch, removeMatch, getMatch, getAllMatches };
