import { LightningElement } from 'lwc';
import searchAccountType from '@salesforce/apex/AccountProvider.searchAccountType';
import searchAccountRecords from '@salesforce/apex/AccountProvider.searchAccountRecords';

export default class AccountComboBoxSearchTable extends LightningElement {
    accountObject = {'sObjectType' : 'Account'};
    accList ; 
    accRecordCount = 0 ;

    get typeOptions() {
        return [
            { label: 'Prospect', value: 'Prospect' },
            { label: 'Customer - Direct', value: 'Customer - Direct' },
            { label: 'Customer - Channel', value: 'Customer - Channel' },
            { label: 'Channel Partner / Reseller', value: 'Channel Partner / Reseller' },
            { label: 'Installation Partner', value: 'Installation Partner' },
            { label: 'Technology Partner', value: 'Technology Partner' },
            { label: 'Other', value: 'Other' }
        ];
    }
    
    handleTypeChange(event) {
        this.accountObject.Type = event.detail.value;
        console.log('You have selected = '+ this.accountObject.Type);

        searchAccountType({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accList = result;
            this.accRecordCount = result.length;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
            this.accRecordCount = 0;
        })
    }


}