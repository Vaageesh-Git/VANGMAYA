const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cookieParser = require("cookie-parser");

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/product',productRoutes);

module.exports = app;