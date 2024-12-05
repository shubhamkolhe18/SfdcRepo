public with sharing class MenuOrderProvider {
        @AuraEnabled(cacheable=true)
        public static List<Menu__c> getMenuData() {
            return [SELECT Id, Name, Description__c, Active__c FROM Menu__c];
        }

        public List<Order> getKitchenOrders() {
            // Query and return kitchen orders based on status, time, or any other criteria you want to apply
            return [SELECT Id, Name, Status__c FROM Order WHERE Status__c IN ('New', 'in Progress')];
        }
}