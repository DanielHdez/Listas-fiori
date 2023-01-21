sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
	"sap/ui/commons/Message"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     */
    function (Controller,
	JSONModel,
	Message) {
        "use strict";

        return Controller.extend("dhl.listas.controller.View1", {
            onInit: function () {
                var JSONModelo = new JSONModel();
                JSONModelo.loadData("../localservice/mockdata/ListData.json");
                this.getView().setModel( JSONModelo);
            },
            getHeaderGroup: function(oGroup){
                var groupHeadrListItem = new sap.m.GroupHeaderListItem({
                    title : oGroup.key,
                    upperCase: true
                });  
                return groupHeadrListItem;
            },

            onShowSelectedRow: function(){
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if ( selectedItems.length === 0){
                    sap.m.MessageToast.show(i18nModel.getText("no_seleccion"))

                }else{
                    var textMessage = i18nModel.getText("seleccion");

                    for( var item in selectedItems){
                        var context=selectedItems[item].getBindingContext();
                        var ocontext = context.getObject();

                        textMessage = textMessage + "-" + ocontext.Material;
                        

                    }

                    sap.m.MessageToast.show(i18nModel.getText(textMessage))
                }
            },
            onDeleteSelectedRow: function(){
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();
                var i18nModel = this.getView().getModel("i18n").getResourceBundle();
                if ( selectedItems.length === 0){
                    sap.m.MessageToast.show(i18nModel.getText("no_seleccion"))

                }else{
                    var textMessage = i18nModel.getText("seleccion");
                    var arrayid = [];
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");
                    for( var item in selectedItems){
                        var context=selectedItems[item].getBindingContext();
                        var ocontext = context.getObject();
                        arrayid.push(ocontext.Id);
                        textMessage = textMessage + "-" + ocontext.Material;
                    }

                    products = products.filter(function(p){
                         return !arrayid.includes(p.Id);   
                    });
                    model.setProperty("/Products", products);
                    standardList.removeSelections();
                    sap.m.MessageToast.show(i18nModel.getText(textMessage))
                }
            },

            onDeleteRow: function(oEvent){
                var selectedRowoEvent = oEvent.getParameter("listItem");
                var context = selectedRowoEvent.getBindingContext();
                var splitPath = context.getPath().split("/");
                var splitPath = context.getPath().split("/");
                var indexSelectedRow = splitPath[splitPath.length-1];
                var model = this.getView().getModel();
                var products = model.getProperty("/Products");
                products.splice(indexSelectedRow,1);
                model.refresh();

            }
        });
    });
