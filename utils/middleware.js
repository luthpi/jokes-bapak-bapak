const auth = (req, res, next) => {
  if (req.query.key == process.env.KEY) {
    next();
  } else {
    res.json({
      status: "Dilarang",
      message:
        "Authentication key diperlukan! silahkan cek README di github luthpai/jokes-bapak-bapak",
    });
  }
};

export default auth;
