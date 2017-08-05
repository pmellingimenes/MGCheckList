import Backbone from 'backbone';
import TodoModel from './TodoModel';

export default Backbone.Collection.extend({
  url: 'http://localhost:8000/tarefa/',
  model: TodoModel,
  comparator: 'created',

  getCompleted: function () {
    return this.filter(this._isCompleted);
  },

  getActive: function () {
    return this.reject(this._isCompleted);
  },

  _isCompleted: function (todo) {
    return todo.isCompleted();
  }
});
