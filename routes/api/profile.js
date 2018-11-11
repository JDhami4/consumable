const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
function stopIt() {
  var start = new Date().getTime();
  for (var i = 0; i < 200000; i++) {
    console.log(i);
  }
}

("Use strict");
const request = require("request");

// Computer vision subscription key
const subscriptionKey = "b7c8e9bc167b4350ae15e882e773098d";

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
  "https://westcentralus.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Printed";

const imageUrl =
  "https://res.cloudinary.com/dq5kixztw/image/upload/v1541895070/wphna-world-public-health-nutrition-association-with-nutrition-label-with-ingredients.jpg";

// Request parameters.
const params = {
  // 'mode': 'printed',
};

const options = {
  uri: uriBase,
  qs: params,
  body: '{"url": ' + '"' + imageUrl + '"}',
  headers: {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": subscriptionKey
  }
};

// Load Profile Model
const Profile = require("../../models/Profile");

//Load User Profile
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile/test
// @desc    Tests Microsoft's API
// @access  Public
router.get("/info", (req, res) => {
  request.post(options, (error, response, body) => {
    if (error) {
      console.log("Error: ", error);
      return;
    }
    console.log("JSON Response\n");

    stopIt();
    const uri = response.headers["operation-location"];
    const options = {
      uri: uri,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": subscriptionKey
      }
    };
    request.get(options, (error, response, body) => {
      let jsonResponse = JSON.stringify(JSON.parse(body), null, "  ");
      //   console.log(jsonResponse);
      let json = JSON.parse(body);
      console.log(json["recognitionResult"]["lines"][0].text);
    });
  });
});

router.post("/", (req, res) => {
  // Get fields and create profile
  const profileFields = {}; //restrictions - Split into array
  if (typeof req.body.restrictions != "undefined") {
    profileFields.restrictions = req.body.restrictions.split(",");
  }
  if (req.body.caloricGoal) profileFields.caloricGoal = req.body.caloricGoal;

  new Profile(profileFields).save().then(profile => res.json(profile));
});

module.exports = router;
