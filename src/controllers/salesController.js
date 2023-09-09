const Sale = require("../models/SalesModel");

const getTotalRevenue = async (req, res) => {
  try {
    const totalRevenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);
    res.json(totalRevenue);
  } catch (error) {
    res.status(404).json({ error: "Failed to get total revenue" });
  }
};

const getQuantityByProduct = async (req, res) => {
  try {
    const quantityByProduct = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    res.json(quantityByProduct);
  } catch (error) {
    res.status(404).json({ error: "Failed to get total quantity" });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const topProducts = await Sale.aggregate([
      {
        $group: {
          _id: "$product",
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(404).json({ error: "failed to get top product" });
  }
};

const getAveragePrice = async (req, res) => {
  try {
    const averagePrice = await Sale.aggregate([
      {
        $group: {
          _id: null,
          averagePrice: { $avg: "$price" },
        },
      },
    ]);

    res.json(averagePrice[0]); // Extract the result from the array
  } catch (error) {
    res.status(404).json({ error: "failed to get average price" });
  }
};

const getRevenueByMonth = async (req, res) => {
  try {
    const revenueByMonth = await Sale.aggregate([
      {
        $project: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          totalRevenue: { $multiply: ["$quantity", "$price"] },
        },
      },
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalRevenue: { $sum: "$totalRevenue" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
    ]);

    res.json(revenueByMonth);
  } catch (error) {
    res.status(404).json({ error: "failed to get revenue by Month " });
  }
};

const getHighestQuantitySold = async (req, res) => {
  try {
    const highestQuantitySold = await Sale.aggregate([
      {
        $group: {
          _id: { product: "$product", date: "$date" },
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          product: "$_id.product",
          totalQuantity: 1,
        },
      },
    ]);

    res.json(highestQuantitySold[0]); // Extract the result from the array
  } catch (error) {
    res.status(404).json({ error: "failed to get highest quantity sold" });
  }
};

module.exports = {
  getTotalRevenue,
  getQuantityByProduct,
  getTopProducts,
  getAveragePrice,
  getRevenueByMonth,
  getHighestQuantitySold,
};