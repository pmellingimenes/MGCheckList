import Backbone from 'backbone'
import Mn from 'backbone.marionette'
import ListView from './ListView'
import TodoList from './TodoList'
import RootLayout from './RootLayout'
import HeaderLayout from './HeaderLayout'
import FooterLayout from './FooterLayout'
import Router from './Router'

const filterState = new Backbone.Model({
  filter: 'all'
})
const filterChannel = Backbone.Radio.channel('filter')
filterChannel.reply('filterState', () => { return filterState })

const appController = {
  filterItems (filter) {
    let newFilter = filter ? filter.trim() : 'all'
    filterChannel.request('filterState').set('filter', newFilter)
  }
}

export default Mn.Application.extend({
  setRootLayout () {
    this.root = new RootLayout()
  },
  router: new Router({
    controller: appController
  }),
  onStart () {
    this.setRootLayout()
    this.todoList = new TodoList()
    this.initializeApplication()
    Backbone.history.start()
  },
  initializeApplication () {
    this.showHeader(this.todoList)
    this.showFooter(this.todoList)
    this.showTodoList(this.todoList)
    this.todoList.on('all', this.updateHiddenElements, this)
    this.todoList.fetch()
  },

  updateHiddenElements () {
    this.root.$el.find('#main, #footer').toggle(!!this.todoList.length)
  },

  showHeader (todoList) {
    let header = new HeaderLayout({
      collection: todoList
    })
    this.root.showChildView('header', header)
  },

  showFooter (todoList) {
    let footer = new FooterLayout({
      collection: todoList
    })
    this.root.showChildView('footer', footer)
  },

  showTodoList (todoList) {
    this.root.showChildView('main', new ListView({
      collection: todoList
    }))
  }
})
