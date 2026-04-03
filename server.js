const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve front-end
app.use(express.static(path.join(__dirname, "public")));

// Proxy endpoint for Browser tab
app.use("/proxy", createProxyMiddleware({
  changeOrigin: true,
  router: req => req.query.url,
  pathRewrite: (path, req) => ""
}));

app.listen(PORT, () => console.log(`Game Hub running on port ${PORT}`));