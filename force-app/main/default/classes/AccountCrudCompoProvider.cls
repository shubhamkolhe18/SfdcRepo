public with sharing class AccountCrudCompoProvider {
    @AuraEnabled
public static String createNewAccount(Account objAcc) {
        try {
            Database.insert(objAcc, false);
            return 'Record has been created..!!';
        } catch (Exception e) {
            return 'Record creation failed..!!';
        }
   }

   @AuraEnabled
   public static Account searchAccountRecord(Account objAcc){
    try {
        Account objAccount =   [select Id, Name, Type, SLA__c,Phone, Rating,CreatedDate from Account where Name = : objAcc.Name LIMIT 1];
        return objAccount;

    } catch (Exception e) {
        System.debug(e.getMessage());
        return null;
    }
   }

   @AuraEnabled
   public static Account updateAccountRecord(Account objAcc){
    try {
        if (objAcc !=null) {
            Database.update(objAcc, false);
        }
        return [select Id, Name, Type, SLA__c, Phone from Account where Id = :objAcc.Id LIMIT 1];
    } catch (Exception e) {
        RETURN NULL;
    }
   }

   @AuraEnabled
   public static string deleteAccountRecord(Account objAcc){
    try {
        if(objAcc != null){
            Database.delete(objAcc,false);
        }
        return 'Record '+objAcc.Name+' has been deleted successfully...!!!';
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
   public static string undeleteAccountRecord(Account objAcc){
    try {
        if(objAcc != null){
         undelete  [select Id from Account where Name=:objAcc.Name ALL ROWS]; 
        }
        return 'Record has been undeleted successfully...!!';
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }

   @AuraEnabled
public static Account updateAccountAndContactRecord(Account objAcc) {
    try {
        if (objAcc != null) {
            Account existingAccount = [SELECT Id, Name, Type, Phone FROM Account WHERE Id = :objAcc.Id LIMIT 1];
            existingAccount.Phone = objAcc.Phone;
            
            update existingAccount;
            
            List<Contact> associatedContacts = [SELECT Id, Phone FROM Contact WHERE AccountId = :existingAccount.Id];
            
            for (Contact contact : associatedContacts) {
                contact.Phone = objAcc.Phone;
            }
            
            update associatedContacts;
            return existingAccount;
        }
        return null;
    } catch (Exception e) {
        System.debug(e.getMessage());
        return null;
    }
}
}