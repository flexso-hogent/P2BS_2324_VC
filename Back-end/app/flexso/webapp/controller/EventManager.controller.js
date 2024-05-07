sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, ODataModel) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function () {
            // OData model voor nieuwe events
            var eventModel = new ODataModel({
                name: "",
                description: "",
                date: null,
                location: ""
            });
            this.getView().setModel(eventModel, "eventModel");
        },

        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("home");
        },

        onSaveEvent: function () {
            var oEventData = this.getView().getModel("eventModel").getData();

            // Communiceer met backend om event te creëren
            var oODataModel = this.getView().getModel(); 
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
