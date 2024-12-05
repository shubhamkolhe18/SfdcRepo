import { LightningElement, track, wire} from 'lwc';
import searchAccounts from '@salesforce/apex/AccountProvider.searchAccounts' ;

export default class AccountSearchByAlphabetsTHub extends LightningElement {
    @track accountName;
    @track accounts = [];

    nameHandler(event) {
        this.accountName = event.target.value;
        if (!this.accountName) {
            // If the input field is empty, clear the search results
            this.accounts = [];
        } else {
            this.searchAccountsByName();
        }
    }

    searchAccountsByName() {
        searchAccounts({ accountName: this.accountName })
            .then((result) => {
                this.accounts = result;
            })
            .catch((error) => {
                // Handle any errors here
                console.error('Error fetching accounts:', error);
            });
    }
}