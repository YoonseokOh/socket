/*
 * Function : hbs-engine.js
 *
 * Description : helper function of handle bar
 *
 * Copyright (c) 2017, Yoonseok Oh.
 * Licensed under yoonseok oh
 *
 * Email : promiseys@gmail.com
 *
 */

"use strict";

var hbs = require('hbs');

hbs.registerHelper('sample', function(value) {
  return value;
});
