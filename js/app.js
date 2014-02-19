App = Ember.Application.create({});

var items = [{
  id: '1',
  title: "Ember Application Development",
  author: { name: "stryker" },
  date: new Date('01-27-2014'),
  excerpt: "Ember.js is an opinionated framework, similar to rails",
  body: "I want this for my ORM, I want that for my template language, and let's finish it off with this routing library. Of course, you're going to have to know what you want, and you'll rarely have your horizon expanded if you always order the same thing, but there it is. It's a very popular way of consuming software.\n\nEmber is not that."
}, {
  id: '2',
  title: "The Ember Developer",
  author: { name: "tron" },
  date: new Date('12-24-2013'),
  excerpt: "As a developer having wide variety of interest, Ember should make you feel right at home",
  body: "this text along with its source code should help you transition to the next level"  
}];

App.Router.map(function() {
  // this.resource('index');
  this.resource('about');
  this.resource('items', function() {
    this.resource('item', { path: ':item_id' });
  });
});

App.ItemsRoute = Ember.Route.extend({
  model: function() {
    return items;
  }
});

App.ItemRoute = Ember.Route.extend({
  model: function(params) {
    return items.findBy('id', params.post_id);
  }
});

App.ItemController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
    this.get('store').commit();
  }
});

// App.IndexRoute = Ember.Route.extend({
//   model: function(params) {
//     return items.findBy('title', params.search);
//   }
// });
App.IndexController = Ember.ArrayController.extend({

  actions:{
     results: function(params) {
      console.log('searching results from action for: ' + params);
      var result = [];
      items.map(function(item){
        if(item.title.indexOf(params)!=-1){
          result.push(item);
        }
      });
      console.log(result.length);
      return result;
    }
  }
});
var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
