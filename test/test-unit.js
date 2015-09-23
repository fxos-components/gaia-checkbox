/* jshint maxlen:100 */
/* global sinon, assert, suite, setup, teardown, test,
   a1, a2, a3, b1, b2, b3, b4 */

suite('GaiaCheckbox', function() {
  'use strict';

  var accessibility = window['test-utils'].accessibility;

  /**
   * Test role and aria attributes are set correctly inside gaia-checkbox.
   * @param  {Element} gaiaCheckbox gaia checkbox to test
   * @param  {Boolean?} checked optional expected aria-checked value
   * @param  {Boolean?} disabled optional expected aria-disabled value
   */
  function testCheckboxAttributes(gaiaCheckbox, checked, disabled) {
    assert.equal(gaiaCheckbox.getAttribute('role'), 'checkbox');
    assert.equal(gaiaCheckbox.getAttribute('aria-checked') === 'true', checked);
    assert.equal(gaiaCheckbox.hasAttribute('aria-disabled'), disabled);
  }

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.dom = document.createElement('div');
    this.dom.innerHTML = `
      <gaia-checkbox id="a1" name="a"></gaia-checkbox>
      <gaia-checkbox id="a2" checked name="a"></gaia-checkbox>
      <gaia-checkbox id="a3" name="a"></gaia-checkbox>

      <label id="label" for="b1"></label>
      <gaia-checkbox id="b1" name="b"></gaia-checkbox>
      <gaia-checkbox id="b2" checked name="b"></gaia-checkbox>
      <gaia-checkbox id="b3" name="b"></gaia-checkbox>
      <gaia-checkbox id="b4" name="b" disabled></gaia-checkbox>`;

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

  suite('accessibility', function() {
    /**
     * Accessibility test utils module tests the following things, amongst other
     * checks (all at once).:
     *  - ARIA attributes specific checks
     *  - accesskey uniqueness if applicable
     *  - Presence of alternative descriptions, labels and names
     *  - Color contrast
     *  - Markup is semantically correct from a11y standpoint
     *  - Heading order
     *  - Frame/document title and language
     *  - Landmarks if applicable
     *  - Keyboard focusability and tabindex
     *
     * Its checks are called at different stages and within different states of
     * the component.
     */

    setup(function(done) {
      // Accessibility attributes are set after the HTML has been parsed.
      setTimeout(done);
    });

    test('gaia-checkboxes default states pass all accessibility checks above' +
      'and have attributes correctly set',
      function(done) {
        [a2, b2].forEach(chB => testCheckboxAttributes(chB, true, false));
        [a1, a3, b1, b3].forEach(
          chB => testCheckboxAttributes(chB, false, false));
        testCheckboxAttributes(b4, false, true);
        accessibility.check(this.dom).then(done, done);
      });

    test('gaia-checkboxes pass all accessibility checks mentioned above when ' +
      'they are checked and unchecked', function(done) {
      b1.click();
      testCheckboxAttributes(b1, true, false);
      accessibility.check(this.dom).then(() => {
        b1.click();
        testCheckboxAttributes(b1, false, false);
        return accessibility.check(this.dom);
      }).then(() => {
        b3.setAttribute('checked', '');
        testCheckboxAttributes(b3, true, false);
        return accessibility.check(this.dom);
      }).then(() => {
        b1.checked = true;
        testCheckboxAttributes(b1, true, false);
        return accessibility.check(this.dom);
      }).then(() => {
        b4.click();
        testCheckboxAttributes(b4, false, true);
        return accessibility.check(this.dom);
      }).then(done, done);
    });
  });
});
