const Spend = require("../models/Spend");
const moment = require("moment");

module.exports = {
  async store(req, res) {
    const { name, category, value, local, date, user } = req.body;

    try {
      const spend = await Spend.create({
        name,
        category,
        value,
        local,
        date: moment(date).format("YYYY-MM-DD[T00:00:00.000Z]"),
        user
      });

      return res.json({ spend });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  },
  async index(req, res) {
    try {
      const spends = await Spend.find().populate("user");

      if (spends) return res.json({ response: spends });
      else throw { messge: "You don't have any spends yet" };
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  },

  async delete(req, res) {
    const _id = req.params.id;
    console.log(_id);

    try {
      const spend = await Spend.deleteOne({ _id }, function(error) {});
      return res.send(spend);
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  }
};
