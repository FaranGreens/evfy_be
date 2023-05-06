const auth_route = require("express").Router();
const {
  registerUser,
  loginUser,
  resetLink,
  showResetPage,
  resetPassword,
} = require("../controllers/auth.controller");

auth_route.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // if(email.contains)
    const user = await registerUser(name, email, password);

    return res.send({
      message: "Registered successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).send({
      error: error.message,
    });
  }
});

auth_route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);

    return res.send({
      message: "Login Successful",
      data,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

auth_route.post("/request-reset-link", async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const data = await resetLink(email);
    return res.send(data);
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
});

auth_route.get("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    // console.log(id, token);
    const { user } = await showResetPage(id, token);
    console.log(user.email);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
});

auth_route.post("/reset-password/:id/:token", async (req, res) => {
  try {
    const { id, token } = req.params;
    const { password, confirmPassword } = req.body;
    console.log("password from ejs" + password);
    const {message, user} = await resetPassword(id, token, password);
    console.log(user.password === password);
    // res.send({ message: message, user });
    res.redirect('http://localhost:5173/login')
    // window.location('http://localhost:5173/login')
  } catch (error) {
    return res.status(500).send({
      error: error.message,
    });
  }
});

module.exports = auth_route;
