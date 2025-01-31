import { LightningElement, track } from 'lwc';
import getContact from '@salesforce/apex/ContactController.getContact';

export default class PracticeCompo extends LightningElement {
    @track data = [];
    columns = [
        { label: 'Name', fieldName: 'Name' }, 
        { label: 'Title', fieldName: 'Title' },
        { label: 'Phone', fieldName: 'Phone', type: 'phone' }, 
        { label: 'Lead Source', fieldName: 'LeadSource' } 
    ];

    connectedCallback() {
        getContact()
            .then(result => {
                console.log('Data:', result);
                this.data = result;
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
}