public with sharing class AccountProvider {
    @AuraEnabled
    public static void createNewAccount(Account objAcc){
        if(objAcc != null)
        Database.insert(objAcc, false);
            
    }

    @AuraEnabled
public static Account searchAccountRecords(Account objAcc) {
    Account objAccount = new Account();
    try {
        objAccount = [SELECT Id, Name, Type, Rating, SLAExpirationDate__c, SLA__c FROM Account WHERE Name = :objAcc.Name LIMIT 1];
    } catch (Exception e) {
        System.debug(e.getMessage());
    }
    return objAccount;
}

    @AuraEnabled
    public static  List<Account> searchAccountType(Account objAcc){
        try {
            List<Account> accList ;
            if (objAcc != null) {
                accList = [Select id, NAme, Type, Rating, SLA__c from Account where Type = :objAcc.Type];
            }
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static  List<Account> searchAccountSLAandType(Account objAcc){
        try {
            List<Account> accList ;
            if (objAcc != null) {
                accList = [Select id, NAme, Type, Rating, SLA__c from Account where Type = :objAcc.Type and SLA__c = :objAcc.SLA__c];
            }
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Account> searchAccountRecordByAlphabet(String SearchKey){
        try {
            String SearchString = '%'+SearchKey+'%' ;
            if (!String.isBlank(SearchKey)) {
                 return  [select id, Name, Type from Account where Name like : SearchString];
            }else{
                return null;
            }
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> searchAccounts(String accountName) {
        String searchTerm = '%' + accountName + '%';
        return [SELECT Id, Name, Type FROM Account WHERE Name LIKE :searchTerm];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountRecords() {
        return [SELECT Id, Name, Industry FROM Account LIMIT 10]; // Modify the query as needed to fetch desired fields and conditions
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccWithCon(){
         return [SELECT id, Name, Phone, Rating, (select id, FirstName, LastName, Phone FROM contacts) from Account];
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name, AnnualRevenue, Industry, Phone from Account];
    }

}