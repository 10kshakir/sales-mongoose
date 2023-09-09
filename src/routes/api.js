const express = require("express");
const {
  getTotalRevenue,
  getQuantityByProduct,
  getAveragePrice,
  getTopProducts,
  getRevenueByMonth,
  getHighestQuantitySold,
} = require("../controllers/salesController");

const router = express.Router();


router.get("/total-revenue", getTotalRevenue);


router.get("/quantity-by-product", getQuantityByProduct);

router.get("/top-products", getTopProducts);

router.get("/average-price", getAveragePrice);

router.get("/revenue-by-month", getRevenueByMonth);

router.get("/highest-quantity-sold", getHighestQuantitySold);

module.exports = router;