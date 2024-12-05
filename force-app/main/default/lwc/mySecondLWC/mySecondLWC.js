import { LightningElement } from 'lwc';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Rating', fieldName: 'Rating', type: 'text' },
    { label: 'Phone', fieldName: 'phone', type: 'phone' },
    { label: 'Type', fieldName: 'Type', type: 'text' }
];

export default class MySecondLWC extends LightningElement {
    data = [];
    columns = columns;
}