import { LightningElement } from 'lwc';
import createNewAccount from '@salesforce/apex/AccountCrudCompoProvider.createNewAccount';
import searchAccountRecord from '@salesforce/apex/AccountCrudCompoProvider.searchAccountRecord';
import updateAccountRecord from '@salesforce/apex/AccountCrudCompoProvider.updateAccountRecord';
import deleteAccountRecord from '@salesforce/apex/AccountCrudCompoProvider.deleteAccountRecord';
import undeleteAccountRecord from '@salesforce/apex/AccountCrudCompoProvider.undeleteAccountRecord';

export default class CrudOperation extends LightningElement {

    accountObject = {'sObjectType' : 'Account'};
    showCreateFieldsFlag = false;
    showSearchFieldsFlag = false;
    disableAccountTypeFieldFlag = true;
    disableAccountSLAFieldFlag = true;
    showUpdateButtonFlag = false;

    createButtonHandler(){
        this.showCreateFieldsFlag = true;
        this.showSearchFieldsFlag = false;
        this.showUpdateButtonFlag = false;
    }

    searchButtonHandler(){
        this.showCreateFieldsFlag = false;
        this.showSearchFieldsFlag = true;
        this.disableAccountTypeFieldFlag = true;
        this.disableAccountSLAFieldFlag = true;
        this.showUpdateButtonFlag = false;
    }

    editButtonHandler(){
        this.disableAccountTypeFieldFlag = false;
        this.disableAccountSLAFieldFlag = false;
        this.showUpdateButtonFlag = true;
        this.showCreateFieldsFlag = false;
        
    }

    deleteButtonHandler(){
        this.showUpdateButtonFlag = false;
        alert('Delete button pr click ho raha hai bhai');
        
        let text= "Do you want to delelte rhis record";
        if (confirm(text) == true) {
            //calling delete method
            deleteAccountRecord({objAcc : this.accountObject});
        }

    }

    //Account type start
    get typeOptions() {
        return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Other', value: 'Other' }            
        ];
    }

    typeHandleChange(event) {
       this.accountObject.Type = event.detail.value;
    }
    //Account Type END

     //Account SLA START

     get slaOptions() {
        return [
            { label: 'Gold', value: 'Gold' },
            { label: 'Silver', value: 'Silver' }, 
            { label: 'Bronze', value: 'Bronze' }           
        ];
    }

    slaHandleChange(event) {
       this.accountObject.SLA__c = event.detail.value;
    }
    //Account SLA END

    //Calling Apex Method on Create Button

    createAccountButtonHandler(){
        debugger;
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;

        createNewAccount({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })

        alert('New Record has been Created')

    }

    searchRecordButtonHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        
        searchAccountRecord({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accountObject = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
    
        alert('Record is here')
    }

    updateRecordButtonHandler(){

        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        this.accountObject.Type = this.template.querySelector('lightning-input[data-formfield="accountType"]').value;
        this.accountObject.SLA__c = this.template.querySelector('lightning-input[data-formfield="accountSLA"]').value;

        updateAccountRecord({objAcc :this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accountObject = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
        alert('Record has been Updated');
    }


    undeleteRecordButtonHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        alert('first click');
        console.log(this.accountObject.Name);
        undeleteAccountRecord({objAcc : this.accountObject} )
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accountObject = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
        alert('Second click');
    }

    deleteButtonHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        console.log(this.accountObject.Name);

        deleteAccountRecord({objAcc : this.accountObject} )
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accountObject = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
        alert('Record has been Deleted')
    }
    

}