import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const fields = [
    NAME_FIELD,
    TITLE_FIELD,
    PHONE_FIELD,
    EMAIL_FIELD
];
export default class customEventSubscriber extends LightningElement {
    @api recordId;

    Name;
    Title;
    Phone;
    Email;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredRecord({ error, data }) {
        if (error) {
            this.dispatchToast(error);
        } else if (data) {
            fields.forEach(
                (item) => (this[item.fieldApiName] = getFieldValue(data, item))
            );
        }
    }

    handleContactSelect(event){
        this.recordId = event.detail.value;
    }

    dispatchToast(error) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                variant: 'error'
            })
        );
    }
}