const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = 8000;

// Middleware'ler
app.use(cors());
app.use(express.json());

// Mikroservis yönlendirmeleri
app.use(
  "/customer",
  createProxyMiddleware({ target: "http://localhost:8001", changeOrigin: true })
);
app.use(
  "/employee",
  createProxyMiddleware({ target: "http://localhost:8002", changeOrigin: true })
);
app.use(
  "/management",
  createProxyMiddleware({ target: "http://localhost:8003", changeOrigin: true })
);

// Test endpointi
app.get("/", (req, res) => {
  res.send("Gateway is running on Port 8000");
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Gateway is running on Port ${PORT}`);
});
