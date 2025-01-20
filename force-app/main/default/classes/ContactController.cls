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

    @AuraEnabled
    public static List<Contact> retrieveContact() {
        return [Select id,Name, Phone, LeadSource, Title from Contact];
    }
}