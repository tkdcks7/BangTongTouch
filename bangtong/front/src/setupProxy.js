const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/vworld",
    createProxyMiddleware({
      target: "https://api.vworld.kr",
      changeOrigin: true,
      pathRewrite: {
        "^/vworld": "",
      },
    })
  );
  app.use(
    "/naver",
    createProxyMiddleware({
      target: "https://naveropenapi.apigw.ntruss.com",
      changeOrigin: true,
      pathRewrite: {
        "^/naver": "",
      },
      onProxyReq: (proxyReq, req, res) => {
        console.log(`Proxying request: ${req.url}`);
      },
    })
  );
};
