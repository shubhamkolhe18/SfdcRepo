import { LightningElement } from 'lwc';
import createNewAccount from '@salesforce/apex/AccountProvider.createNewAccount'

export default class myFirstLwc extends LightningElement{

    accountObject = {sObjectType : 'Account'};
    


    //Start Rating Method

    get ratingOptions() {
        return [
            { label: 'Hot', value: 'Hot' },
            { label: 'Cold', value: 'Cold' },
            { label: 'Warm', value: 'Warm' },
        ];
    }

    handleRatingChange(event) {
        this.accountObject.Rating = event.detail.value;
    }

    // End Rating Method

    // Start Type Method

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
      }

    // End Type Method

        handleSaveClick(){
            this.accountObject = this.template.querySelector('lightning-input[data-formfield="accName"]').value;
            console.log('Hello, im inside js');
        }

        connectedCallback(){
            createNewAccount({objAcc : this.accountObject})
        .then(result=>{
            console.log('Record has been created successfully...!!!');
        })
        .catch(error=>{
            console.log('Locha, spomthing went wrong.....');
        })

    }

}