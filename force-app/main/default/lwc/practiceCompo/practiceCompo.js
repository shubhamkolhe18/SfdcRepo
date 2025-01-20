import { LightningElement } from 'lwc';

export default class PracticeCompo extends LightningElement {

    columns = [
    { label: 'Name', fieldName: 'name' },
    { label: 'Title', fieldName: 'Title' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Lead Source', fieldName: 'LeadSource' }
];
    columns ;

}