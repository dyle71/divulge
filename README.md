# Divulge

A very minimal template for creating reveal.js slides quickly.

This is a `npm install` based version of reveal.js with lots of ... some might
call it "bloat" ... out of the way. Focus on the essentials! The slides!

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
slides subfolder for examples and references.

Start with [content.html](slides/content.html) and arrange you sections 
and slides as needed.

> However, refrain to edit the [slides/index.html](slides/index.html), since 
> this contains all the boilerplate stuff to configure reveal.js along with
> all plugins. Everything else is on your disposal.

## Plugins installed

Divulge has these reveal.js plugins already included:

- external: https://github.com/janschoepke/reveal_external
- menu: https://github.com/denehyg/reveal.js-menu

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

## Thanks

- Very much thanks to the creator of [reveal.js](https://revealjs.com/)! What 
  a nice piece of software!
- Plugin external: https://github.com/janschoepke/reveal_external.
- Plugin menu: https://github.com/denehyg/reveal.js-menu

---  

Oliver Maurhart  
oliver.maurhart@headcode.space  
https://headcode.space
