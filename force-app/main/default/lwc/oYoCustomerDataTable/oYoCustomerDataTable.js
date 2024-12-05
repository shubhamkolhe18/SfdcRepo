import { LightningElement, wire } from 'lwc';
import getCustomerData from '@salesforce/apex/CustomerController.getCustomerData';
import deleteCustomers from '@salesforce/apex/CustomerController.deleteCustomers';

const columns = [
    { label: 'Customer Name *', fieldName: 'Name', type: 'text'},
    { label: 'Address', fieldName: 'Address__c', type: 'text', editable: true},
    { label: 'Phone', fieldName: 'Mobile__c', type: 'text',editable: true}
];

export default class OYoCustomerDataTable extends LightningElement {
    customerData;
    filteredCustomerData;
    selectedRows = [];

    @wire(getCustomerData)
    wiredCustomerData({ error, data }) {
        if (data) {
            this.customerData = data.map((item) => {
                return {
                    Id: item.Id,
                    Name: item.Name,
                    Address__c: item.Address__c,
                    Mobile__c: item.Mobile__c
                };
            });
            this.filteredCustomerData = [...this.customerData];
        } else if (error) {
            console.error('Error retrieving customer data:', error);
        }
    }

    columns = columns;

    handleSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.filteredCustomerData = this.customerData.filter((item) =>
            item.Name.toLowerCase().includes(searchTerm) ||
            item.Address__c.toLowerCase().includes(searchTerm) ||
            item.Mobile__c.toLowerCase().includes(searchTerm)
        );
    }

    handleRowAction(event) {
        const rowId = event.detail.row.Id;
        // Perform desired action for the selected row
    }

     handleRowSelection(event) {
        this.selectedRows = event.detail.selectedRows;
    }

    handleDeleteSelected() {
        if (this.selectedRows.length > 0) {
            const selectedIds = this.selectedRows.map((row) => row.Id);
            deleteCustomers({ customerIds: selectedIds })
                .then(() => {
                    // Perform any necessary post-delete actions
                    this.selectedRows = [];
                })
                .catch((error) => {
                    console.error('Error deleting customers:', error);
                });
        }
    }
}