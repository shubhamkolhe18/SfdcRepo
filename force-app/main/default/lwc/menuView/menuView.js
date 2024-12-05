import { LightningElement, wire, track } from 'lwc';
import getMenuData from '@salesforce/apex/MenuOrderProvider.getMenuData'

export default class MenuView extends LightningElement {
    @track menus;

    // Fetch menu data using Apex wire method
    @wire(getMenuData)
    wiredMenus({ error, data }) {
        if (data) {
            this.menus = data;
        } else if (error) {
            console.error('Error fetching menu data:', error);
        }
    }

    // Handle menu selection
    handleMenuSelection(event) {
        const selectedMenuId = event.currentTarget.dataset.menuId;
        // Dispatch a custom event to notify the parent component about the menu selection
        this.dispatchEvent(new CustomEvent('menuselected', { detail: selectedMenuId }));
    }
}