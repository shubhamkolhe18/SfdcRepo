import { LightningElement, track } from 'lwc';

export default class AccountLDS extends LightningElement {
    @track isAcc = false;
    @track isCon = false;

    showAccLds(){
        this.isAcc = true;
        this.isCon = false;
    }

    showConLds(){
        this.isAcc = false;
        this.isCon = true;
    }

    showHide(){
        this.isAcc = false;
        this.isCon = false;
    }
}