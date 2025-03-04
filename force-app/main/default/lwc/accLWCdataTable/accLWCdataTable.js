import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountProvider.getAccounts';
import { loadStyle } from 'lightning/platformResourceLoader';
import COLORS from '@salesforce/resourceUrl/colors';


const columns = [
    {
        label: 'Account Name',
        fieldName: 'Name',
        cellAttributes: {
            class: { fieldName: 'accountColor' },
            style: 'background-color: orange; color: black;'
        }
    },
    {
        label: 'Annual Revenue',
        fieldName: 'AnnualRevenue',
        type: 'currency',
        cellAttributes: {
            class: { fieldName: 'amountColor' },
            iconName: { fieldName: 'iconName' }, // This sets the iconName dynamically
            iconPosition: 'right',
            style: 'background-color: gray; color: white;'
        }
    },
    {
        label: 'Industry',
        fieldName: 'Industry',
        type: 'text',
        cellAttributes: {
            class: { fieldName: 'industryColor' }
        }
    },
    { label: 'Phone', fieldName: 'Phone', type: 'phone' }
];

export default class AccountLWCdataTable extends LightningElement {
    tableData;
    columns = columns;
    isCssLoaded = false;

    @wire(getAccounts)
    accountsHandler({ data, error }) {
        if (data) {
            this.tableData = data.map(item => {
                let amountColor = item.AnnualRevenue < 500000 ? 'slds-text-color_error' : 'slds-text-color_success';
                let iconName = item.AnnualRevenue < 500000 ? 'utility:down' : 'utility:up';
                return {
                    ...item,
                    amountColor: amountColor,
                    iconName: iconName,
                    industryColor: 'slds-icon-custom-custom12 slds-text-color_default',
                    accountColor: 'datatable-orange'
                };
            });
            console.log(this.tableData);
        }
        if (error) {
            console.error(error);
        }
    }
    // using connectedCallback to load the CSS file
    connectedCallback() {
        if (this.isCssLoaded) return;
        this.isCssLoaded = true;
        loadStyle(this, COLORS)
            .then(() => {
                console.log('Loaded Successfully');
            })
            .catch(error => {
                console.error('Error in loading the colors');
            });
    }
}