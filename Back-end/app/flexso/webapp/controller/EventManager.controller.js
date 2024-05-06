sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function (Controller, MessageToast, JSONModel, Fragment) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function () {

            var oModel = new JSONModel({
                newEvent: {
                    name: "",
                    description: "",
                    date: null,
                    location: "",
                   // sessions: []
                }
            });
            
            // Stel een JSON-model in voor sessies als tijdelijke opslag
            var oSessionModel = new JSONModel({ 
                newSessions: {
                    name: "",
                    type: "",
                    description: "",
                    speaker: "",
                    date: null,
                    room: "",

            } });
            
            this.getView().setModel(oModel, "eventForm");
            this.getView().setModel(oSessionModel, "sessionModel");
        },

        onNavBack: function () {
            // Afhandeling van navigatie terug
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("home", {}, true );
            }
        },

        onAddSession: function () {
           
            var oSessionModel = this.getView().getModel("sessionModel").getData();
            var aSessions = oSessionModel.getProperty("/sessions");
            aSessions.push({ name: "", type: "", description: "", speaker: "", date: "", room: "" });
            oSessionModel.setProperty("/sessions", aSessions);
            
            MessageToast.show("New session added.");
        },

        onSaveEvent: function () {
            
            var oEventForm = this.getView().byId("eventForm");
            var oSessionModel = this.getView().getModel("sessionModel");
            var aSessions = oSessionModel.getProperty("/sessions");

            // Event data
            var oEventData = {
                name: oEventForm.byId("_IDGenInput1").getValue(),
                description: oEventForm.byId("_IDGenInput2").getValue(),
                date: oEventForm.byId("_IDGenDatePicker1").getValue(),
                location: oEventForm.byId("_IDGenInput3").getValue(),
                sessions: aSessions
            };

            // Communiceer met backend
            var oODataModel = this.getView().getModel(); 
            oODataModel.create("/Events", oEventData, {
                success: function () {
                    MessageToast.show("Event saved successfully.");
                },
                error: function (oError) {
                    MessageToast.show("Error saving event.");
                }
            });
        }
    });
});

/*
 sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("flexso.controller.EventManager", {
        onInit: function () {
            var oModel = new JSONModel({
                newEvent: {
                    naam: "",
                    beschrijving: "",
                    datum: null,
                    locatie: "",
                    sessions: []
                }
            });
            this.getView().setModel(oModel);
        },

        onAddSession: function () {
            var oModel = this.getView().getModel();
            var aSessions = oModel.getProperty("/newEvent/sessions");

            aSessions.push({
                naam: "",
                type: "",
                beschrijving: "",
                spreker: "",
                datum: null,
                lokaalnummer: ""
            });

            oModel.setProperty("/newEvent/sessions", aSessions);
            MessageToast.show("Session added.");
        },

        onDeleteSession: function (oEvent) {
            var oModel = this.getView().getModel();
            var aSessions = oModel.getProperty("/newEvent/sessions");
            var oItem = oEvent.getParameter("listItem");
            var iIndex = oItem.getBindingContext().getPath().split("/").pop();

            aSessions.splice(iIndex, 1);
            oModel.setProperty("/newEvent/sessions", aSessions);
            MessageToast.show("Session deleted.");
        },

        onSaveEvent: function () {
            var oModel = this.getView().getModel();
            var oEvent = oModel.getProperty("/newEvent");

            MessageToast.show("Event saved: " + JSON.stringify(oEvent));
        },

        onNavBack: function () {
            var oHistory = sap.ui.core.routing.History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.back();
            } else {
                var oRouter = this.getOwnerComponent().getRouter();
                oRouter.navTo("home", {}, true);
            }
        }
    });
});
*/
