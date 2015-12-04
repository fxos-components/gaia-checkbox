/* global marionette, setup, test */

'use strict';

var assert = require('chai').assert;
marionette.plugin('helper', require('marionette-helper'));

marionette('fxos-checkbox', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        // Disable first time run UI
        'browser.feeds.showFirstRunUI': false,
        // Disable default browser check
        'browser.shell.checkDefaultBrowser': false,
        // Disable UI tutorial
        'browser.uitour.enabled': false,
        // Enable chrome debugging
        'devtools.chrome.enabled': true,
        'devtools.debugger.remote-enabled': true,

        // Load integration test page on startup
        'startup.homepage_welcome_url': __dirname + '/test-integration.html',

        // Allow loading test resources oudside of test/ directory
        // (e.g. bower-components)
        'security.fileuri.strict_origin_policy': false,

        // Enable web components
        'dom.webcomponents.enabled': true,
        // Enable touch events
        'dom.w3c_touch_events.enabled': 1
      }
    },
    desiredCapabilities: {
      raisesAccessibilityExceptions: true
    }
  });

  var checkboxes = [{
    selector: '#b1',
    checked: true,
    enabled: true,
    checkedOnAction: [false, true]
  }, {
    selector: '#b2',
    checked: false,
    enabled: true,
    checkedOnAction: [true, false]
  }, {
    selector: '#b3',
    checked: false,
    enabled: false
  }];

  function isChecked(subject) {
    return subject.scriptWith(function(element) {
      return element.hasAttribute('checked') &&
             element.getAttribute('aria-checked') === 'true';
    });
  }

  /**
   * Perform a marionette operation and assert if an error is thrown.
   * @param  {Function} testFn operation to perform
   * @param  {String} message error message for the assert statement
   */
  function failOnA11yError(testFn, message) {
    try {
      testFn();
    } catch (err) {
      // Marionette raises an ElementNotAccessibleError exception when
      // raisesAccessibilityExceptions is set to true.
      assert(false, [message, err.message].join(' '));
    }
  }

  setup(function() {
    checkboxes.forEach(function(checkbox) {
      checkbox.element = client.helper.waitForElement(checkbox.selector);
    });
  });

  test('fxos-checkboxes present and visible to the assistive technology',
    function() {
      checkboxes.forEach(function(checkbox) {
        // Element is found
        assert.ok(checkbox.element, checkbox.selector);
        // Element is visible to all (inlcuding assistive technology)
        failOnA11yError(function() {
          assert.isTrue(checkbox.element.displayed());
        }, 'fxos-checkbox element should be visible both normally and to ' +
          'assistive technology.');

        assert.equal(isChecked(checkbox.element), checkbox.checked,
          checkbox.selector);
      });
  });

  test('fxos-checkbox is accessible (no error thrown when clicking and ' +
    'tapping) when it is checked or unchecked', function() {
    ['click', 'tap'].forEach(function(action) {
      checkboxes.forEach(function(checkbox) {
        // The following checks for control element will be performed on
        // tap/click:
        // * visible to the assistive technology
        // * enabled to the assistive technology
        // * not obstructed via pointer-events set to none
        // * focusable by the assistive technology
        // * named/labelled for the assistive technology
        // * support user actions (click/tap/etc) performed via assistive
        //   technology
        if (checkbox.enabled) {
          checkbox.checkedOnAction.forEach(function(checked) {
            failOnA11yError(function() {
              checkbox.element[action]();
            }, 'fxos-checkbox should be clickable and tappable including via ' +
              'the assistive technology.');
            // Checkbox should toggle checked state when it is clicked or tapped
            assert.equal(isChecked(checkbox.element), checked,
              checkbox.selector);
          });
        } else {
          try {
            checkbox.element[action]();
          } catch (err) {
            assert.equal(err.type, 'ElementNotAccessibleError', 'disabled ' +
              'fxos-checkbox is not clickable or tappable and ' +
              'clicking/tapping will result in an ElementNotAccessibleError.');
            // Disabled checkbox should not be checked when it is clicked or
            // tapped
            assert.equal(isChecked(checkbox.element), false, checkbox.selector);
          }
        }
      });
    });
  });
});
