import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    name;
    firstName = 'Shubham';
    lastName = 'Kolhe';
    age = 28;
    salary = 55000;
    myLoanAmount = 4500;
    flag = true;
    today = new Date();

    objAcc = {'sObjectType' : 'Account'}; //Standard Object
    objCon = {'sObjectType' : 'Contact'}; 


    objNewAccount = {'Name' : 'Cinemax' ,
                     'Rating' : 'Hot' ,
                      'SLA__c' : 'Gold'}; 

}