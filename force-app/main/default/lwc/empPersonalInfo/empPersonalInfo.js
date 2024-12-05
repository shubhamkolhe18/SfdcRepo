import { LightningElement } from 'lwc';
import createEmpRecord from '@salesforce/apex/EmployeeController.createEmpRecord'

export default class EmpPersonalInfo extends LightningElement {
    employeeObject = {sobject : 'Employee_Detail__c'};
        empName = '';
        empTech = '';

        handleNameChange(event) {
        this.empName = event.target.value;
    }

    handleTechChange(event) {
        this.empTech = event.target.value;
    } 
    handleSubmitClick(){
         
        this.employeeObject.Name = this.template.querySelector('lightning-input[data-id="empName"]').value;
        this.employeeObject.Technology__c = this.template.querySelector('lightning-input[data-id="empTech"]').value;

        createEmpRecord({ objEmp: this.employeeObject })
      .then(result => {
          alert('Record successfully inserted', );
        console.result('Record successfully inserted');
                    this.empName = '';
                    this.empTech = '';
      })
      .catch(error => {
        console.error('Insertion failed', error);
      })
      this.dispatchEvent(event);
      
    }
    
}