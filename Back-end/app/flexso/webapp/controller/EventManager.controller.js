sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function () {
            // OData model voor nieuwe events
            var sServiceUrl = "/odata/v2/event/"; 
            var oODataModel = new ODataModel(sServiceUrl, true);
            this.getView().setModel(oODataModel, "eventModel");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        },

        onSaveEvent: function () {
            var oEventData = this.getView().getModel("eventModel").getData();
            var oODataModel = this.getView().getModel("eventModel");
            oODataModel.create("/Events", oEventData, {
                success: function () {
                    MessageToast.show("Event created successfully.");
                },
                error: function () {
                    MessageToast.show("Error creating event.");
                }
            });
        },

        onAddSessions: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("addSessionsPage", {
                eventId: this.getView().getModel("eventModel").getData().id
            });
        }
    });
});
