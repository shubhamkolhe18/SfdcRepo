import { LightningElement , api} from 'lwc';


const columns = [
    
    { label: 'FirstName', fieldName: 'FirstName', editable: true },
    { label: 'LastName', fieldName: 'LastName', editable: true },
    { label: 'Phone', fieldName: 'Phone', editable: true },
    { label: 'Email', fieldName: 'Email', editable: true } 
  ];

 
export default class ContactChildCompo extends LightningElement {

    @api accList;
    columns = columns;
}