const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs"); // Render signup form
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body; // Extract user data
    const newUser = new User({ email, username }); // Create new user instance
    const registeredUser = await User.register(newUser, password); // Register the user
    console.log(registeredUser);
    req.login(registeredUser, (err) => { // Log in the user immediately after registration
      if (err) 
        return next(err); // Handle error during login by passing to next middleware
      req.flash("success", "Welcome to Wanderlust!"); // Flash success message
      res.redirect("/listings"); // Redirect to listings
    });
  } catch (e) {
    req.flash("error", e.message); // Flash error message on failure
    res.redirect("/signup"); // Redirect back to signup
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs"); // Render login form
};

module.exports.login =async(req, res) => {
  req.flash("success", "Welcome back to Wanderlust!"); // Flash success message

  // Check if redirect URL is safe to prevent open redirect vulnerabilities
  let redirectUrl = res.locals.redirectUrl || "/listings"; // Default to listings
  res.redirect(redirectUrl); // Redirect to appropriate page
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
   // if (err) 
   //   return next(err); // Handle error during logout
    req.flash("success", "You are logged out!"); // Flash logout success message
    res.redirect("/listings"); // Redirect to listings after logout
  });
};
