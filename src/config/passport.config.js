import passport from "passport";
import GitHubStrategy from "passport-github2";
import userModel from "../dao/models/user.model.js";

const GITHUB_CLIENT_ID = "Iv1.c93b65642532cb17";
const GITHUB_CLIENT_SECRET = "2bd8006adcf98e9c66c326bd6f7340524d792e0f";

const initializePassport = () => {
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/session/github/callback",
      },
      async (accesToken, refreshToken, profile, done) => {
        // console.log(profile);
        try {
          let user = await userModel.findOne({ email: profile._json?.email });

          if (!user) {
            let addNewUser = {
              first_name: profile._json.name,
              last_name: "",
              email: profile._json.email,
              age: 0,
              password: "",
            };

            let newUser = await userModel.create(addNewUser);
            done(null, newUser);
          } else {
            done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    let user = await userModel.findById({ _id: id });
    done(null, user);
  });
};

export default initializePassport;
