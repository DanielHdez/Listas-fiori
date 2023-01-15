sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("dhl.listas.controller.View1", {
            onInit: function () {
                var JSONModelo = new JSONModel();
                JSONModelo.loadData("../localservice/mockdata/ListData.json");
                this.getView().setModel( JSONModelo);
            }
        });
    });
