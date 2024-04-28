sap.ui.define([
    "sap/ui/core/mvc/Controller",
<<<<<<< HEAD
    "sap/ui/core/UIComponent"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, UIComponent) {
        "use strict";

        return Controller.extend("flexso.controller.Startpage", {
            
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
=======
    "sap/ui/model/odata/v4/ODataModel"
], function (Controller, ODataModel) {
    "use strict";

    return Controller.extend("flexso.controller.Startpage", {
        onInit: function () {
            var sServiceUrl = "/odata/v2/event/"; // Het pad naar je OData-service
            var oModel = new ODataModel(sServiceUrl); // Stel het model in
            this.getView().setModel(oModel, "events"); // Verbind het model aan de view
        }
    });
});

>>>>>>> 685f207 (New files added)
