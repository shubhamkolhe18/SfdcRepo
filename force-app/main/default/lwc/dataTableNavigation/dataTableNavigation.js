import { LightningElement, track } from 'lwc';

export default class DataTableNavigation extends LightningElement {
    @track showComponentA = false;
    @track showComponentB = false;
    @track showComponent = true;

    showAccount() {
   // alert('Show Account Component');
        this.showComponentA = true;
        console.log(this.showComponentA , 'Show Account Component');
        this.showComponentB = false;
    }

    showOpportunity() {
        this.showComponentA = false;
        this.showComponentB = true;
    }
}