# &lt;fxos-checkbox&gt; ![](https://travis-ci.org/fxos-components/fxos-checkbox.svg)

## Installation

```bash
$ npm install fxos-checkbox
```

Then include folowing files

```html
<link href="node_modules/fxos-icons/fxos-icons.css"></link>
<script src="node_modules/fxos-component/fxos-component.js"></script>
<script src="node_modules/fxos-fxos-checkbox/fxos-checkbox.js"></script>
```

## Examples

- [Example](http://fxos-components.github.io/fxos-checkbox/)

## Usage

```html
<fxos-checkbox></fxos-checkbox>
```

Checked

```html
<fxos-checkbox checked></fxos-checkbox>
```

Disabled

```html
<fxos-checkbox disabled></fxos-checkbox>
```

## Developing locally

1. `git clone https://github.com/fxos-components/fxos-checkbox.git`
2. `cd fxos-checkbox`
3. `npm install` (NPM3)
4. `npm start`

## Readiness

- [x] Accessibility ([@yzen](https://github.com/yzen))
- [ ] Test Coverage
- [ ] Performance
- [ ] Visual/UX
- [x] RTL ([@fabi1cazenave](https://github.com/fabi1cazenave))

## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. To run unit tests you need npm >= 3 installed.
3. `$ npm install`
4. `$ npm run test-unit`

If you would like tests to run on file change use:

`$ npm run test-unit-dev`

If your would like run integration tests, use:

`$ export FIREFOX_NIGHTLY_BIN=/absolute/path/to/nightly/firefox-bin`
`$ npm run test-integration`

## Lint check

Run lint check with command:

`$ npm run test-lint`
