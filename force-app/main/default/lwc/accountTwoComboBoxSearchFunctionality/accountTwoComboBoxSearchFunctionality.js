import { LightningElement } from 'lwc';
import searchAccountSLAandType from '@salesforce/apex/AccountProvider.searchAccountSLAandType';

export default class AccountTwoComboBoxSearchFunctionality extends LightningElement {

    accList ;
    accountObject = {'sObjectType' : 'Account'};

    get typeOptions() {
        return [
          { label: 'Please Select', value: '' },
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

        searchAccountSLAandType({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accList = result;
           // this.accRecordCount = result.length;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
           // this.accRecordCount = 0;
        })
    }

    get optionsSLA() {
        return [
            { label: 'Please Select', value: '' },
            { label: 'Gold', value: 'Gold' },
            { label: 'Silver', value: 'Silver' },
            { label: 'Platinum', value: 'Platinum' },
            { label: 'Bronze', value: 'Bronze' }
        ];  
    }

    handleSLAChange(event) {
        this.accountObject.SLA__c = event.detail.value;
        console.log('You have selected = '+ this.accountObject.SLA__c);

        searchAccountSLAandType({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result));
            this.accList = result;
           // this.accRecordCount = result.length;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
           // this.accRecordCount = 0;
        })
    }


}