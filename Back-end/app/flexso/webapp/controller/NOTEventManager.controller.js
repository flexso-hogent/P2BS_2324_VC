

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/util/File",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV"
], function (Controller, JSONModel, MessageToast, MessageBox, File, Export, ExportTypeCSV) {
    "use strict";

    return Controller.extend("flexso.controller.NOTEventManager", {
        onInit: function () {
            var that = this;

            // Laad bestaande evenementen en sessies uit CSV-bestanden
            this.loadCsvData("my.event-Events.csv", function (eventsData) {
                var oEventsModel = new JSONModel(eventsData);
                that.getView().setModel(oEventsModel, "events");
            });

            this.loadCsvData("my.event-Sessions.csv", function (sessionsData) {
                var oSessionsModel = new JSONModel(sessionsData);
                that.getView().setModel(oSessionsModel, "sessions");
            });

            // Bereken het volgende beschikbare ID
            var oEventsModel = this.getView().getModel("events");
            var aExistingEvents = oEventsModel.getData();
            var nMaxID = Math.max(...aExistingEvents.map(event => event.eventID));
            var nNextID = nMaxID + 1;

            var oNewEvent = {
                eventID: nNextID,
                naam: "",
                beschrijving: "",
                datum: "",
                locatie: "",
                sessies: []
            };

            var oNewEventModel = new JSONModel(oNewEvent);
            this.getView().setModel(oNewEventModel, "newEvent");
        },

        loadCsvData: function (csvFileName, callback) {
            var sPath = sap.ui.require.toUrl(csvFileName);
            $.get(sPath, function (data) {
                var parsedData = Papa.parse(data, {
                    header: true,
                    dynamicTyping: true
                });
                callback(parsedData.data);
            });
        },

        onAddSession: function () {
            var oModel = this.getView().getModel("newEvent");
            var aSessions = oModel.getProperty("/sessies");

            aSessions.push({
                sessieID: aSessions.length + 1,
                naam: "",
                beschrijving: "",
                spreker: "",
                datum: "",
                lokaalnummer: ""
            });

            oModel.setProperty("/sessies", aSessions);
            MessageToast.show("New session added");
        },

        onSaveEvent: function () {
            var oEventsModel = this.getView().getModel("events");
            var oNewEventModel = this.getView().getModel("newEvent");

            var aExistingEvents = oEventsModel.getData();
            var oNewEvent = oNewEventModel.getData();

            // Voeg het nieuwe evenement toe aan de bestaande lijst
            aExistingEvents.push(oNewEvent);

            // Update de CSV-bestanden
            // Je moet hier de juiste logica implementeren om de data terug naar CSV te exporteren
            this.updateCsvFile("my.event-Events.csv", aExistingEvents);

            MessageBox.success("Event saved successfully!");
        },

        updateCsvFile: function (csvFileName, data) {
            // Implementeer logica om de data terug naar CSV te schrijven
           
        }
    });
});