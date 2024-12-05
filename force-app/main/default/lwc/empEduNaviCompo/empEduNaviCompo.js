import { LightningElement } from 'lwc';
import createEmpRecord from '@salesforce/apex/EmployeeController.createEmpRecord'

export default class EmpEduNaviCompo extends LightningElement {
    objectEducation = {sobject : 'Employee_Detail__c'};
    eduHigh = '';
    eduClg = '';
    eduUni = '';

    handleHighQlfChange(event){
            this.eduHigh = event.target.value;
        }

    handleClgChange(event){
            this.eduClg = event.target.value;
        }

    handleUniChange(event){
        this.eduUni = event.target.value;
    }	

    handleSubmitClick(){
      //  alert('handleSubmitButton');
        this.objectEducation.Highest_qualification__c = this.eduHigh;
        this.objectEducation.College_Name__c = this.eduClg;
        this.objectEducation.University_Name__c = this.eduUni;
      //      alert('Clicked');
    createEmpRecord({ objEmp : this.objectEducation })
        .then(result=>{
            alert('Record Successfully created');
            console.log('Record Successfully created' , result);
            this.eduHigh = '';
            this.eduClg = '';
            this.eduUni = '';          
        })
        .catch(error=>{
            alert('Record insertion failed');
            console.log('Record insertion failed' , error);
        })
        this.dispatchEvent(event);
    }

}