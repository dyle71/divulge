/*
 * This file is part of the divulge Source Code.
 * See the LICENSE file in the project root folder.
 * web: https://gitlab.com/dyle71/divulge
 * (C) Copyright 2022, oliver.maurhart@headcode.space
 */

const express = require('express')
const app = express()
const port = 3000

app.use('/reveal.js', express.static('node_modules/reveal.js/dist'))
app.use('/reveal.js-plugin', express.static('node_modules/reveal.js/plugin'))
app.use('/reveal.js-plugin-external', express.static('node_modules/reveal_external'))
app.use('/reveal.js-plugin-menu', express.static('node_modules/reveal.js-menu'))
app.use('/plugin', express.static('plugin'))
app.use('/themes', express.static('themes'))

app.use('/', express.static('slides'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
