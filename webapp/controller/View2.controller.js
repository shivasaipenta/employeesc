sap.ui.define([
    "sap/ui/core/mvc/Controller",
  

],
function (Controller) {
    "use strict";

    return Controller.extend("employeesc.controller.View2", {  

        onInit: function () {
           this.getOwnerComponent().getRouter().getRoute("RouteView2").attachPatternMatched(this.onPatternMatched, this);
        
        },
        
        onPatternMatched: function(oEvent) {
            var empId = oEvent.getParameter("arguments").key;

            // this.getView().bindElement("/EmployeeSet('" + empId + "')");
       
         
                var oModel = this.getOwnerComponent().getModel("oModel");
                var CreateNUpdate = this.getOwnerComponent().getModel("CreateNUpdate");

                oModel.read("/EmployeeSet('" + empId + "')", {

                    urlParameters:{
                        $expand:'toProjects'
                    },

                    success: function(data) {
                        CreateNUpdate.setData(data);
                    },
                    error: function(error) {
                        console.error("Failed to read employee data", error);
                    }
                });
            },
          
        onBack(){
            history.go(-1);
        }

    });
});
