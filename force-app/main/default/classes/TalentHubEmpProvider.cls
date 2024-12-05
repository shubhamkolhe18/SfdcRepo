public with sharing class TalentHubEmpProvider {
    
    @AuraEnabled
    public static Employee__c searchEmpRecords(Employee__c objEmp){
        Employee__c objEmployee = new Employee__c();

        try {
            return [Select Id, Name, Employee_Name__c, Mobile__c, Address__c from Employee__c where Name =: objEmp.Name LIMIT 1];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}