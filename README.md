# &lt;gaia-checkbox&gt; ![](https://travis-ci.org/gaia-components/gaia-checkbox.svg)  [![devDependency Status](https://david-dm.org/gaia-components/gaia-checkbox/dev-status.svg)](https://david-dm.org/gaia-components/gaia-checkbox#info=devDependencies)


## Installation

```bash
$ bower install gaia-components/gaia-checkbox
```

Then include folowing files in HTML

```html
<link href="bower_components/gaia-icons/gaia-icons.css"></link>
<script src="bower_components/gaia-switch/gaia-checkbox.js"></script>
```


## Examples

- [Example](http://gaia-components.github.io/gaia-checkbox/)


## Usage

```html
<gaia-checkbox></gaia-checkbox>
```


Checked

```html
<gaia-checkbox checked></gaia-checkbox>
```


Disabled

```html
<gaia-checkbox disabled></gaia-checkbox>
```


## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. `$ npm install`
3. `$ npm run test-unit`

If you would like tests to run on file change use:

`$ npm run test-unit-dev`

If your would like run integration tests, use:

`$ export FIREFOX_NIGHTLY_BIN=/absolute/path/to/nightly/firefox-bin`
`$ npm run test-integration`

## Lint check

Run lint check with command:

`$ npm run test-lint`
