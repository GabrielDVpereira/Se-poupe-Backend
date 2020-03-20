const Spend = require("../models/Spend");

module.exports = {
  async store(req, res) {
    const { name, category, value, local, date } = (requestData = req.body);
    console.log(requestData);

    try {
      const spend = await Spend.create({
        name,
        category,
        value,
        local,
        date
      });

      return res.json({ response: spend });
    } catch (error) {
      return res.status(400).json({ error: error.message || error });
    }
  },
  async index(req, res) {
    try {
      const spends = await Spend.find();

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
