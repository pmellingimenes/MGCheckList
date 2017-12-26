import Mn from 'backbone.marionette'
export default Mn.View.extend({
  template: '#template-header',
  // UI bindings create cached attributes that
  // point to jQuery selected objects
  ui: {
    input: '#new-todo'
  },

  events: {
    'keypress @ui.input': 'onInputKeypress',
    'keyup @ui.input': 'onInputKeyup'
  },
  // According to the spec
  // If escape is pressed during the edit, the edit state should be left and any changes be discarded.
  onInputKeyup: function (e) {
    var ESC_KEY = 27

    if (e.which === ESC_KEY) {
      this.render()
    }
  },

  onInputKeypress: function (e) {
    var ENTER_KEY = 13
    var todoText = this.ui.input.val().trim()

    if (e.which === ENTER_KEY && todoText) {
      this.collection.create({
        title: todoText
      })
      this.ui.input.val('')
    }
  }
})
