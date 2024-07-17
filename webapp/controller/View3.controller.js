sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "employeesc/model/formatter",

],
function (Controller,MessageBox,formatter) {
    "use strict";

    return Controller.extend("employeesc.controller.View3", {  

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteView3").attachPatternMatched(this.onPatternMatched, this);
         
         },
         
         onPatternMatched: function(oEvent) {
            var empId = oEvent.getParameter("arguments").key;
            this.mode = empId;

            if (empId === "c") {
                this.getView().byId("idPage3").setTitle("Create a new Employee");
                this.getOwnerComponent().getModel("CreateNUpdate").setData({}); //to set model empty 
            } else {
                this.getView().byId("idPage3").setTitle("Edit employee - " + empId);
                var oModel = this.getOwnerComponent().getModel("oModel");
                var CreateNUpdate = this.getOwnerComponent().getModel("CreateNUpdate");

                oModel.read("/EmployeeSet('" + empId + "')", {
                    success: function(data) {
                        CreateNUpdate.setData(data);
                    },
                    error: function(error) {
                        console.error("Failed to read employee data", error);
                    }
                });
            }
        },
       
        onPressSave(){
            var oModel = this.getView().getModel("oModel");
            var data = this.getOwnerComponent().getModel("CreateNUpdate").getData();

            if(this.mode==="C"){
                oModel.create("/EmployeeSet",data,{
                    success:function(req,res){
                        MessageBox.success("success");
                        this.getOwnerComponent().readEmployees();
                    }.bind(this),
                    error(error){
                        MessageBox.error("Error");
                    }
                });
            }
            else{
                oModel.update("/EmployeeSet('" + data.Empid + "')", data, {
                    success:function(){
                        MessageBox.success("success");
                        this.getOwnerComponent().readEmployees();
                    }.bind(this),
                    error(error){
                        MessageBox.error("Error");
                    }
                });
            }
        },
         onBack(){
            history.go(-1);
        }
    });
});
