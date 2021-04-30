import { LightningElement, wire } from 'lwc';

import getContactList from '@salesforce/apex/ContactController.getContactList';

import { publish, MessageContext } from 'lightning/messageService';
import RECORD_SELECTED_CHANNEL from '@salesforce/messageChannel/Record_Selected__c';

export default class LmsPublisher extends LightningElement {
    @wire(getContactList)
    contacts;

    @wire(MessageContext)
    messageContext;

    // Respond to UI event by publishing message
    handleContactClick(event) {
        event.preventDefault();
        const payload = { recordId: event.currentTarget.dataset.value };

        publish(this.messageContext, RECORD_SELECTED_CHANNEL, payload);
    }
}