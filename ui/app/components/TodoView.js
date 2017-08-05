import Mn from 'backbone.marionette';

export default Mn.View.extend({
  url: 'http://localhost:8000/tarefa/',
  tagName: 'li',

  template: '#template-todoItemView',

  className: function () {
    return this.model.get('completed') ? 'completed' : 'active';
  },

  ui: {
    edit: '.edit',
    destroy: '.destroy',
    label: 'label',
    toggle: '.toggle'
  },

  events: {
    'click @ui.destroy': 'deleteModel',
    'dblclick @ui.label': 'onEditClick',
    'keydown @ui.edit': 'onEditKeypress',
    'focusout @ui.edit': 'onEditFocusout',
    'click @ui.toggle': 'toggle'
  },

  modelEvents: {
    change: 'render'
  },

  deleteModel: function () {
    this.model.destroy();
  },

  toggle: function () {
    this.model.toggle().save();
  },

  onEditClick: function () {
    this.$el.addClass('editing');
    this.ui.edit.focus();
    this.ui.edit.val(this.ui.edit.val());
  },

  onEditFocusout: function () {
    var todoText = this.ui.edit.val().trim();
    if (todoText) {
      this.model.set('title', todoText).save();
      this.$el.removeClass('editing');
    } else {
      this.destroy();
    }
  },

  onEditKeypress: function (e) {
    var ENTER_KEY = 13;
    var ESC_KEY = 27;

    if (e.which === ENTER_KEY) {
      this.onEditFocusout();
      return;
    }

    if (e.which === ESC_KEY) {
      this.ui.edit.val(this.model.get('title'));
      this.$el.removeClass('editing');
    }
  }
});
