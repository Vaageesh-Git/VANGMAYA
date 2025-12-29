const express = require('express');
const authRoutes = require('./routes/auth.routes')

const app = express();
const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json())
app.use('/api/auth', authRoutes);

module.exports = app;