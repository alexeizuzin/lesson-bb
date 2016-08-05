// Events
var myEvents = _.extend({}, Backbone.Events);

// Model
var AppData = Backbone.Model.extend({
  url: '/model.json'
});

var appData = new AppData();

// Collection
var AppDataCollection = Backbone.Collection.extend({
  url: 'https://api.github.com/repos/jashkenas/backbone/commits'
});

var appDataCollection = new AppDataCollection();

// Views
var MainPage = Backbone.View.extend({
  el: $("#pages-output"),
  model: appData,
  collection: appDataCollection,
  template: _.template($('#main-page').html()),
  templateList: _.template($('#list-element').html()),
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
  renderList: function() {
    this.collection.fetch({
      success: () => {
        $(this.el).html(this.templateList({
          items: this.collection.toJSON()
        }));
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