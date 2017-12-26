import Mn from 'backbone.marionette'
export default Mn.View.extend({
  el: '#checklistapp',
  regions: {
    header: '#header',
    main: '#main',
    footer: '#footer'
  }
})
