trigger triggerAccount on Account (before insert, before update) {
    if(Trigger.isInsert && Trigger.isbefore){
        AccountTriggerClass.updateRating(Trigger.new);
    }
    if(Trigger.isUpdate && Trigger.isbefore){
        AccountTriggerClass.updateRating(Trigger.new);
    }
}