const { Reject } = require("../domain/rejected");

const rejectUser = async (req, res) => {
  try {
    const { userId, userToReject } = req.params;
    console.log("IM HERE");
    const reject = await Reject.createRejection(userId, userToReject);
    return res.status(201).json({ status: "success", rejection: reject });
  } catch (e) {
    return res.status(500).json({ message: "Unable to reject user" });
  }
};

const getRejections = async (req, res) => {
  try {
    const rejections = await Reject.findRejections();
    return res.status(201).json({ status: "success", rejections: rejections });
  } catch (e) {
    return res.status(500).json({ message: "Unable to reject user" });
  }
};

module.exports = { rejectUser, getRejections };
