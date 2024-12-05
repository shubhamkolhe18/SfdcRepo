public with sharing class LeadProvider {
    @AuraEnabled
    public static void createLead(Lead objLead){
        
        if(objLead != null)

        Database.insert(objLead , false);
    }
}