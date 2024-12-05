public class AccountContactFieldUpdation {
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