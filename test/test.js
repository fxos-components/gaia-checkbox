/* jshint maxlen:100 */
/*global sinon, assert, suite, setup, teardown, test */

suite('GaiaCheckbox', function() {
  'use strict';

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.dom = document.createElement('div');
    this.dom.innerHTML = [
      '<gaia-checkbox name="a"></gaia-checkbox>',
      '<gaia-checkbox checked name="a"></gaia-checkbox>',
      '<gaia-checkbox name="a"></gaia-checkbox>',

      '<label id="label" for="b1"></label>',
      '<gaia-checkbox id="b1" name="b"></gaia-checkbox>',
      '<gaia-checkbox checked name="b"></gaia-checkbox>',
      '<gaia-checkbox name="b"></gaia-checkbox>'
    ].join('');

    this.el = this.dom.firstElementChild;
    document.body.appendChild(this.dom);
  });

  teardown(function() {
    this.sandbox.restore();
    document.body.removeChild(this.dom);
    this.dom = null;
  });

  test('It toggled `checked` when clicked', function() {
    this.el.click();
    assert.isTrue(this.el.hasAttribute('checked'));
    this.el.click();
    assert.isFalse(this.el.hasAttribute('checked'));
  });

  test('It toggles `aria-checked` when clicked (accessibility)', function() {
    this.el.click();
    assert.equal(this.el.getAttribute('aria-checked'), 'true');

    this.el.click();
    assert.equal(this.el.getAttribute('aria-checked'), 'false');
  });

  test('It responds to clicks on linked <labels>', function(done) {
    var label = document.getElementById('label');
    var b1 = document.getElementById('b1');

    // Timeout required as listeners are
    // bound in the next turn of the event loop
    setTimeout(function() {
      label.click();
      assert.isTrue(b1.hasAttribute('checked'));
      done();
    });
  });

  test('It resonds to attribute changes', function() {
    this.el.setAttribute('checked', '');
    assert.isTrue(this.el.checked);
  });

  test('It responds to setting `.checked` property', function() {
    assert.isFalse(this.el.hasAttribute('checked'));
    this.el.checked = true;
    assert.isTrue(this.el.hasAttribute('checked'));
  });
});