public class AccountBatchClass implements Database.Batchable<sObject> {

    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([
            Select Id, name, First_Name__c from Customer_Detail__c
        ]);
    }
    
    public void execute(Database.BatchableContext bc, List<Customer_Detail__c> scope){
        for(Customer_Detail__c a : scope){
            a.First_Name__c = 'Mr. ' + a.First_Name__c;
        }
        update scope;
    } 
    
    public void finish(Database.BatchableContext bc){
        system.debug('Account record has been successfully updated');
    }
    
}