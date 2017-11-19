/*
 * Function : index.js
 *
 * Description : main route
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under Yoonseok Oh
 *
 * Email : yoonseok.oh@icloud.com
 *
 */

"use strict";

const express = require('express');
const router = express.Router();

// Default - Get : Show main page
router.get('/test', function (req, res) {
  res.render('index.hbs');
});

module.exports = router;
