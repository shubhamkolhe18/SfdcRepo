public with sharing class AccountController {
	@AuraEnabled
	public static Account createAccount(Account acc){
		try{
			insert acc;
			return acc;
		} catch (Exception e){
			throw new AuraHandledException(e.getMessage());
		}
	}
}