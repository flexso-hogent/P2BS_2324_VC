sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel", // Correct model voor lokale gegevens
    "sap/ui/model/odata/v2/ODataModel" // Correct importpad voor ODataModel (voor OData V2)
], function (Controller, MessageToast, JSONModel, ODataModel) {
    "use strict";

    return Controller.extend("flexso.controller.SessionManager", {
        onInit: function () {
            // Gebruik JSONModel voor lokale gegevensopslag
            var sessionModel = new JSONModel({
                name: "",
                type: "",
                description: "",
                speaker: "",
                date: null,
                room: ""
            });
            this.getView().setModel(sessionModel, "sessionModel");

            // Stel het OData-model in voor backend-communicatie
            var oDataServiceUrl = this.getOwnerComponent().getMetadata().getManifestEntry("sap.app").dataSources.mainService.uri;
            var oODataModel = new ODataModel(oDataServiceUrl);
            this.getView().setModel(oODataModel);
        },
        
        onNavBack: function () {
            this.getOwnerComponent().getRouter().navTo("eventsPage");
        },

        onSaveSession: function () {
            var oSessionData = this.getView().getModel("sessionModel").getData();

            var oODataModel = this.getView().getModel(); 
            oODataModel.create("/Sessions", oSessionData, {
                success: function () {
                    MessageToast.show("Session saved successfully.");
                },
                error: function () {
                    MessageToast.show("Error saving session.");
                }
            });
        }
    });
});
