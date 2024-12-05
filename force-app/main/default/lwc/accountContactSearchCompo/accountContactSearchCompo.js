import { LightningElement } from 'lwc';
import searchContacts from '@salesforce/apex/AccountDemoTable.searchContacts'

export default class AccountContactSearchCompo extends LightningElement {
    accountObject = {'sObjectType' : 'Account'}
    accountList;

    searchHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        
        searchContacts({objAcc :  this.accountObject})
        .then(result=>{
            console.log('result= '+result);
            this.accountList = result;

        })
        .catch(error=>{

        })
    }
}