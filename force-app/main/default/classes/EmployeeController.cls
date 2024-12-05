public class EmployeeController {
    @AuraEnabled
    public static Id  createEmpRecord(Employee_Detail__c objEmp){
        if(objEmp != null) {
            insert objEmp;
            return objEmp.Id;
        }
        return null;    
    }
}