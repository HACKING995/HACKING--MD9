module.exports = {
  apps: [
    {
      name: "web",
      script: "web.js",
      autorestart: true
    },
    {
      name: "hacking-md-bot",
      script: "index.js",
      autorestart: true
    }
  ]
};
