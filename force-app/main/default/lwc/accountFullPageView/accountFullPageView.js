import { LightningElement } from 'lwc';

export default class AccountFullPageView extends LightningElement() {
    redirectToAccountsListView() {
        const url = '/lightning/o/Account/list';
        const win = window.open(url, '_blank');
        win.focus();
      }
}