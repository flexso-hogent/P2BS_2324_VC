sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	'sap/m/MessageBox',
	'sap/f/library'
], function (JSONModel, Controller, Filter, FilterOperator, Sorter, MessageBox,fioriLibrary) {
	"use strict";

	return Controller.extend("flexso.controller.List", {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
		},
		onListItemPress: function (oEvent) {
			var productPath = oEvent.getSource().getBindingContext().getPath(),
				product = productPath.split("/").slice(-1).pop();

			this.oRouter.navTo("detail", {layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded, eventID: product});
		}

	});
});