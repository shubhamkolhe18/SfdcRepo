trigger createContact on Account (after insert) {
	if(Trigger.isInsert && Trigger.isAfter){
		AccountProviderHandler.createAutoContact(Trigger.new);
	}
}