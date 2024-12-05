import { LightningElement } from 'lwc';
import createEmpRecord from '@salesforce/apex/EmployeeController.createEmpRecord'

export default class EmpFamilyNaviCompo extends LightningElement {
    objectFamily = {sObject : 'Employee_Detail__c'};
    eduFathName = '';
    eduFathOcc = '';
    eduMothName = '';
    eduMothOcc = '';

    handleFNChange(event){
            this.eduFathName = event.target.value;
        }

    handleFOChange(event){
            this.eduFathOcc = event.target.value;
        }

    handleMNChange(event){
        this.eduMothName = event.target.value;
    }

    handleMOChange(event){
        this.eduMothOcc = event.target.value;
    }
    handleSubmitClick(){
        this.objectFamily.Father_s_Name__c = this.eduFathName;
        this.objectFamily.Father_s_Occupation__c = this.eduFathOcc;
        this.objectFamily.Mother_s_Name__c = this.eduMothName;
        this.objectFamily.Mother_s_Occupation__c = this.eduMothOcc;

       createEmpRecord({ objEmp : this.objectFamily})
       .then(result=>{
            alert('Record Successfully created');
            console.log('Record Successfully created' , result);
            this.eduFathName = '';
            this.eduFathOcc = '';
            this.eduMothName = ''; 
            this.eduMothOcc = '';         
        })
        .catch(error=>{
            alert('Record insertion failed');
            console.log('Record insertion failed' , error);
        })
        this.dispatchEvent(event);
    }

}