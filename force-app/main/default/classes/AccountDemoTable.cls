public with sharing class AccountDemoTable {
    public static List<Account> getAccountDemoTable() {
        try {
            return [Select Id, Name, Rating, Phone, Type from Account];
        } catch (Exception e) {
            return null;
        }
    }

    @AuraEnabled
    public static  List<Account> searchAccountRecords(Account objAcc){
        try {
            List<Account> accList = [Select ID, Name, Type, SLA__c, Rating from Account where Name =: objAcc.Name];
            return accList;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }

    @AuraEnabled
    public static List<Account> searchAccountRecordByAlphabet(String SearchKey){
        try {
            String SearchString = '%'+SearchKey+'%' ;
            if (!String.isBlank(SearchKey)) {
                List<Account> accList =  [select id, Name, Type from Account where Name like : SearchString];
                return accList;
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static list<Account> accountTotalRecord(){
        try {
            list<Account> accList = [select id, Name, Rating, type from Account];
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static list<Contact> searchContacts(Account objAcc){
        try {
            Id accId = [Select id from account where Name =: objAcc.Name].id;

            return  [select id, firstName, LastName, Phone, Email from Contact where AccountId =: accId];
        } catch (Exception e) {
            return new List<Contact>();
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccWithCon(){
         return [SELECT id, Name, Phone, Rating, (select id, FirstName, LastName, Phone FROM contacts) from Account];
    }
}