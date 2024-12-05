import { LightningElement, wire, track } from 'lwc';
import getAccWithCon from '@salesforce/apex/AccountDemoTable.getAccWithCon'

export default class AccountTreeGrid extends LightningElement {
    accounts;
    error;
    @track expandedRows = [];
    columns;

    @wire(getAccWithCon)
    wiredAccount({ data, error }) {
        if (data) {
            let parseData = JSON.parse(JSON.stringify(data));
            for (let i = 0; i < parseData.length; i++) {
                parseData[i]._children = parseData[i]["Contacts"];
            }
            this.accounts = parseData;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    constructor() {
        super();
        this.columns = [
            {
                type: "text",
                fieldName: "Name",
                label: "Name"
            },
            {
                type: "text",
                fieldName: "Phone",
                label: "Phone"
            },
            {
                type: "text",
                fieldName: "Rating",
                label: "Rating"
            },
            {
                type: "text",
                fieldName: "FirstName",
                label: "First Name"
            },
            {
                type: "text",
                fieldName: "LastName",
                label: "Last Name"
            },
            {
                type: "text",
                fieldName: "Phone",
                label: "Phone"
            },
            {
                type: "action",
                typeAttributes: { rowActions: this.getRowActions }
            }
        ];
    }

    get expandedRowItems() {
        return this.expandedRows;
    }

    getRowActions(row, doneCallBack) {
        const actions = [];
        actions.push({
            label: "Edit",
            name: "edit"
        });
        actions.push({
            label: "Delete",
            name: "delete"
        });
        doneCallBack(actions);
    }
}