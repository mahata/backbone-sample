$(function() {
    var Entry = Backbone.Model.extend({
        defaults: function() {}
    });

    var EntryList = Backbone.Collection.extend({
        model: Entry
    });

    var EntryView = Backbone.View.extend({
        tagName: "li",
        template: _.template($("#entry-template").html()),

        initialize: function() {
            this.model.bind("destroy", this.remove, this);
        },

        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },
    });

    var EntryListView = Backbone.View.extend({
        el: $("#entry-view"),
        events: {
            "click #add-button": "callApi",
            "click #remove-button": "removeEntries"
        },

        initialize: function() {
             this.model.bind("add", this.render, this);
        },

        render: function() {
            var entryListEl = $("#entry-list");
            entryListEl.empty();

            this.model.each(function(entry) {
                var view = new EntryView({ model: entry });
                view.render();
                entryListEl.append(view.el);
            });
        },

        callApi: function() {
            var self = this;

            $.ajax({
                url: "/dummy-api"
            }).done(function(data) {
                $.each(data["list-data"], function(idx, value) {
                    self.model.add(new Entry({ title: value }));
                });
            });

            return false;
        },

        removeEntries: function() {
            _.invoke(this.model.toArray(), "destroy");

            return false;
        }
    });

    new EntryListView({ model: new EntryList() });
});
