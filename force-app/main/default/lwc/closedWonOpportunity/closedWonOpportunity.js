import { LightningElement, wire } from 'lwc';
import getOpportunities from '@salesforce/apex/OpportunityProvider.getOpportunities';

export default class ClosedWonOpportunity extends LightningElement {
    selectedStage = 'Closed Won';

    columns = [
        { label: 'Opportunity Name', fieldName: 'Name', type: 'text' },
        { label: 'Stage', fieldName: 'StageName', type: 'text' },
        { label: 'Amount', fieldName: 'Amount', type: 'currency', typeAttributes: { currencyCode: 'USD' } }
    ];

    opportunities = [];

    get stageOptions() {
        return [
          { label: 'Please Select', value: '' },
          { label: 'Closed Won', value: 'Closed Won' },
          { label: 'Closed Lost', value: 'Closed Lost' },
          
        ];
    }

    handleStageChange(event) {
        this.selectedStage = event.target.value;
    }

    @wire(getOpportunities, { stage: '$selectedStage' })
    wiredOpportunities({ data, error }) {
        if (data) {
            this.opportunities = data;
        } else if (error) {
            console.error('Error loading opportunities:', error);
        }
    }
}