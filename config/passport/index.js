// const passport = require("passport");
// const LocalStrategy = require("passport-local").Strategy;
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const User = require("../../models/user.model");
// const bcrypt = require("bcrypt");
// require("dotenv").config();

// const randomString = () => {
//   return Math.random().toString(36).substring(7);
// };

// passport.use(
//   new LocalStrategy(
//     { usernameField: "email", passwordField: "password" },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email }).select("+password");
//         if (!user) {
//           return done(null, false, { message: "Incorrect email or password." });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect email or password." });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: `${process.env.BASE_URL}/client/auth/google/callback`,
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ email: profile.emails[0].value });

//         if (!user) {
//           user = await User.create({
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             password: randomString(),
//             isAdmin: false,
//             isVerified: true,
//             firstName: profile.name.givenName,
//             lastName: profile.name.familyName,
//             gender: "unknown",
//             birthDate: new Date(0),
//             avatar: profile.photos[0].value,
//             isAdmin: false,
//             isVerified: true,
//           });
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch (err) {
//     done(err);
//   }
// });

// module.exports = passport;
