/* Generated by TestGen on Tue Aug 8 2023 at 5:49 AM (GMT) */
@isTest
private class CustomerController_TGN_TEST{
    @isTest(SeeAllData=true)
    private static void getCustomerData_TGN_TEST(){
        Database.SaveResult dsr;
        Customer_Detail__c drCustomer_Detail_c;
        Test.startTest();
        CustomerController.getCustomerData();
        Test.stopTest();
    }
    @isTest
    private static void deleteCustomers_TGN_TEST(){
        Database.SaveResult dsr;
        Customer_Detail__c drCustomer_Detail_c;
        drCustomer_Detail_c=new Customer_Detail__c();
        dsr=Database.insert(drCustomer_Detail_c,false);
        Test.startTest();
        try{
        CustomerController.deleteCustomers(new List<Id>{dsr.getId()});
        }catch(Exception e){}
        try{
        CustomerController.deleteCustomers(null);
        }catch(Exception e){}
        Test.stopTest();
    }
    @isTest
    private static void CustomerController_TGN_TEST(){
        CustomerController obj = new CustomerController();
    }
}