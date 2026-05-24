const Product = require("../models/product.model");
const asyncHandler = require("../utils/asyncHandler");

const productFields =
  "productName description price images category petType stock status averageRating totalReviews createdAt";

const getHomePageData = asyncHandler(async (req, res) => {
  const availableQuery = { status: "available", stock: { $gt: 0 } };

  const [
    featuredProducts,
    latestProducts,
    topRatedProducts,
    categoryCounts,
    petTypeCounts,
    totalProducts,
    availableProducts,
  ] = await Promise.all([
    Product.find(availableQuery)
      .select(productFields)
      .sort({ totalReviews: -1, averageRating: -1, createdAt: -1 })
      .limit(4),
    Product.find(availableQuery)
      .select(productFields)
      .sort({ createdAt: -1 })
      .limit(8),
    Product.find({ ...availableQuery, totalReviews: { $gt: 0 } })
      .select(productFields)
      .sort({ averageRating: -1, totalReviews: -1 })
      .limit(4),
    Product.aggregate([
      { $match: availableQuery },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Product.aggregate([
      { $match: availableQuery },
      { $group: { _id: "$petType", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]),
    Product.countDocuments(),
    Product.countDocuments(availableQuery),
  ]);

  return res.status(200).json({
    success: true,
    message: "Home page data fetched successfully",
    stats: {
      totalProducts,
      availableProducts,
      categories: categoryCounts.length,
      petTypes: petTypeCounts.length,
    },
    categoryCounts: categoryCounts.map((item) => ({
      category: item._id || "other",
      count: item.count,
    })),
    petTypeCounts: petTypeCounts.map((item) => ({
      petType: item._id || "other",
      count: item.count,
    })),
    featuredProducts,
    latestProducts,
    topRatedProducts,
  });
});

module.exports = {
  getHomePageData,
};
