
suite('GaiaRadio', function() {

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.container = document.createElement('div');
    this.container.innerHTML = [
      '<gaia-checkbox name="a"></gaia-checkbox>',
      '<gaia-checkbox checked name="a"></gaia-checkbox>',
      '<gaia-checkbox name="a"></gaia-checkbox>',

      '<label id="label" for="b1"></label>',
      '<gaia-checkbox id="b1" name="b"></gaia-checkbox>',
      '<gaia-checkbox checked name="b"></gaia-checkbox>',
      '<gaia-checkbox name="b"></gaia-checkbox>'
    ].join('');

    this.checkboxes = this.container.querySelectorAll('gaia-checkbox');
    document.body.appendChild(this.container);
  });

  teardown(function() {
    this.sandbox.restore();
    document.body.removeChild(this.container);
    this.container = null;
  });

  test('It toggled `checked` when clicked', function() {
    this.checkboxes[0].inner.click();
    assert.isTrue(this.checkboxes[0].hasAttribute('checked'));
    this.checkboxes[0].inner.click();
    assert.isFalse(this.checkboxes[0].hasAttribute('checked'));
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
    this.checkboxes[0].setAttribute('checked', '');
    assert.isTrue(this.checkboxes[0].checked);
  });

  test('It responds to setting `.checked` property', function() {
    assert.isFalse(this.checkboxes[0].hasAttribute('checked'));
    this.checkboxes[0].checked = true;
    assert.isTrue(this.checkboxes[0].hasAttribute('checked'));
  });
});