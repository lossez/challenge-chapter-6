module.exports = {
  login: function (req, res) {
    res.render("auth/login");
  },
  loginPost: function (req, res) {
    const { username, password } = req.body;
    console.log("dari controllers", username, password);
    if (username === "admin" && password === "admin") {
      res.status(200).json({
        message: "Login success",
      });
    } else {
      res.status(401).json({
        message: "Login failed",
      });
    }
  },
};
