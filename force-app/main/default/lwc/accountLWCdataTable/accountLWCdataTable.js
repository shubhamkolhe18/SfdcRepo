import { LightningElement } from 'lwc';
import searchAccountRecords from '@salesforce/apex/AccountDemoTable.searchAccountRecords'

const columns = [
    { label: 'Name', fieldName: 'Name', editable: true,style: 'background-color: orange; color: black;'},
    { label:'Type', fieldName:'Type', editable:true },
    { label:'SLA', fieldName:'SLA__c', editable:true },
    { label:'Rating', fieldName:'Rating', editable:true }
]
    
export default class AccountLWCdataTable extends LightningElement {

    accountObject = {'sObjectType' : 'Account'};
    accList;
    
    columns = columns;
    
    searchAccountHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        console.log('Result '+this.accountObject.Name);
        //calling searchAccountRecords Method
        searchAccountRecords({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result).length);
            this.accList = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
    }
    clearHandler() {
        // Clear the data in the datatable by setting accList to an empty array
        this.accList = [];
    }
}