import { LightningElement, wire } from 'lwc';

import getContactList from '@salesforce/apex/ContactController.getContactList';

export default class customEventPublisher extends LightningElement {

    @wire(getContactList)
    contacts;

    handleContactClick(event) {
        event.preventDefault();
        let customEvent = new CustomEvent('selected', {
            detail: {
                value: event.currentTarget.dataset.value
            }
        });
        this.dispatchEvent(customEvent);
    }
}