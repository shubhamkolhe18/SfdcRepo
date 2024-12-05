import { LightningElement, api } from 'lwc';
import createLead from '@salesforce/apex/LeadProvider.createLead';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';

export default class QuickLeadCreation extends LightningElement {
  objectLead = {};

  // Status Options
  get statusOptions() {
    return [
      { label: 'Open - Not Contacted', value: 'Open - Not Contacted' },
      { label: 'Working - Contacted', value: 'Working - Contacted' },
      { label: 'Closed - Converted', value: 'Closed - Converted' },
      { label: 'Closed - Not Converted', value: 'Closed - Not Converted' }
    ];
  }

  handleStatusChange(event) {
    this.objectLead.Status = event.detail.value;
  }

  // Lead Source Options
  get sourceOptions() {
    return [
      { label: 'External Referral', value: 'External Referral' },
      { label: 'Partner', value: 'Partner' },
      { label: 'Public Relations', value: 'Public Relations' },
      { label: 'Trade Show', value: 'Trade Show' },
      { label: 'Word of mouth', value: 'Word of mouth' },
      { label: 'Employee Referral', value: 'Employee Referral' }
    ];
  }

  handleSourceChange(event) {
    this.objectLead.LeadSource = event.detail.value;
  }

  handleSaveButton() {
    const nameInput = this.template.querySelector('lightning-input[data-formfield="leadName"]');
    if (!nameInput.value) {
      this.showErrorMessage('Lead Name is a required field.');
      return;
    }

    this.objectLead.Name = nameInput.value;
    this.objectLead.Phone = this.template.querySelector('lightning-input[data-formfield="leadPhone"]').value;
    this.objectLead.Company = this.template.querySelector('lightning-input[data-formfield="leadCompany"]').value;

    createLead({ objLead: this.objectLead })
      .then(() => {
        this.showSuccessToast();
        this.dispatchEvent(new CloseActionScreenEvent());
      })
      .catch((error) => {
        console.error('Insertion failed', error);
        this.showErrorMessage('Record insertion failed.');
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

  handleCancelButton(event) {
    this.dispatchEvent(new CloseActionScreenEvent());
  }
}