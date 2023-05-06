const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const generateToken = (user) => {
  let payload = {
    _id: user._id,
    email: user.email,
    name: user.name,
  };

  return jwt.sign(payload, process.env.JWT_AUTH_TOKEN);
};

async function registerUser(name, email, password) {
  const alreadyExisting = await User.findOne({ email });

  if (alreadyExisting) {
    throw new Error("User already exists");
  }

  let user = await User.create({
    name,
    email,
    password: bcrypt.hashSync(password),
  });

  user = user.toJSON();
  delete user.password;

  return user;
}

async function loginUser(email, password) {
  let user = await User.findOne({ email });

  if (user) {
    console.log("user is " + user);
    user = user.toJSON();
    // console.log(password, user.password);
    let pass = bcrypt.compareSync(password, user.password);
    if (pass) {
      delete user.password;
      // console.log(pass+ "=====>");
      let token = generateToken(user);
      return {
        token: token,
        user,
      };
    } else {
      throw new Error("Password does not match");
    }
  } else {
    throw new Error("User does not exist");
  }
}

async function resetLink(email) {
  let user = await User.findOne({ email });
  if (user) {
    const new_secret = process.env.JWT_AUTH_TOKEN + user.password;
    let payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, new_secret, { expiresIn: "2m" });
    const link = `${process.env.PROD_SERVER}/user/reset-password/${user._id}/${token}`;
    // console.log(link);

    //mail logic

    let config = {
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    };
    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
      logo: "https://mailgen.js/img/logo.png",
    });

    let email = {
      body: {
        name: user.name,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#3273a8",
            text: "Reset your password",
            link: link,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    let mailBody = MailGenerator.generate(email);

    let message = {
      from: EMAIL,
      to: user.email,
      subject: "Reset Link",
      html: mailBody,
    };
    transporter
      .sendMail(message)
      .then(() => {
        return {
          msg: "you should receive an email",
        };
      })
      .catch((error) => {
        return { error };
      });

    return {
      message: "sending link",
      link: link,
    };
  } else {
    throw new Error("User doesn't exist");
  }
}

async function showResetPage(id, token) {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User doesn't exist");
  }
  const new_secret = process.env.JWT_AUTH_TOKEN + user.password;
  const verify = jwt.verify(token, new_secret);

  return { user };
}

async function resetPassword(id, token, password) {
  let user = await User.findOne({ _id: id });
  if (!user) {
    throw new Error("User doesn't exist");
  }
  const new_secret = process.env.JWT_AUTH_TOKEN + user.password;
  const verify = jwt.verify(token, new_secret);

  let newPass = bcrypt.hashSync(password);
  console.log("newpass is " + newPass);
  await User.updateOne({ _id: id }, { $set: { password: `${newPass}` } });
  user = user.toJSON();
  delete user.password;
  return { message: "Password changed", user };
}

module.exports = {
  registerUser,
  loginUser,
  generateToken,
  resetLink,
  showResetPage,
  resetPassword,
};
