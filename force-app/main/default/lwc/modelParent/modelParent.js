import { LightningElement } from 'lwc';

export default class ModelParent extends LightningElement {
    myAccount;
    handleSendButton(){
        this.myAccount = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        console.log(this.myAccount);
    }

    handleClearButton(){
        this.myAccount= null;
    }
}