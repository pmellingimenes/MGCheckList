import Backbone from 'backbone';
import Mn from 'backbone.marionette';
import ListView from './ListView';
import TodoList from './TodoList';
import RootLayout from './RootLayout';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import Router from './Router';

const filterState = new Backbone.Model({
  filter: 'all'
});
const filterChannel = Backbone.Radio.channel('filter');
filterChannel.reply('filterState', function () {
  return filterState;
});

export default Mn.Application.extend({
  setRootLayout: function () {
    this.root = new RootLayout();
  },
  onStart () {
    this.setRootLayout();
    var app = this;
    var Controller = Mn.Object.extend({
      initialize: function () {
        this.todoList = new TodoList();
      },
      start: function () {
        this.showHeader(this.todoList);
        this.showFooter(this.todoList);
        this.showTodoList(this.todoList);
        this.todoList.on('all', this.updateHiddenElements, this);
        this.todoList.fetch();
      },

      updateHiddenElements: function () {
        $('#main, #footer').toggle(!!this.todoList.length);
      },

      showHeader: function (todoList) {
        var header = new HeaderLayout({
          collection: todoList
        });
        app.root.showChildView('header', header);
      },

      showFooter: function (todoList) {
        var footer = new FooterLayout({
          collection: todoList
        });
        app.root.showChildView('footer', footer);
      },

      showTodoList: function (todoList) {
        app.root.showChildView('main', new ListView({
          collection: todoList
        }));
      },

      filterItems: function (filter) {
        var newFilter = filter && filter.trim() || 'all';
        filterChannel.request('filterState').set('filter', newFilter);
      }
    });
    var controller = new Controller();
    controller.router = new Router({
      controller: controller
    });
    controller.start();
    Backbone.history.start();
  }
});
