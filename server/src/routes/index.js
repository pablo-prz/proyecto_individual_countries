const { Router } = require("express");
const getCountries = require('../handlers/getCountries');
const getCountryDetail = require('../handlers/getCountryDetail');
const postActivities = require('../handlers/postActivities');
const getActivities = require('../handlers/getActivities');
const router = Router();

router.get("/countries", getCountries);
router.get("/countries/:id", getCountryDetail);
router.get("/countries?name=", getCountries);
router.get("/activities", getActivities);
router.post("/activities", postActivities);

module.exports = router;
