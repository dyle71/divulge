# Divulge

A very minimal template for creating reveal.js slides quickly.

This is a `npm install` based version of reveal.js with lots of ... some might
call it "bloat" ... out of the way. Focus on the essentials! The slides!

```bash
$ mkdir -p presentation/slides
$ docker-compose --file /PATH/TO/DIVULGE up -d
$ sudo chown -R $USER presentation/slides
```

Done. Presentation is at http://localhost:3000 and your slides are for
your disposal at `presentation/slides`.

## Install

1. Clone as usual.
2. Install a node of your choice.
   I recommend using a latest release via nvm - Node Version Manager.
   > There is a very nice manual by [Microsoft](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
3. `cd` into the project.
4. Install necessary packages:

```bash
npm install
```

5. Fire up the presentation with: 
   
```bash
npm run show
```

6. Open up a browser and load http://localhost:3000.
7. Edit your set of slides at [slides](slides/). =)

## Slides

All slides reside in the `slides` folder. The main grouping "slide" is
[content.html](slides/content.html). Start editing this one check the 
[slides](./slides) subfolder for examples and references.

The [content.html](slides/content.html) starts and arranges your sections 
and slides as needed.

> However, refrain to edit the [slides/index.html](slides/index.html), since 
> this contains all the boilerplate stuff to configure reveal.js along with
> all plugins. Modify this if you want to configure reveal.js in more detail.

## Plugins installed

Divulge has these reveal.js plugins already included:

- external: https://github.com/janschoepke/reveal_external
- menu: https://github.com/denehyg/reveal.js-menu
- pdfexport: https://github.com/McShelby/reveal-pdfexport/blob/master/pdfexport.js
- plantUML: https://github.com/reveal-plantuml/reveal-plantuml.github.io

### Deactivating some plugins

If you do not want some pre-enabled plugins, then simply remove them
from the [slides/index.html](slides/index.html) plugins list or comment
the line.

Example: plugin list in [slides/index.html](slides/index.html)

```javascript
        plugins: [ 
          RevealMarkdown, 
          RevealHighlight, 
          RevealNotes, 
          RevealMath, 
          RevealZoom, 
          RevealMenu 
        ]
```

Deactivate menu plugin:

```javascript
        plugins: [ 
          RevealMarkdown, 
          RevealHighlight, 
          RevealNotes, 
          RevealMath, 
          RevealZoom, 
          // RevealMenu 
        ]
```

## Docker

The accompanying [Dockerfile](./Dockerfile) defines a docker container with 
the volumes `/divulge/slides` (holding the slides) and `/divulge/themes` 
holding the styling of the slides.

## Docker-Compose

Included is also a [docker-compose.yml](./docker-compose.yml). For the most
easiest way to use divulge, install docker-compose.

```bash
$ mkdir my-presentation/slides
$ cd my-presentation
$ docker-compose --file /PATH/TO/COMPOSE/FILE up
...
```

This will create a mere empty template in the slides subfolder and will
start serving your presentation at http://localhost:3000.

> Beware: if divulge does not find any slides, it will populate the
> slides folder with some initial ones. However, these new files will
> belong to root. This is due to the nature of docker any might change
> in the future. In the meantime simply do a `sudo chown -R $USER slides`
> for remedy.

## Thanks

- Very much thanks to the creator of [reveal.js](https://revealjs.com/)! What 
  a nice piece of software!
- Plugin external: https://github.com/janschoepke/reveal_external.
- Plugin menu: https://github.com/denehyg/reveal.js-menu
- Plugin pdfexport: https://github.com/McShelby/reveal-pdfexport/blob/master/pdfexport.js
- Plugin plantUML: https://github.com/reveal-plantuml/reveal-plantuml.github.io

---  

Oliver Maurhart  
oliver.maurhart@headcode.space  
https://headcode.space
