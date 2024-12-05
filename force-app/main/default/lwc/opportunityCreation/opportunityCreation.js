import { LightningElement, track } from 'lwc';
import createNewOpportunity from '@salesforce/apex/OpportunityProvider.createNewOpportunity';

export default class OpportunityCreation extends LightningElement {

    @track opportunityObject = {
        sobjectType: 'Opportunity',
        Name: '',
        StageName: '',
        Type: '',
        LeadSource: ''
      };

    get stageOptions() {
        return [
            { label: 'Prospecting', value: 'Prospecting' },
            { label: 'Qualification', value: 'Qualification' },
            { label: 'Needs Analysis', value: 'Needs Analysis' },
            { label: 'Value Proposition', value: 'Value Proposition' },
            { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
            { label: 'Perception Analysis', value: 'Perception Analysis' },
            { label: 'Proposal/Price QuoteNew', value: 'Proposal/Price Quote' },
            { label: 'Negotiation/Review', value: 'Negotiation/Review' },
            { label: 'Closed Won', value: 'Closed Won' },
            { label: 'Closed Lost', value: 'Closed Lost' }
        ];
    }

    handleStageChange(event) {
        this.opportunityObject.StageName = event.detail.value;
    }

    get typeOptions() {
        return [
            { label: 'Existing Customer - Upgrade', value: 'Existing Customer - Upgrade' },
            { label: '	Existing Customer - Replacement', value: '	Existing Customer - Replacement' },
            { label: 'Existing Customer - Downgrade', value: 'Existing Customer - Downgrade' },
            { label: 'New Customer', value: 'New Customer' }
        ];
    }

    handleTypeChange(event) {
        this.opportunityObject.Type = event.detail.value;
    }

    get leadSourceOptions() {
        return [
            { label: 'Web', value: 'Web' },
            { label: 'Phone Inquiry', value: 'Phone Inquiry' },
            { label: 'Partner Referral', value: 'Partner Referral' },
            { label: 'Purchased List', value: 'Purchased List' },
            { label: 'Other', value: 'Other' }
        ];
    }

    handleLeadSourceChange(event) {
        this.opportunityObject.LeadSource = event.detail.value;
    }

    handleSaveClick(){
       const oppNameInput = this.template.querySelector('lightning-input[data-id="oppName"]');
       if(!oppNameInput.value){
        oppNameInput.reportValidity();
        return;
       }

       this.opportunityObject.Name = oppNameInput.value;
       

        // Convert the opportunityObject to a string using JSON.stringify()
        const opportunityString = JSON.stringify(this.opportunityObject);

        alert(this.opportunityString);
       console.log(this.opportunityObject);

    createNewOpportunity({objOpp : this.opportunityObject})
    .then(result=>{
        console.log('Record has been created successfully...!!!');
        alert(this.opportunityObject)
        console.log(result);
    })
    .catch(error=>{
        console.log('Locha, something went wrong.....');
        console.log(error);
    })
    }
}