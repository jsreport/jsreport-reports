define('report.model',["app", "core/basicModel"], function (app, ModelBase) {
    return ModelBase.extend({
        odata: "reports",

        url: function() {
            return "odata/reports(" + this.get("_id") + ")";
        },

        toString: function() {
            return "Report " + (this.get("name") || "");
        }
    });
});


define('report.list.model',["backbone", "app", "report.model", "core/dataGrid"], function (Backbone, app, ReportModel, DataGrid) {
    return Backbone.Collection.extend({
        url: function() {
            var qs =  this.filter.toOData();
            qs.$orderby = "creationDate desc";
            return "odata/reports?" + $.param(qs);
        },

        initialize: function () {
            var self = this;
            this.filter = new DataGrid.Filter.Base();
            this.filter.bind("apply", function () {
                self.fetch();
            });
        },

        parse: function (data) {
            if (this.meta && this.meta["@odata.count"])
                this.filter.set("totalCount", this.meta["@odata.count"]);

            return data;
        },

        model: ReportModel
    });
});


define('report.list.view',["marionette", "core/dataGrid", "jquery"], function (Marionette, DataGrid, $) {

    return Marionette.ItemView.extend({
        template: "report-list",

        initialize: function () {
            this.listenTo(this.collection, "sync", this.render);
            this.listenTo(this.collection, "remove", this.render);
        },

        onDomRefresh: function () {
            this.dataGrid = DataGrid.show({
                collection: this.collection,
                filter: this.collection.filter,
                idKey: "_id",
                onShowDetail: function (id) {
                    window.location.hash = "/extension/reports/" + id;
                },
                el: $("#reportGridBox"),
                headerTemplate: "report-list-header",
                rowsTemplate: "report-list-rows"
            });
        }
    });
});


define('report.list.toolbar.view',["jquery", "app", "core/utils", "core/view.base", "underscore"],
    function ($, app, Utils, LayoutBase) {
        return LayoutBase.extend({
            template: "report-list-toolbar",
            
            initialize: function () {
            },
         
            
            events: {
                "click #deleteCommand": "deleteCommand"
            },
            
            deleteCommand: function() {
                this.contentView.dataGrid.deleteItems();
            }
        });
    });


define('report.detail.view',["core/view.base", "underscore"], function(ViewBase, _) {
    return ViewBase.extend({
        template: "report-detail",

        initialize: function () {
            this.listenTo(this.model, "sync", this.render);
        }
    });
});

define('report.toolbar.view',["jquery", "app", "marionette", "core/utils", "core/view.base"],
    function($, app, Marionette, Utils, LayoutBase) {
        return LayoutBase.extend({
            template: "report-toolbar",

            initialize: function() {
                var self = this;
                this.listenTo(this, "render", function() {
                    var contextToolbar = {
                        name: "report-detail",
                        model: self.model,
                        region: self.extensionsToolbarRegion,
                        view: self
                    };
                    app.trigger("toolbar-render", contextToolbar);
                });
            },

            regions: {
                extensionsToolbarRegion: {
                    selector: "#extensionsToolbarBox",
                    regionType: Marionette.MultiRegion
                }
            }
        });
    });
define('dashboard.reports.model',["app", "backbone", "report.model"], function (app, Backbone, ReportModel) {
    return Backbone.Collection.extend({

        url: function() {
            return "odata/reports?$orderby=creationDate desc&$top=4";
        },

        model: ReportModel
    });
});

define('dashboard.reports.view',["marionette"], function (Marionette) {
    
    return Marionette.ItemView.extend({
        template: "dashboard-reports",
    
        events: {
            "click tr": "showDetail"
        },
    
        initialize: function() {
            this.listenTo(this.collection, "sync", this.render);
        },
    
        showDetail: function (ev, data) {
            var id = $(ev.target).closest("tr").attr("data-id");
            window.location.hash = "extension/reports/" + id;
        }
    });
});
define('report.templateToolbar.view',["app", "underscore", "core/view.base", "core/utils", "jquery"], function(app, _, ViewBase, Utils, $) {
    return ViewBase.extend({
        tagName: "li",
        template: "report-template-toolbar",

        initialize: function() {
            _.bindAll(this, "renderReport", "onReportRender");
        },
       
        events: {
           "click #renderCommand": "renderReport"
        },

        linkToTemplateView: function(view) {
            this.templateView = view;
            this.templateView.beforeRenderListeners.add(this.onReportRender);
        },

        onReportRender: function(request, cb) {
            if (this.processingReport) {
                request.options.saveResult = true;
            }
            this.processingReport = false;

            cb();
        },

        renderReport: function() {
            app.trigger("toastr:info", "Report generation processing ...");
            this.processingReport = true;
            this.templateView.preview();
        }
    });
});
define(["app", "marionette", "backbone",
        "report.list.model", "report.list.view", "report.list.toolbar.view",
        "report.model", "report.detail.view", "report.toolbar.view",
        "dashboard.reports.model", "dashboard.reports.view", "report.templateToolbar.view"],
    function (app, Marionette, Backbone, ReportListModel, ReportListView, ReportListToolbarView, ReportModel, ReportDetailView, ReportToolbarView, DashboardModel, DashboardView, TemplateToolbarView) {
        app.module("report", function (module) {
            var Router = Backbone.Router.extend({
                routes: {
                    "extension/reports": "report",
                    "extension/reports/:id": "reportDetail"
                },

                report: function () {
                    this.navigate("/extension/reports");

                    var model = new ReportListModel();

                    app.layout.showToolbarViewComposition(new ReportListView({ collection: model }), new ReportListToolbarView({ collection: model }));

                    model.fetch();
                },

                reportDetail: function (id) {
                    var model = new ReportModel();
                    model.set("_id", id);
                    model.fetch({
                        success: function (x) {
                            app.layout.showToolbarViewComposition(new ReportDetailView({ model: model }), new ReportToolbarView({ model: model }));
                        }
                    });
                }
            });

            app.report.router = new Router();


            app.on("menu-render", function (context) {
                context.result += "<li><a href='#/extension/reports'>Reports</a></li>";
            });

            app.on("dashboard-extensions-render", function (region) {
                var model = new DashboardModel();
                region.show(new DashboardView({
                    collection: model
                }), "reports");
                model.fetch();
            });

            app.on("toolbar-render", function (context) {
                if (context.name === "template-detail") {
                    var view = new TemplateToolbarView({model: context.model});
                    view.linkToTemplateView(context.view);
                    context.region.show(view, "render");
                }
            });
        });
    });
