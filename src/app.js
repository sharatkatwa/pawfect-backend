const express = require("express");
const dbConnect = require("./config/db");
const User = require("./models/user.model");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiError = require("./utils/apiError");

const app = express();

// router import
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const cartRouter = require("./routes/cartRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");
const adminRouter = require("./routes/adminRoutes");
const homeRouter = require("./routes/homeRoutes");

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

dbConnect();

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/home", homeRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/admin", adminRouter);

app.use((req, res, next) => {
  next(new apiError(404, `Route not found: ${req.originalUrl}`));
});


app.use((error, req, res, next) => {
  const statusCode = error instanceof apiError ? error.statusCode : 500;
  res
    .status(statusCode)
    .json({ message: error.message || "internal server error" });
});
module.exports = app;
