"use strict";
const Spend = require("../models/Spend");
const moment = require("moment");
class SpendController {
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
                user: _id,
            });
            return res.json({ spend });
        }
        catch (error) {
            return res.status(400).send({ error: error.message || error });
        }
    }
    async index(req, res) {
        try {
            const { _id } = req.user;
            const { currentMonth } = req.query;
            let spends;
            if (currentMonth) {
                spends = await Spend.aggregate([
                    { $addFields: { month: { $month: "$date" } } },
                    { $match: { month: Number(currentMonth) } },
                    { $sort: { date: -1 } },
                ]);
            }
            else {
                spends = await Spend.find({ user: _id })
                    .sort({ date: -1 })
                    .populate("user");
            }
            if (spends)
                return res.json({ response: spends });
            else
                throw { messge: "You don't have any spends yet" };
        }
        catch (error) {
            return res.status(400).json({ error: error.message || error });
        }
    }
    async delete(req, res) {
        const _id = req.params.id;
        console.log(_id);
        try {
            const spend = await Spend.deleteOne({ _id }, function (error) { });
            return res.send(spend);
        }
        catch (error) {
            return res.status(400).json({ error: error.message || error });
        }
    }
}
module.exports = new SpendController();
