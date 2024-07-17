sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "employeesc/model/formatter",
    "sap/ui/export/Spreadsheet",
    "sap/ui/model/Filter",
    "sap/m/MessageBox",

],
function (Controller,formatter,Spreadsheet,Filter,MessageBox) {
    "use strict";

    return Controller.extend("employeesc.controller.View1", {

        f:formatter,

        onInit: function () {

           
        },
        // onselect(){
        //     var sel = this.getView().byId("sel").getSelectedKey();
        //     alert(sel);

        // },
       onSubmit(){
        var sel = this.getView().byId("sel").getSelectedKey();
        var comb = this.getView().byId("comb").getSelectedKey();
        var  mulc = this.getView().byId("mcomb").getSelectedKeys();
        var radio = this.getView().byId("rb").getSelectedIndex();

       },
       onSelect(oevent){
        var selb  = oevent.getParameter("selectedItem").getKey();
        var sel = this.getView().byId("sel").getSelectedKey();
       },

       onPressRow: function(oEvent) {
        var Empid = oEvent.getSource().getBindingContext("empModel").getProperty("Empid");
        this.getOwnerComponent().getRouter().navTo("RouteView2", { key: Empid });
        
    },
    // onPressRow(oEvent) {
    //     const oItem = oEvent.getSource();
    //     const oRouter = this.getOwnerComponent().getRouter();
    //     oRouter.navTo("RouteView2", {
    //         key: window.encodeURIComponent(oItem.getBindingContext("empModel").getProperty("Empid"))
    //     });
    // },

       onSelectRow(){
        var selr = this.getView().byId("table02").getSelectedItem().getBindingContext("localData").getProperty("Empid");
       },
       onPressGo(){
        var empid = this.getView().byId("idEmpid").getValue();

        var aFilters=[];

        // filters = new Filter.push(Filter Empid eq "empid");

        if(empid!=""){
            aFilters.push(new Filter("Empid","EQ",empid));
        }

        this.getOwnerComponent().readEmployees(aFilters);

       },
       onPressReset(){
        this.getView().byId("idEmpId").setValue("");
        this.getOwnerComponent().readEmployees([]);

       },
       onPressCreate(){
        this.getOwnerComponent().getRouter().navTo("RouteView3",{
            key: "c"
        });
       },
       onPressEdit(){
        var Empid = this.getView().byId("table01").getSelectedItem().getBindingContext("empModel").getProperty("Empid");
        this.getOwnerComponent().getRouter().navTo("RouteView3",{
            key: Empid
        });
       },
       onPressDelete(){
        var Empid= this.getView().byId("table01").getSelectedItem().getBindingContext("empModel").getProperty("Empid");
        var oModel = this.getView().getModel("oModel");
        oModel.remove("/EmployeeSet('" + Empid + "')", {
            success:function(){
                MessageBox.success("Employee deleted");
                this.getOwnerComponent().readEmployees();
            }.bind(this),
            error(error){
                MessageBox.error("Error");
            }
        });
       },
  
        onExportToXL:function(){
            var aCols=[
                {
                    label:"Employee ID",
                    property:"Empid"
                },
                {
                    label:"Employee Name",
                    property:"Name"
                },
                {
                    label:"Designation",
                    property:"Desig"
                },
                {
                    label:"Skill",
                    property:"Skill"
                },
                {
                    label:"Status",
                    property:"Status"
                },
                {
                    label:"Salary",
                    property:"Salary",
                    type:"Number",
                    delimiter:true,
                    scale:2
                },
                {
                    label:"Email",
                    property:"Email",
                    
                },
                {
                    label:"Date of joining",
                    property:"Doj",
                    type:"Date",
                    format:"dd-MM-yyyy"
                }
];
        var oSettings={
            workbook:{
                columns:aCols
            },
            dataSource:this.getOwnerComponent().getModel("empModel").getData().results,
            fileName:"Employees.xlsx"
        };
        var oSpreadSheet = new SpreadSheet(oSettings);
        oSpreadSheet.build().then(function(){
            MessageBox.success("Table exported successfully");
        }).finally(function(){
            oSpreadSheet.destroy();
        });
        }
    });
});
