/*
 * import.js
 *
 * Oliver Maurhart (dyle71@gmail.com)
 *
 * Forked from reveal_external by Jan Schoepke <janschoepke@me.com>
 *
 * Released under the MIT license
 *
 * Import files into a reveal.js presentation.
 *
 * This is a reveal.js plugin to import html files. It replaces the
 * content of any element with a data-import="file.ext#selector" with the contents
 * part of file.ext specified by the selector. If you use
 * data-import-replace="file.ext#selector" the container element itself will get
 * replaced.
 *
 * Relative paths in "src" attributes in the loaded fragments will get prefixed
 * with the path.
 *
 * external: {
 *   async: false,
 *   mapAttributes: ['src']
 * }
 */

let RevealImport = (function () {

  function convertAttribute(attribute, container, path) {
    if (container.getAttribute(attribute)) {
      container.setAttribute(
        attribute,
        convertUrl(container.getAttribute(attribute), path)
      );
    }
    let nodes = container.querySelectorAll("[" + attribute + "]");
    for (const node of nodes) {
      node.setAttribute(
        attribute,
        convertUrl(node.getAttribute(attribute), path)
      );
    }
  }

  function convertUrl(src, path) {
    if (path !== "" && src.indexOf(".") === 0) {
      return path + "/" + src;
    }
    return src;
  }

  function convertUrls(config, container, path) {
    for (const attribute of config.mapAttributes) {
      convertAttribute(attribute, container, path);
    }
  }







  function getConfig() {
    const config = Reveal.getConfig() || {};
    config.importer = config.importer || {};
    return {
      /*
        Some plugins run into problems, because they expect to have access
        to the all the slides. Enable on your own risk.
       */
      async: !!config.importer.async,
      /*
        This will prefix the attributes (by default "src") in the loaded
        HTML with the path if they are relative paths (start with a dot).
       */
      mapAttributes:
        config.importer.mapAttributes instanceof Array
          ? config.importer.mapAttributes
          : config.importer.mapAttributes
          ? ["src"]
          : [],
    };
  }

  function getImportSpecs(node) {

    const [urlImport, urlImportReplace] = [node.getAttribute("data-import"), node.getAttribute("data-import-replace")];
    if (urlImport === null && urlImportReplace === null) {
      return null;
    }
    if (urlImport !== null && urlImportReplace !== null) {
      throw new Error("You must specify either data-import or data-import-replace, not both.");
    }

    const url = urlImport || urlImportReplace;
    const regexGroups = url.match(/^([^#]+)(?:#(.+))?/);

    // Check if the section html to import is relative or absolute
    // by examining, if we do have a scheme in that url present or
    // the url starts with a double-slash.
    // See: https://stackoverflow.com/a/31991870/8754067
    const relativeUrl = !url.match(/^(?:^[a-z][a-z0-9+\.-]*:|\/\/)/);
    return {
      importFromUrl: relativeUrl ? regexGroups[1] : node.baseURI + "/" + regexGroups[1],
      fragment: regexGroups[2] || "",
      replaceSection: urlImportReplace !== null,
    }
  }

  function importSectionsUnderNode(config, node, path) {
    path = path || node.baseURI;
    const sections = node.querySelectorAll(
      "[data-import], [data-import-replace]"
    );
    for (let section of sections) {
      const importSpecs = getImportSpecs(section);
      if (importSpecs) {
        updateSection(getConfig(), section, importSpecs, path);
      }
    }
  }

  function updateSection(config, section, importSpecs, path) {
    fetch(importSpecs.importFromUrl, {method: "GET"})
      .then(response => { response.url, response.text() })
      .then({url, text} => {
        const html = new DOMParser().parseFromString(text, "text/html");
        const nodes =
          importSpecs.fragment !== ""
            ? html.querySelectorAll(importSpecs.fragment)
            : html.querySelector("body").childNodes;

        for (const node of nodes) {
          if (node.nodeType === 1) {
            convertUrls(config, node, path);
          }
          const documentNode = document.importNode(node, true);
          if (importSpecs.replaceSection) {
            section.parentNode.insertBefore(documentNode, section);
          } else {
            section.appendChild(documentNode);
          }

          if (node.nodeName === "SECTION") {
            // const target2 = getTarget(documentNode);
            // updateSection(config, documentNode, target2, path);
          }
        }

        if (importSpecs.replaceSection) {
          section.parentNode.removeChild(section);
        }
      })
      .catch((err) => console.error(err));
  }

  return {
    id: "reveal-importer",
    init: function () {
      importSectionsUnderNode(getConfig(), document);
    },
  };
})();
