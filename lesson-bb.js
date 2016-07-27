// Events
var myEvents = _.extend({}, Backbone.Events);

// Model
var AppData = Backbone.Model.extend({
  url: '/model.json'
});

var appData = new AppData();

// Views
var MainPage = Backbone.View.extend({
  el: $("#pages-output"),
  model: appData,
  template: _.template($('#main-page').html()),
  events: {
    'click .close': 'close'
  },
  render: function() {
    this.model.fetch({
      success: () => {
        $(this.el).html(this.template(this.model.toJSON()));
      }
    });
  },
  close: function() {
    $(this.el).empty();
  }
});

var AboutPage = Backbone.View.extend({
  el: $("#pages-output"),
  template: _.template($('#about-page').html()),
  initialize: function(){
    myEvents.on('pabam', this.render, this);
  },
  render: function(){
    $(this.el).html(this.template());
  }
});

myEvents.on('pabam', function(){
  console.log('pabam!');
});

var mainPage = new MainPage();
var aboutPage = new AboutPage();

// Routers
var Controller = Backbone.Router.extend({
  routes: {
    "": "main",
    "!/about": "about"
  },
  main: function() {
    if(mainPage){
      mainPage.render();
    }
  },
  about: function() {
    if(aboutPage){
      aboutPage.render();
    }
  }
});

var controller = new Controller();
Backbone.history.start();