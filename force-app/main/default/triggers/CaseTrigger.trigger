trigger CaseTrigger on Case (after insert) {
	
    Map<Id, String> accountToLatestCaseMap = new Map<Id, String>();
    
    for(Case c : Trigger.new){
        if(c.AccountId != null){
            accountToLatestCaseMap.put(c.AccountId, c.CaseNumber);
        } 
    }
    List<Account> accountToUpdate = [SELECT Id, Latest_Case_Number__c from Account WHERE Id IN :accountToLatestCaseMap.keySet()];
    
    for(Account acc : accountToUpdate){
        acc.Latest_Case_Number__c = accountToLatestCaseMap.get(acc.Id);
    }
    
    if(!accountToUpdate.isEmpty()){
        insert accountToUpdate;
    }
}