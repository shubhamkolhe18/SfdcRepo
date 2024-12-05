import { LightningElement , track} from 'lwc';
import searchAccountRecords from '@salesforce/apex/AccountDemoTable.searchAccountRecords'
import searchContactRecords from '@salesforce/apex/ContactProvider.searchContactRecords'
import searchOppoRecords from '@salesforce/apex/OpportunityProvider.searchOppoRecords'

const accountColumns = [
    { label: 'Name', fieldName: 'Name', editable: true,style: 'background-color: orange; color: black;'},
    { label:'Type', fieldName:'Type', editable:true },
    { label:'SLA', fieldName:'SLA__c', editable:true },
    { label:'Rating', fieldName:'Rating', editable:true }
]

const contactColumns = [
    { label: 'Name', fieldName: 'Name', editable: true,style: 'background-color: orange; color: black;'},
    { label:'Phone', fieldName:'Phone', editable:true },
    { label:'Email', fieldName:'Email', editable:true },
    { label:'Lead Source', fieldName:'LeadSource', editable:true }
];

const opportunityColumns = [
    { label: 'Name', fieldName: 'Name', editable: true,style: 'background-color: orange; color: black;'},
    { label:'Stage Name', fieldName:'StageName', editable:true },
    { label:'Amount', fieldName:'Amount', editable:true },
    { label:'Close Date', fieldName:'CloseDate', editable:true }
];

export default class MultipleFunctionality extends LightningElement {

    @track isAcc = false;
    @track isCon = false;
    @track isOpp = false;
    @track showAccountTableFlag = false;
    @track showContactTableFlag = false;
    @track showOpportunityTableFlag = false;

    showAccLds(){
        this.isAcc = !this.isAcc;
        this.isCon = false;
        this.isOpp = false;
        this.showAccountTableFlag = false;
        this.showContactTableFlag = false;
        this.showOpportunityTableFlag = false;
    }

    showConLds(){
        this.isAcc = false;
        this.isCon = !this.isCon;
        this.isOpp = false;
        this.showAccountTableFlag = false;
        this.showContactTableFlag = false;
        this.showOpportunityTableFlag = false;
    }

    showOppLds(){
        this.isAcc = false;
        this.isCon = false;
        this.isOpp = !this.isOpp;
        this.showAccountTableFlag = false;
        this.showContactTableFlag = false;
        this.showOpportunityTableFlag = false;
    }

    showAccRec(){
        this.isAcc = true;
        this.isCon = false;
        this.isOpp = false;
        this.showContactTableFlag = false;
        this.showAccountTableFlag = !this.showAccountTableFlag;
        this.showOpportunityTableFlag = false;
    }

    showConRec(){
        this.isAcc = false;
        this.isCon = true;
        this.isOpp = false;
        this.showContactTableFlag = !this.showContactTableFlag;
        this.showAccountTableFlag = false;
        this.showOpportunityTableFlag = false;
    }

    showOppRec(){
        this.isAcc = false;
        this.isCon = false;
        this.isOpp = true;
        this.showContactTableFlag = false;
        this.showAccountTableFlag = false;
        this.showOpportunityTableFlag = !this.showOpportunityTableFlag;
    }

    showHide(){
        this.isAcc = false;
        this.isCon = false;
        this.isOpp = false;
        this.showAccountTableFlag = false;
        this.showContactTableFlag = false;
        this.showOpportunityTableFlag = false;
    }

    

     accountObject = {'sObjectType' : 'Account'};
    accList;
    
    columns = accountColumns;
    
    searchAccountHandler(){
        this.accountObject.Name = this.template.querySelector('lightning-input[data-formfield="accountName"]').value;
        console.log('Result '+this.accountObject.Name);
        
        searchAccountRecords({objAcc : this.accountObject})
        .then(result=>{
            console.log(JSON.stringify(result).length);
            this.accList = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
    }
    clearHandler() {
        this.accList = [];
    }

    

    
    contactObject = {'sObjectType' : 'Contact'}
    conList;
    columns = contactColumns;

    searchContactHandler(){
        this.contactObject.Name = this.template.querySelector('lightning-input[data-formfield="contactName"]').value;
        console.log('Result '+this.accountObject.Name);
        
        searchContactRecords({objCon : this.contactObject})
        .then(result=>{
            console.log(JSON.stringify(result).length);
            this.conList = result;
        })
        .catch(error=>{
            console.log(JSON.stringify(error));
        })
    }

    clearContactHandler(){
        this.conList = [];
    }

    

    opportunityObject = { 'sObjectType': 'Opportunity' };
    oppList;
    columns = opportunityColumns;

    searchOpportunityHandler() {
        this.opportunityObject.Name = this.template.querySelector('lightning-input[data-formfield="opportunityName"]').value;
        console.log(this.opportunityObject.Name);
        searchOppoRecords({ objOpp: this.opportunityObject })
            .then(result => {
                console.log(JSON.stringify(result).length);
                this.oppList = result;
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            });
    }

    clearOpportunityHandler() {
        this.oppList = [];
    }
}