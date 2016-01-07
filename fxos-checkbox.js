(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fxos-component"));
	else if(typeof define === 'function' && define.amd)
		define(["fxos-component"], factory);
	else if(typeof exports === 'object')
		exports["FXOSCheckbox"] = factory(require("fxos-component"));
	else
		root["FXOSCheckbox"] = factory(root["fxosComponent"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Dependencies
	 */

	var component = __webpack_require__(1);
	__webpack_require__(2);

	/**
	 * Exports
	 */

	module.exports = component.register('fxos-checkbox', {
	  created() {
	    this.setupShadowRoot();

	    this.els = { inner: this.shadowRoot.querySelector('.inner') };
	    this.addEventListener('click', this.onClick.bind(this));

	    // Setup initial attributes
	    this.checked = this.getAttribute('checked');
	    this.disabled = this.getAttribute('disabled');
	    this.danger = this.getAttribute('danger');
	    this.name = this.getAttribute('name');

	    // process everything that doesn't affect user interaction
	    // after the component is created
	    setTimeout(() => this.makeAccessible());
	  },

	  /**
	   * Accessibility enhancements.
	   * Read fxos-checkbox as checkbox.
	   *
	   * - Make it tab-able
	   * - Read its checked and disabled state
	   */
	  makeAccessible() {
	    this.setAttribute('role', 'checkbox');

	    // Make tabable
	    this.tabIndex = 0;

	    this.setAttribute('aria-checked', this.checked);
	    if (this.disabled) this.setAttribute('aria-disabled', true);
	  },

	  onClick(e) {
	    e.stopPropagation();
	    if (this.disabled) return;
	    this.checked = !this.checked;
	  },

	  toggle(value) {
	    value = arguments.length ? value : !this.checked;
	    if (value || value === '') this.check();
	    else this.uncheck();
	  },

	  check() {
	    if (this.disabled) return;
	    if (this.checked) return;
	    this.setAttr('checked', '');
	    this.setAttribute('aria-checked', true);
	    this._checked = true;
	  },

	  uncheck() {
	    if (this.disabled) return;
	    if (!this.checked) return;
	    this.removeAttr('checked');
	    this.setAttribute('aria-checked', false);
	    this._checked = false;
	  },

	  attrs: {
	    checked: {
	      get() { return !!this._checked; },
	      set() { this.toggle(); }
	    },

	    danger: {
	      get() { return this._danger; },
	      set(value) {
	        if (value || value === '') { this.setAttr('danger', value); }
	        else { this.removeAttr('danger'); }
	        this._danger = value;
	      }
	    },

	    name: {
	      get() { return this._name; },
	      set(value) {
	        if (value === null) { this.removeAttr('name'); }
	        else { this.setAttr('name', value); }
	        this._name = value;
	      }
	    },

	    disabled: {
	      get() { return this._disabled; },
	      set(value) {
	        value = !!(value || value === '');
	        if (this._disabled === value) return;
	        this._disabled = value;
	        if (value) {
	          this.setAttribute('disabled', '');
	          this.setAttribute('aria-disabled', true);
	        } else {
	          this.removeAttribute('disabled');
	          this.removeAttribute('aria-disabled');
	        }
	      }
	    }
	  },

	  template: `<div class="inner">
	      <div class="background"></div>
	      <div class="tick"></div>
	    </div>
	    <style>
	      :host {
	        position: relative;
	        display: inline-block;
	        cursor: pointer;
	        outline: 0;
	      }

	      :host([disabled]) {
	        pointer-events: none;
	        opacity: 0.5;
	      }

	      .inner {
	        position: relative;
	        z-index: 0;

	        display: block;
	        box-sizing: border-box;
	        width: 28px;
	        height: 28px;
	        border-radius: 50%;
	        border: 2px solid
	          var(--fxos-checkbox-border-color,
	          var(--fxos-border-color));
	        background: var(--fxos-checkbox-background, #fff);

	      }

	      /**
	       * Increase hit area
	       */

	      .inner:before {
	        content: '';
	        position: absolute;
	        top: -10px; right: -10px;
	        bottom: -10px; left: -10px;
	      }

	      .background {
	        position: absolute;
	        top: 0px;
	        left: 0px;
	        z-index: -1;

	        width: 100%;
	        height: 100%;
	        border-radius: 50%;
	        opacity: 0;

	        background:
	          var(--fxos-checkbox-color-checked,
	          var(--fxos-brand-color));
	      }

	      .inner[checked] .background {
	        animation-name: fxos-checkbox-animation;
	        animation-duration: 350ms;
	        animation-fill-mode: forwards;
	      }

	      .tick {
	        text-align: center;
	        line-height: 26px;
	        margin-left: -1px;
	        opacity: 0;

	        transition-property: opacity;
	        transition-duration: 100ms;

	        color:
	          var(--fxos-checkbox-color-checked,
	          var(--fxos-brand-color));
	      }

	      [checked] .tick {
	        opacity: 1;
	        transition-delay: 140ms;
	      }

	      .tick:before {
	        font-family: 'fxos-icons';
	        content: 'tick';
	        font-style: normal;
	        font-weight: 500;
	        text-rendering: optimizeLegibility;
	        font-size: 16px;
	        line-height: 1;
	      }
	    </style>`,

	    globalCss: `@keyframes fxos-checkbox-animation {
	      0% {
	        transform: scale(0);
	        opacity: 1;
	      }
	      65% {
	        transform: scale(1);
	        opacity: 1;
	      }
	      100% {
	        opacity: 0;
	        transform: scale(1);
	      }
	    }`
	});

	// Makes checkboxs togglable via keboard
	addEventListener('keypress', e => {
	  if (e.which !== 32) return;
	  var el = document.activeElement;
	  var isCheckbox = el.localName === 'fxos-checkbox';
	  if (isCheckbox) el.click();
	});

	// Bind a 'click' delegate to the
	// window to listen for all clicks
	// and toggle checkboxes when required.
	addEventListener('click', e => {
	  var label = getLabel(e.target);
	  var gaiaCheckbox = getLinkedCheckbox(label);
	  if (gaiaCheckbox) gaiaCheckbox.toggle();
	}, true);

	/**
	 * Find a checkbox when given a <label>.
	 *
	 * @param  {Element} label
	 * @return {GaiaCheckbox|null}
	 */
	function getLinkedCheckbox(label) {
	  if (!label) return;
	  var id = label.getAttribute('for');
	  var el = id && document.getElementById(id);
	  return el && el.localName === 'fxos-checkbox' ? el : null;
	}

	/**
	 * Walk up the DOM tree from a given
	 * element until a <label> is found.
	 *
	 * @param  {Element} el
	 * @return {HTMLLabelElement|undefined}
	 */
	function getLabel(el) {
	  return el && (el.localName == 'label' ? el : getLabel(el.parentNode));
	}


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;(function(define){'use strict';!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require,exports,module){

	/**
	 * Exports
	 */

	var base = window.FXOS_ICONS_BASE_URL
	  || window.COMPONENTS_BASE_URL
	  || 'node_modules/';

	// Load it!
	if (!document.documentElement) addEventListener('load', load);
	else load();

	function load() {
	  if (isLoaded()) return;
	  var link = document.createElement('link');
	  link.rel = 'stylesheet';
	  link.type = 'text/css';
	  link.href = base + 'fxos-icons/fxos-icons.css';
	  document.head.appendChild(link);
	  exports.loaded = true;
	}

	function isLoaded() {
	  return exports.loaded
	    || document.querySelector('link[href*=fxos-icons]')
	    || document.documentElement.classList.contains('fxos-icons-loaded');
	}

	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));})(__webpack_require__(3));/*jshint ignore:line*/


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ }
/******/ ])
});
;