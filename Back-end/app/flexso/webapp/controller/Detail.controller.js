sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("flexso.controller.Detail", {

        onInit: function () {
			var oOwnerComponent = this.getOwnerComponent();

			this.oRouter = oOwnerComponent.getRouter();
			this.oModel = oOwnerComponent.getModel();

			this.oRouter.getRoute("list").attachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").attachPatternMatched(this._onProductMatched, this);
		},

		_onProductMatched: function (oEvent) {// bind with correct item
			this._event = oEvent.getParameter("arguments").eventID || this._event|| "event(1)"; 
			this.getView().bindElement({
				path: "/" + this._event,
				model: "eventModel"
			});

		},

		onExit: function () {
			this.oRouter.getRoute("list").detachPatternMatched(this._onProductMatched, this);
			this.oRouter.getRoute("detail").detachPatternMatched(this._onProductMatched, this);
		}
	});
});