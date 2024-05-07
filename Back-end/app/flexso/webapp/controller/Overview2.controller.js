sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("flexso.controller.Overview", {
        onInit: function () {
            // Initialiseer het routeren
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteEvent").attachPatternMatched(this._onRouteMatched, this);

            // Maak een leeg model aan voor de gegevens
            var oModel = new JSONModel();
            this.getView().setModel(oModel);

            // Haal gegevens op van de backend-service
            this._fetchEvents();
        },

        handleItemPress: function (oEvent) {
			var oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(2),
				supplierPath = oEvent.getSource().getSelectedItem().getBindingContext("products").getPath(),
				supplier = supplierPath.split("/").slice(-1).pop();

			this.oRouter.navTo("app", {layout: oNextUIState.layout,
				product: this._product, supplier: supplier});
		},
    });
});
