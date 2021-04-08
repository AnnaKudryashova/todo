public with sharing class TodoController {
    @AuraEnabled(cacheable=true)
    public static List<LabApp__Todo__c> getTodoList() {
        return [
            SELECT Id, Name, LabApp__Title__c, LabApp__Status__c, LabApp__Priority__c, 
            LabApp__Category__c, LabApp__Image__c, LabApp__ImageUrl__c, LabApp__Urgency_Level__c
            FROM LabApp__Todo__c
        ];
    }

    @AuraEnabled(cacheable=true)
    public static List<LabApp__Todo__c> findTodos(String searchKey) {
        String key = '%' + searchKey + '%';
        return [
            SELECT Id, Name, LabApp__Title__c, LabApp__Status__c, LabApp__Priority__c, 
            LabApp__Category__c, LabApp__Image__c, LabApp__ImageUrl__c, LabApp__Urgency_Level__c
            FROM LabApp__Todo__c
            WHERE LabApp__Title__c LIKE :key
        ];
    }

    @AuraEnabled(cacheable=true)
    public static LabApp__Todo__c getSingleTodo() {
        return [
            SELECT Id, Name, LabApp__Title__c, LabApp__Status__c, LabApp__Priority__c, 
            LabApp__Category__c, LabApp__Image__c, 	LabApp__Urgency_Level__c
            FROM LabApp__Todo__c
            LIMIT 1
        ];
    }
}
