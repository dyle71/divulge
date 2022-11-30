const express = require('express')
const app = express()
const port = 3000

app.use('/reveal.js', express.static('node_modules/reveal.js/dist'))
app.use('/reveal.js-plugin', express.static('node_modules/reveal.js/plugin'))
app.use('/reveal.js-plugin-external', express.static('node_modules/reveal_external'))
app.use('/reveal.js-plugin-menu', express.static('node_modules/reveal.js-menu'))
app.use('/plugin', express.static('plugin'))

app.use('/', express.static('slides'))
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

