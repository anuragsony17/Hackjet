const express = require("express");
const connectDB = require("../backend/config/db");
const problemRoutes = require("./route/problem.js");
const problemTableRoutes = require("./route/problemTable.js");
const cors = require("cors");

const userRouters = require("./route/user.js");

const   uploadRoutes = require("./route/uploads.js")
const authRouters = require("./route/Auth.js");
const session = require("express-session");
const passport = require("passport");
const  User  = require("./model/user.js");
const { sanitizeUser, isAuth, cookieExtractor } = require("./services/common");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const SECRET_KEY = "SECRET_KEY";
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const router = express.Router();



app.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(bodyParser.json());


app.use(
  session({
    secret: "Keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(cookieParser());
app.use(express.json());


app.use("/auth", authRouters.router);
app.use("/images", express.static("images"));
app.use("/api", problemRoutes);
app.use("/problem-table", problemTableRoutes);
app.use("/user", isAuth() , userRouters);
app.use("/api/upload", isAuth(), uploadRoutes);


const opts = {};
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    // by default passport uses username
    console.log({ email, password });
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        return done(null, false, { message: "invalid credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, { id: user.id, role: user.role, token }); // this lines sends to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user)); // this calls serializer
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, { id: user.id, role: user.role });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});






const stripe = require("stripe")(
  "sk_test_51QIJu1EDyIGp3ib4mrP67gdHaDDgpqg3iLY0AlxXq3oB8cLmVISRoOs1M16vYqhVhLAxqL1oCGR9goXbaXuO5kQ800eRSlORrk"
);




app.post("/payment/create", isAuth(), async (req, res) => {
  const { plan } = req.body;
  const PLAN_PRICE = { pro: 299, premium: 699 };
  if (!PLAN_PRICE[plan])
    return res.status(400).json({ message: "Invalid plan" });

  try {
    // Create PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PLAN_PRICE[plan] * 100, // paisa
      currency: "inr",
      metadata: { plan, userId: req.user.id },
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Stripe payment creation failed" });
  }
});


const endpointSecret = "sk_live_8sd7f6sdf76sdf87sdf";


app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const endpointSecret = "whsec_your_webhook_secret"; // Stripe webhook secret
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error(err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata.userId;
      const plan = paymentIntent.metadata.plan;

      const user = await User.findById(userId);
      if (!user) return res.status(404).send("User not found");

      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + 1);

      user.plan = plan;
      user.planExpiry = expiry;
      user.paymentHistory = user.paymentHistory || [];
      user.paymentHistory.push({
        plan,
        amount: paymentIntent.amount / 100,
        status: "success",
        transactionId: paymentIntent.id,
      });

      await user.save();
    }

    res.json({ received: true });
  }
);

// 🔹 Payment success API (optional, frontend redirect can hit this to verify)
app.get("/payment/success", isAuth(), async (req, res) => {
  const { plan } = req.query;
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ success: true, plan, message: "Payment verified" });
});


// ✅ Connect DB
connectDB();

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
