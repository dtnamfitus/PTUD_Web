const userService = require("../../services/user.service");

const login = async (req, res) => {
  try {
    const user = req.user;
    const error = req.query.error;
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render("client/auth/login", {}, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
    res.render("layout/client-layout/layout", {
      title: "Login",
      body: bodyHtml,
      user,
      error,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching products");
  }
};

const verify = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(JSON.stringify(req.body, null, 2));
    res.redirect("/client/auth/login");
  } catch (error) {
    console.error(error);
    res.redirect("/client/auth/login?error=Invalid email or password");
  }
};

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, gender, birthDate } =
      req.body;

    const user = await userService.createUser({
      email,
      password,
      firstName,
      lastName,
      gender,
      birthDate,
    });

    console.log(user);
    res.redirect("/client/auth/login?success=Account created successfully");
  } catch (error) {
    console.error(error);
    res.redirect("/client/auth/register?error=Invalid email or password");
  }
};

module.exports = {
  login,
  verify,
  register,
};
