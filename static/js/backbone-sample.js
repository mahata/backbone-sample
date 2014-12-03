$(function() {
    var Entry = Backbone.Model.extend({
        defaults: function() {
            title: "new entry title..."
        }
    });

    var EntryList = Backbone.Collection.extend({
        model: Entry
    });

    // var Entries = new EntryList;

    var EntryView = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#entry-template").html()),

        events: {
            "dbclick .entry-title": "dbclickDummy"
        },

        initialize: function() {
            // this.listenTo(this.model, "change", this.render);
        },

        render: function() {
            console.log("render method is called.");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        dbclickDummy: function() {
            console.log("dbclickDummy is called.");
        }
    });

    var EntryListView = Backbone.View.extend({
        el: $("#entry-view"),
        events: {
            "click #submit-button": "callApi"
        },

        initialize: function() {
            // this.listenTo(Entries, "add", this.add);
            this.model.bind("add", this.render, this);
        },

        render: function() {
            // console.log("render is called.");
            var entryListEl = $("#entry-list");
            entryListEl.empty();

            this.model.each(function(entry) {
                var view = new EntryView({ model: entry });
                view.render();
                entryListEl.append(view.el);
            });
        },

        // add: function(entry) {
        //     console.log("add is called.");
        // },

        callApi: function() {
            var self = this;
            console.log("callApi is called.");
            $.ajax({
                url: "/dummy-api"
            }).done(function(data) {
                // console.log("ajax request done: ", self.model, data);
                console.log(self.model);
                self.model.add(new Entry({
                    title: "Hello, new Entry"
                }));
            });

            return false;
        }
    });

    new EntryListView({ model: new EntryList() });
});
