import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactController.createContact';

export default class ContactForm extends LightningElement {
    @track firstName = '';
    @track lastName = '';
    @track email = '';

    handleInputChange(event){
        const field = event.target.dataset.Id;
        if(field === 'firstName'){
            this.firstName = event.target.value;
        } else if(field === 'lastName'){
            this.lastName = event.target.value;
        } else if(field === 'email'){
            this.email = event.target.value;
        }
    }

    
}