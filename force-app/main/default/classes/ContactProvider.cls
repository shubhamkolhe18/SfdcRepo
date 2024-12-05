public class ContactProvider {
    @AuraEnabled
    public static  List<Contact> searchContactRecords(Contact objCon){
        try {
            List<Contact> conList = [Select ID, Name, Phone, Email, LeadSource from Contact where Name =: objCon.Name];
            return conList;
        } catch (Exception e) {
            System.debug(e.getMessage());
            return null;
        }
    }
}