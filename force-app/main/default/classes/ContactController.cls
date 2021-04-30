public with sharing class ContactController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList() {
        return [
            SELECT Id, Name, Title, Phone, Email
            FROM Contact
            WHERE Name != NULL
            WITH SECURITY_ENFORCED
            LIMIT 10
        ];
    }
}
