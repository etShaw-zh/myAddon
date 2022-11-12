(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // package.json
  var require_package = __commonJS({
    "package.json"(exports, module) {
      module.exports = {
        name: "my-addon",
        addonName: "My Zotero Addon",
        addonID: "myaddon@euclpts.com",
        addonRef: "addontemplate",
        version: "0.0.0",
        description: "my addon",
        main: "src/index.js",
        scripts: {
          build: "node build.js",
          start: "node start.js",
          stop: "node stop.js",
          prerestart: "npm run build",
          restart: "node restart.js",
          release: "release-it",
          test: 'echo "Error: no test specified" && exit 1'
        },
        repository: {
          type: "git",
          url: "git+https://github.com/windingwind/zotero-addon-template.git"
        },
        author: "windingwind",
        license: "AGPL-3.0-or-later",
        bugs: {
          url: "https://github.com/windingwind/zotero-addon-template/issues"
        },
        homepage: "https://github.com/windingwind/zotero-addon-template#readme",
        releasepage: "https://github.com/windingwind/zotero-addon-template/releases/latest/download/zotero-addon-template.xpi",
        updaterdf: "https://raw.githubusercontent.com/windingwind/zotero-addon-template/master/update.rdf",
        dependencies: {
          compressing: "^1.5.1",
          esbuild: "^0.14.34",
          "replace-in-file": "^6.3.2"
        },
        devDependencies: {
          "release-it": "^14.14.0",
          "zotero-types": "^0.0.4"
        }
      };
    }
  });

  // src/module.ts
  var AddonModule = class {
    constructor(parent) {
      this._Addon = parent;
    }
  };
  var module_default = AddonModule;

  // src/events.ts
  var AddonEvents = class extends module_default {
    constructor(parent) {
      super(parent);
      this.notifierCallback = {
        notify: (event, type, ids, extraData) => __async(this, null, function* () {
          if (event == "select" && type == "tab" && extraData[ids[0]].type == "reader") {
          }
          if (event == "add" && type == "item") {
          }
        })
      };
    }
    onInit(_Zotero2) {
      return __async(this, null, function* () {
        console.log(`${addonName}: init called`);
        _Zotero2.debug(`${addonName}: init called`);
        this.resetState();
        let notifierID = _Zotero2.Notifier.registerObserver(this.notifierCallback, [
          "tab",
          "item",
          "file"
        ]);
        _Zotero2.getMainWindow().addEventListener(
          "unload",
          function(e) {
            _Zotero2.Notifier.unregisterObserver(notifierID);
          },
          false
        );
        this._Addon.views.initViews(_Zotero2);
      });
    }
    resetState() {
    }
    onUnInit(_Zotero2) {
      console.log(`${addonName}: uninit called`);
      _Zotero2.debug(`${addonName}: uninit called`);
      this._Addon.views.unInitViews(_Zotero2);
      _Zotero2.AddonTemplate = void 0;
    }
  };
  var events_default = AddonEvents;

  // src/prefs.ts
  var AddonPrefs = class extends module_default {
    constructor(parent) {
      super(parent);
    }
    initPreferences(_window) {
      this._window = _window;
      Zotero.debug(`${addonName}: init preferences`);
      this.updatePrefsUI();
    }
    updatePrefsUI() {
      Zotero.debug(`${addonName}: init preferences UI`);
    }
  };
  var prefs_default = AddonPrefs;

  // src/views.ts
  var { addonRef } = require_package();
  var AddonViews = class extends module_default {
    constructor(parent) {
      super(parent);
      this.progressWindowIcon = {
        success: "chrome://zotero/skin/tick.png",
        fail: "chrome://zotero/skin/cross.png",
        default: `chrome://${addonRef}/skin/favicon.png`
      };
    }
    initViews(_Zotero2) {
      console.log("Initializing UI");
      const _window = _Zotero2.getMainWindow();
      const menuitem = _window.document.createElement("menuitem");
      menuitem.id = "zotero-itemmenu-addontemplate-test";
      menuitem.setAttribute("label", "Addon Template");
      menuitem.setAttribute("oncommand", "alert('Hello World!')");
      menuitem.className = "menuitem-iconic";
      menuitem.style["list-style-image"] = "url('chrome://addontemplate/skin/favicon@0.5x.png')";
      _window.document.querySelector("#zotero-itemmenu").appendChild(menuitem);
    }
    unInitViews(_Zotero2) {
      var _a;
      console.log("Uninitializing UI");
      const _window = _Zotero2.getMainWindow();
      (_a = _window.document.querySelector("#zotero-itemmenu-addontemplate-test")) == null ? void 0 : _a.remove();
    }
    showProgressWindow(header, context, type = "default", t = 5e3) {
      let progressWindow = new Zotero.ProgressWindow({ closeOnClick: true });
      progressWindow.changeHeadline(header);
      progressWindow.progress = new progressWindow.ItemProgress(
        this.progressWindowIcon[type],
        context
      );
      progressWindow.show();
      if (t > 0) {
        progressWindow.startCloseTimer(t);
      }
    }
  };
  var views_default = AddonViews;

  // src/addon.ts
  var { addonName } = require_package();
  var Addon3 = class {
    constructor() {
      this.events = new events_default(this);
      this.views = new views_default(this);
      this.prefs = new prefs_default(this);
    }
  };

  // src/index.ts
  var _Zotero = Components.classes["@zotero.org/Zotero;1"].getService(
    Components.interfaces.nsISupports
  ).wrappedJSObject;
  if (!_Zotero.AddonTemplate) {
    _Zotero.AddonTemplate = new Addon3();
    _Zotero.AddonTemplate.events.onInit(_Zotero);
  }
})();
