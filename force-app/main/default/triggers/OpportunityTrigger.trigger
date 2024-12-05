trigger OpportunityTrigger on Opportunity (before insert, before update) {
    if(Trigger.isInsert && Trigger.isBefore){
        OpportunityTriggerHandler.updateDesc(Trigger.New);        
    }
    if(Trigger.isUpdate && Trigger.isBefore){
        OpportunityTriggerHandler.updateDesc(Trigger.new);        
    }
}