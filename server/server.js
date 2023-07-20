require("dotenv").config();
const express = require("express");
const webpush = require("web-push");
const app = express();

app.use(express.json());

// VAPID keys should be generated
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Store subscription info
let pushSubscription = null;

// Save push subscription route
app.post("/save-subscription", (req, res) => {
  pushSubscription = req.body;
  res.json({ message: "Success" });
});

// Send push notification route
app.post("/send-push-notification", (req, res) => {
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "Your Title",
        body: "Your Body",
      })
    )
    .then((result) => console.log(result))
    .catch((e) => console.log(e.stack));

  res.json({ message: "Message sent" });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
