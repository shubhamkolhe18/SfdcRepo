trigger OpportunityLineItemTrigger on OpportunityLineItem (after insert, after update, after delete, before update) {
	
    set<Id> productIds = new set<Id>();
    Map<Id, Decimal> quantityDifferenceMap = new Map<Id, Decimal>();
    
    if(Trigger.IsInsert) {
        for(OpportunityLineItem oli : Trigger.new){
            productIds.add(oli.Product2Id);
        }  
    }
    
    if(Trigger.IsUpdate) {
        for(OpportunityLineItem oli : Trigger.new){
            productIds.add(oli.Product2Id);
        }
    	
        for(OpportunityLineItem oli : Trigger.new){
            OpportunityLineItem oldOli = Trigger.oldMap.get(oli.Id);
            if(oli.Quantity != oldOli.Quantity){
                Decimal quantityDifference = oli.Quantity - oldOli.Quantity;
                quantityDifferenceMap.put(oli.Product2Id, quantityDifference);
            }
        }
    }
}