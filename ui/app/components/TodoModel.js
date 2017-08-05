import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/rest/tarefa/',
  url: function () {
    if (this.id) {
      return this.urlRoot + this.id + '/';
    } else {
      return this.urlRoot;
    }
  },
  defaults: {
    title: '',
    completed: false,
    created: 0
  },
  initialize: function () {
    if (this.isNew()) {
      this.set('created', new Date());
    }
  },
  toggle: function () {
    return this.set('completed', !this.isCompleted());
  },
  isCompleted: function () {
    return this.get('completed');
  },
  matchesFilter: function (filter) {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'active') {
      return !this.isCompleted();
    }
    return this.isCompleted();
  }
});
