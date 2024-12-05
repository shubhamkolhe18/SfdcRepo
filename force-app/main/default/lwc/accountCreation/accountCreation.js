import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import createNewAccount from '@salesforce/apex/AccountProvider.createNewAccount';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class QuickAccountCreation extends LightningElement {
  accountObject = { sObjectType: 'Account' };

  createAccountHandler() {
    const accNameInput = this.template.querySelector('lightning-input[data-formfield="accName"]');
    if (!accNameInput.value) {
      accNameInput.reportValidity();
      return;
    }

    // Check if all other fields are null
    if (!this.accountObject.Rating && !this.accountObject.Type) {
      this.showErrorMessage('Please fill in at least one additional field');
      return;
    }

    this.accountObject.Name = accNameInput.value;
    console.log(this.accountObject);

    createNewAccount({ objAcc: this.accountObject })
      .then(() => {
        this.showSuccessToast();
        this.dispatchEvent(new CloseActionScreenEvent());
        console.result('Record successfully inserted');
      })
      .catch(error => {
        console.error('Insertion failed', error);
        this.showErrorMessage('Record insertion failed');
      });
  }

  showSuccessToast() {
    const toastEvent = new ShowToastEvent({
      title: 'Success',
      message: 'Record successfully inserted',
      variant: 'success'
    });
    this.dispatchEvent(toastEvent);
  }

  showErrorMessage(message) {
    const toastEvent = new ShowToastEvent({
      title: 'Error',
      message: message,
      variant: 'error'
    });
    this.dispatchEvent(toastEvent);
  }

  get ratingOptions() {
    return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Cold', value: 'Cold' },
            { label: 'Warm', value: 'Warm' },
        ];
  }

  ratingHandleChange(event) {
    this.accountObject.Rating = event.detail.value;
  }

  get typeOptions() {
    return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Customer - Channel', value: 'Customer - Channel' },
            { label: 'Channel Partner / Reseller', value: 'Channel Partner / Reseller' },
            { label: 'Installation Partner', value: '	Installation Partner' },
            { label: 'Technology Partner', value: 'Technology Partner' },
            { label: 'Other', value: 'Other' },
        ];
  }

  typeHandleChange(event) {
    this.accountObject.Type = event.detail.value;
  }

  handleCancelButton(event) {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  resetHandler() {
    // Clear the input fields and reset the accountObject properties
    this.accountObject = { sObjectType: 'Account' };

    // Clear Lightning Input fields
    const inputFields = this.template.querySelectorAll('lightning-input');
    inputFields.forEach(field => {
        field.value = '';
    });

    // Reset Rating and Type to their default values (optional)
    this.accountObject.Rating = '';
    this.accountObject.Type = '';
}

}