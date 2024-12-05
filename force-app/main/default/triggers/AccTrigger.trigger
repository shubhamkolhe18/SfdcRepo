trigger AccTrigger on Account (before insert,before Update) {
    
    if(Trigger.isInsert){
        if(Trigger.isBefore){
            AccountTriggerHandler.updateAddress(Trigger.new);
        }
    }
    if(Trigger.isUpdate){
        if(Trigger.isBefore){
            AccountTriggerHandler.updateAddress(Trigger.new);
        }
    }
}