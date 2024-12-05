public class AccountTriggerHandler {
    
    public static void updateAddress(List<Account> acclist){
        for(Account acc : acclist){
            if(acc.CopyBillingToShipping__c &&
               acc.BillingStreet!=null &&
               acc.BillingCity!=null &&
               acc.BillingPostalCode!=null &&
               acc.BillingState!=null &&
               acc.BillingCountry!=null){
                  
                   acc.BillingStreet = acc.ShippingStreet;
                   acc.BillingCity = acc.ShippingCity;
                   acc.BillingPostalCode = acc.ShippingPostalCode;
                   acc.BillingState = acc.ShippingState;
                   acc.BillingCountry = acc.ShippingCountry;
                       
               }
        }
    }
}