const TomatoData = require("../../models/TomatoData");

const GetData = async (req, res) => {
  try {
    const { selectedOption } = req.query;

    if (!selectedOption) {
      return res.status(400).json({ error: "Selected option is required." });
    }

    // Query your MongoDB collection for data based on the selected option
    const tomatoData = await TomatoData.find({ selectedOption });
    // console.log(tomatoData);

    res.status(200).json(tomatoData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = GetData;
