import { LightningElement } from 'lwc';
import searchAccountRecords from '@salesforce/apex/AccountDemoTable.searchAccountRecords';

export default class AccountHTMLTable extends LightningElement {
    
    accountObject = {'sObjectType' : 'Account'};
    showAccountTableFlag = false;

    searchAccountHandler(){
        alert('Button Clicked')
        console.log("Inside of searchAccountHandler");
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
    
        //Caaling Apex searchAccountRecords Method
        searchAccountRecords({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result).length);
            this.accountObject = result;

            if(JSON.stringify(result).length > 10 ){
                this.showAccountTableFlag = true;
            }
            else{
                this.showAccountTableFlag = false;
            }
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
            this.showAccountTableFlag = false;
        })

    }


}