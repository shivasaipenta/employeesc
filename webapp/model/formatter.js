sap.ui.define([
    "sap/ui/core/format/DateFormat",
    "sap/ui/core/format/NumberFormat"
],function(DateFormat,NumberFormat){
    "use strict"
    return{
   
        formatDate:function(Doj){
           var oDateFormatter = DateFormat.getDateTimeInstance({
                pattern:"dd-MM-yyyy"
            },sap.ui.getCore().getConfiguration().getLocale());           
            return oDateFormatter.format(Doj);
        },
        formatDateForCU:function(Doj){
            var oDateFormatter = DateFormat.getDateTimeInstance({
                 pattern:"YYYY-MM-DDTHH:MM:SS" 
             },sap.ui.getCore().getConfiguration().getLocale());           
             return oDateFormatter.format(Doj);
         },
        formatCurrency:function(Salary){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance({
                showMeasure:false,
                pattern:"#,##,##0.00"
            },sap.ui.getCore().getConfiguration().getLocale());
            return oCurrencyFormat.format(Salary);
        },
        formatSkill(Skill){
            if(Skill==="ABAP"){
                return 'Warning'
            }
            else if (Skill==="SAPUI5"){
                return 'Success'
            }
            else{
                return 'Error'
            }
        },
        formatDesig:function(Designation){
            if(Designation==="TEAMLEAD"){
                return Designation+" (TL)";
            }
            else if(Designation==="MANAGER"){
                return Designation+"(M)"
            }
            else if(Designation==="SENIOR SOFTWARE ENGINEER"){
                return Designation+"(SSE)"
            }
            else if(Designation==="CONSULTANT"){
                return Designation+"(C)"
            }
            else if(Designation==="SOFTWARE ENGINEER"){
                return Designation+"(SE)"
            }
            
            
        }



        
    }
});