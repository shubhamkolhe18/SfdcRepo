public with sharing class OpportunityProvider{
    @AuraEnabled
    public static void createNewOpportunity(Opportunity objOpp){
        if (objOpp != null) 
           
            Database.insert(objOpp, false);
 }

 @AuraEnabled(cacheable=true)
    public static List<Map<String, Object>> getOpportunities(String stage) {
        List<Map<String, Object>> opportunityList = new List<Map<String, Object>>();
        for (Opportunity opp : [SELECT Id, Name, StageName, Amount FROM Opportunity WHERE IsClosed = true AND StageName = :stage]) {
            Map<String, Object> opportunityMap = new Map<String, Object>{
                'Id' => opp.Id,
                'Name' => opp.Name,
                'StageName' => opp.StageName,
                'Amount' => opp.Amount
            };
            opportunityList.add(opportunityMap);
        }
        return opportunityList;
    }

    @AuraEnabled(cacheable=true)
    public static list<Opportunity> searchOppoRecords(Opportunity objOpp){
        try{
            list<Opportunity> oppList = [SELECT Id, Name, StageName, Amount, CloseDate FROM Opportunity WHERE Name = :objOpp.Name];
            return oppList;
        }
        catch(Exception e){
            System.debug(e.getMessage());
            return null;
        }
    }
}