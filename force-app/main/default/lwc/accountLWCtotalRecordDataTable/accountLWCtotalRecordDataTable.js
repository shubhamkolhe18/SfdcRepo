import { LightningElement } from 'lwc';
import accountTotalRecord from '@salesforce/apex/AccountDemoTable.accountTotalRecord';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type', type: 'text' },
    { label: 'Rating', fieldName: 'Rating', type: 'text' },
    
];

export default class AccountLWCtotalRecordDataTable extends LightningElement {

    accList;
    columns = columns;
    showDataTableClass = false;
    hideClearButtonClass = true;

    showHandlerOnClick(){
    accountTotalRecord()
    .then(result=>{
        console.log(JSON.stringify(result));
        this.accList = result;
    })

    .catch(error=>{
        console.log(JSON.stringify(error))
    })
}

hideHandlerOnClick(){
    this.accList = [];
        this.showDataTable = false;
        this.hideClearButton = true;
}

get showDataTableClass() {
    return this.showDataTable ? 'slds-show' : 'slds-hide';
}

get hideClearButtonClass() {
    return this.hideClearButton ? 'slds-hide' : 'slds-show';
}
    

}