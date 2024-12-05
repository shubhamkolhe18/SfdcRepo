import { LightningElement , track} from 'lwc';
import searchAccountRecord from '@salesforce/apex/AccountCrudCompoProvider.searchAccountRecord';
import updateAccountAndContactRecord from '@salesforce/apex/AccountCrudCompoProvider.updateAccountAndContactRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class FieldUpdateCompo extends LightningElement {
    @track disableAccountPhoneFieldFlag = true;
    @track disableAccountTypeFieldFlag = true;
    @track showRecordPage = false;
    @track hideUpdateButton = false;
    @track showThankyouPage = false;

    accountObject = {'sObjectType' : 'Account'};

    searchRecordButtonHandler() {
    const accNameInput = this.template.querySelector('lightning-input[data-formfield="accountName"]');
    const accName = accNameInput.value.trim(); 

    if (!accName) {
        accNameInput.setCustomValidity('Account Name is required.');
        accNameInput.reportValidity();
        this.showRecordPage = false; 
        return;
    }
        this.disableAccountPhoneFieldFlag = true;
        this.disableAccountTypeFieldFlag = true;
        this.hideUpdateButton = false;
        this.showRecordPage = true;
        this.accountObject.Name = accNameInput.value;

    searchAccountRecord({ objAcc: this.accountObject })
        .then((result) => {
            console.log(JSON.stringify(result));
            this.accountObject = result;
            
        })
        .catch((error) => {
            console.log(JSON.stringify(error));
        });

    // Clear Phone and Type input fields
    const accPhoneInput = this.template.querySelector('lightning-input[data-formfield="accountPhone"]');
    const accTypeInput = this.template.querySelector('lightning-input[data-formfield="accountType"]');
    accPhoneInput.value = '';
    accTypeInput.value = '';
    
    // Reset any custom validity messages for Account Name input field
    accNameInput.setCustomValidity('');
}


    editRecordButtonHandler(){
        this.disableAccountPhoneFieldFlag = false;
        this.disableAccountTypeFieldFlag = false;
        this.hideUpdateButton = true;
    }

    cancelRecordButtonHandler(){
        this.showRecordPage = false;
        this.disableAccountPhoneFieldFlag = true;
        this.disableAccountTypeFieldFlag = true;
        this.hideUpdateButton = false;
    }

    clearRecordButtonHandler(){
        const accNameInput = this.template.querySelector('lightning-input[data-formfield="accountName"]');
        const accPhoneInput = this.template.querySelector('lightning-input[data-formfield="accountPhone"]');
        const accTypeInput = this.template.querySelector('lightning-input[data-formfield="accountType"]');

    accNameInput.value = '';
    accNameInput.setCustomValidity('');
    accPhoneInput.value = '';
    accTypeInput.value = ''

    this.disableAccountPhoneFieldFlag = true;
    this.disableAccountTypeFieldFlag = true;
    }

    updateRecordButtonHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        this.accountObject.Type = this.template.querySelector('lightning-input[data-formfield="accountType"]').value;
        this.accountObject.Phone = this.template.querySelector('lightning-input[data-formfield="accountPhone"]').value;
        this.hideUpdateButton = !this.hideUpdateButton;
        updateAccountAndContactRecord({objAcc :this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accountObject = result;
            this.showSuccessToast();
            this.disableAccountPhoneFieldFlag = true;
            this.disableAccountTypeFieldFlag = true;
            this.showRecordPage = false;
            this.showThankyouPage = true;

            setTimeout(() => {
            this.hideThankYouPage();
            }, 2000); 
           
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
        
    }

    showSuccessToast() {
    const toastEvent = new ShowToastEvent({
      title: 'Success',
      message: 'Record successfully inserted',
      variant: 'success'
    });
    this.dispatchEvent(toastEvent);
    // this.dispatchEvent(new CloseActionScreenEvent());
    }

    showErrorMessage(message) {
    const toastEvent = new ShowToastEvent({
      title: 'Error',
      message: message,
      variant: 'error'
    });
    this.dispatchEvent(toastEvent);
    }

    cancelThankyouHandler(){
        this.showThankyouPage = false;
    }
    
    hideThankYouPage() {
        this.showThankyouPage = false;
    }
}