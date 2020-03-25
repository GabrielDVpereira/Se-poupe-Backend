const Spend = require("../models/Spend");
const moment = require("moment");

module.exports = {
  async store(req, res) {
    const { name, category, value, local, date } = req.body;
    const { _id } = req.user;
    try {
      const spend = await Spend.create({
        name,
        category,
        value,
        local,
        date: moment(date).format("YYYY-MM-DD[T00:00:00.000Z]"),
        user: _id
      });
      console.log(spend);
      return res.json({ spend });
    } catch (error) {
      return res.status(400).send({ error: error.message || error });
    }
  },
  async index(req, res) {
    try {
      const { _id } = req.user;
      const { current } = req.query;
      const curretMonth = moment().format("YYYY-MM");
      let spends;

      // if (current)
      //   spends = await Spend.find({
      //     user: _id,
      //     date: { $in: curretMonth }
      //   })
      //     .sort({ date: -1 })
      //     .populate("user");

      spends = await Spend.find({ user: _id })
        .sort({ date: -1 })
        .populate("user");

      const recordsByDate = await Spend.find({
        date: {
          $where: "moment(this.date).format('MM') === 3"
        }
      });

      console.log(recordsByDate);

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
