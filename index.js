/*
 * This file is part of the divulge Source Code.
 * See the LICENSE file in the project root folder.
 * web: https://gitlab.com/dyle71/divulge
 * (C) Copyright 2022, oliver.maurhart@headcode.space
 */

const fs = require('fs-extra');
const logger = require('logops');

function provideMinimumDeploy(target, source) {

  fs.opendir(target, (err, dir) => {

    if (err !== null) {
      logger.fatal(`Trying to access ${target} folder gave: ${err}.`);
      logger.fatal(`Please ensure the ${target} folder is present.`);
      process.exit(1);
    }

    dir.read((err, dirent) => {

      if (err !== null) {
        logger.fatal(`Trying to access files in ${target} folder gave: ${err}.`);
        process.exit(1);
      }

      if (dirent === null) {
        logger.info(`Folder ${target} is empty.`);
        logger.info(`Populating it with ${source}.`);
        fs.copySync(source, target);
      }
    });
    
    dir.close();
  })
}

provideMinimumDeploy('slides', 'minimum-deploy/slides');
provideMinimumDeploy('themes', 'minimum-deploy/themes');

const express = require('express');
const expressLogging = require('express-logging');

const app = express();
const port = 3000;

app.use(expressLogging(logger));
app.use('/reveal.js', express.static('node_modules/reveal.js/dist'));
app.use('/reveal.js-plugin', express.static('node_modules/reveal.js/plugin'));
app.use('/reveal.js-plugin-external', express.static('node_modules/reveal_external'));
app.use('/reveal.js-plugin-menu', express.static('node_modules/reveal.js-menu'));
app.use('/plugin', express.static('plugin'));
app.use('/themes', express.static('themes'));

app.use('/', express.static('slides'));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
