public class ContactController {
    @AuraEnabled
    public static void createContact(String firstName, String lastName, String email){
        contact newContact = new contact(
        FirstName = firstName,
        LastName = lastName,
        Email = email,
        AccountId = UserInfo.getUserId()
        );
        insert newContact;
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact() {
        return [SELECT Id, Name, Phone, LeadSource, Title FROM Contact];
    }
}