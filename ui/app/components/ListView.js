import Backbone from 'backbone';
import Mn from 'backbone.marionette';
import TodoView from './TodoView'
var filterChannel = Backbone.Radio.channel('filter');
var ListViewBody = Mn.CollectionView.extend({
  tagName: 'ul',

  id: 'todo-list',

  childView: TodoView,

  filter: function (child) {
    var filteredOn = filterChannel.request('filterState').get('filter');
    return child.matchesFilter(filteredOn);
  }
});

export default Mn.View.extend({
  template: '#template-todoListView',
  regions: {
    listBody: {
      el: 'ul',
      replaceElement: true
    }
  },

  ui: {
    toggle: '#toggle-all'
  },

  events: {
    'click @ui.toggle': 'onToggleAllClick'
  },

  collectionEvents: {
    'change:completed': 'render',
    all: 'setCheckAllState'
  },
  initialize: function () {
    this.listenTo(filterChannel.request('filterState'), 'change:filter', this.render, this);
  },
  setCheckAllState: function () {
    function reduceCompleted (left, right) {
      return left && right.get('completed');
    }
    var allCompleted = this.collection.reduce(reduceCompleted, true);
    this.ui.toggle.prop('checked', allCompleted);
    this.$el.parent().toggle(!!this.collection.length);
  },
  onToggleAllClick: function (e) {
    var isChecked = e.currentTarget.checked;

    this.collection.each(function (todo) {
      todo.save({ completed: isChecked });
    });
  },
  onRender: function () {
    this.showChildView('listBody', new ListViewBody({
      collection: this.collection
    }));
  }
});

