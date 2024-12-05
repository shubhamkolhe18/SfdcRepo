public with sharing class CustomerController {
    @AuraEnabled(cacheable=true)
    public static List<Customer_Detail__c> getCustomerData() {
        // Query and retrieve customer data
        return [SELECT Id, Name, Address__c, Mobile__c FROM Customer_Detail__c];
    }

    @AuraEnabled
    public static void deleteCustomers(List<Id> customerIds) {
        // Perform deletion of selected customers
        List<Customer_Detail__c> customersToDelete = [
            SELECT Id FROM Customer_Detail__c WHERE Id IN :customerIds
        ];
        delete customersToDelete;
    }

}