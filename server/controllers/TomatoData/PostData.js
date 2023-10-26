const TomatoData = require("../../models/TomatoData");
const PostData = async (req, res) => {
  try {
    const {
      name,
      phoneNumber,
      todaydate,
      weight,
      selectedOption,
      price,
      currentTime,
    } = req.body;

    if (
      !name ||
      !phoneNumber ||
      !todaydate ||
      !weight ||
      !selectedOption ||
      !price
    ) {
      return res
        .status(422)
        .json({ error: "Please fill in all the fields properly." });
    }
    // Create a new instance of the TomatoData model
    const dateOnly = todaydate.split("T")[0];

    const tomatoData = new TomatoData({
      name,
      phoneNumber,
      todaydate: dateOnly,
      weight,
      selectedOption,
      price,
      currentTime,
    });

    // Save the data to the MongoDB collection
    await tomatoData.save();

    res.status(200).json({ message: "Tomato data submitted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = PostData;
