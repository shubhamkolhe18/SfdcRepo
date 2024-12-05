import { LightningElement } from 'lwc';
import searchEmpRecords from '@salesforce/apex/TalentHubEmpProvider.searchEmpRecords';

export default class TalentHubLWCcompo extends LightningElement {
    employeeObject = {"sObject" : "Employee__c"};

    handleSearchClick(){

        this.employeeObject.Name = this.template.querySelector('lightning-input[data-formfield="empName"]').value;

        console.log("inside Controller "+this.employeeObject.Name);

        searchEmpRecords({objEmp : this.employeeObject})
        .then(result=>{
            console.log(result);
            this.employeeObject = result; //result = Emp Record Object
        })
        .catch(error=>{
            console.log(error);
        })
    }
}