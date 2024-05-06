sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("flexso.controller.App", {
            
            onEventClick: function (oEvent) {
                var oItem = oEvent.getSource();
                var sEventID = oItem.getBindingContext().getProperty("eventID");
    
                // Navigeer naar de nieuwe view, geef de eventID door
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("RouteEvent", {
                    eventID: sEventID
                });
            }
        });
    });