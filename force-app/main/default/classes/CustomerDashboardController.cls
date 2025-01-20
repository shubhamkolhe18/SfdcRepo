public class CustomerDashboardController {

    @AuraEnabled(cacheable=true)
    public static Customer_Detail__c getCustomerDetails(Id customerId) {
        return [SELECT Id, Name, First_Name__c, Last_Name__c, Phone_Number__c, Email__c, Bank_Account__c 
                FROM Customer_Detail__c WHERE Id = :customerId LIMIT 1];
    }

    @AuraEnabled(cacheable=true)
    public static List<Bank_Account__c> getCustomerBankDetails(Id customerId) {
        return [SELECT Id, Name, Account_Balance__c 
                FROM Bank_Account__c 
                WHERE Customer_Detail__c = :customerId];
    }

    @AuraEnabled(cacheable=true)
    public static List<Transaction__c> getRecentTransaction(Id customerId) {
        // Fix: Filter transactions based on the Bank_Account__c related to the Customer_Detail__c
        return [SELECT Id, Transaction_Date__c, Transaction_Amount__c, Transaction_Type__c
                FROM Transaction__c 
                WHERE Bank_Account__c IN (SELECT Id FROM Bank_Account__c WHERE Customer_Detail__c = :customerId) 
                ORDER BY Transaction_Date__c DESC LIMIT 10];
    }

    @AuraEnabled(cacheable=true)
    public static List<Loan__c> getLoanDetails(Id customerId) {
        return [SELECT Id, Loan_Amount__c, Loan_Status__c From Loan__c WHERE Customer_Detail__c = :customerId];
    }

}