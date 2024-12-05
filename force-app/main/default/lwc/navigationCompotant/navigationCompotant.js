import { LightningElement , track } from 'lwc';
export default class NavigationCompotant extends LightningElement {
     @track showNavigationBar = true;
     @track isRecord = false;
    @track isLead = false;
    @track isCarousel = false;
    @track isOpp = false;
    @track isObj = false;
    @track isNameNav = false
    
    

    showRecord() {
        this.isRecord = true;
        this.isLead = false;
        this.isCarousel = false;
        this.isOpp = false;
        this.isNavi = false;
        this.isObj = false;
        this.isNameNav = false;
    }

    showLead() {
        this.isRecord = false;
        this.isLead = true;
        this.isCarousel = false;
        this.isOpp = false;
        this.isObj = false;
        this.isNameNav = false;
    }

    showCarousel() {
        this.isRecord = false;
        this.isLead = false;
        this.isCarousel = true;
        this.isOpp = false;
        this.isObj = false;
        this.isNameNav = false;
    }

    showOpp() {
        this.isRecord = false;
        this.isLead = false;
        this.isCarousel = false;
        this.isOpp = true;
        this.isObj = false;
        this.isNameNav = false;
    }

    showNavi() {
        this.isRecord = false;
        this.isLead = false;
        this.isCarousel = false;
        this.isOpp = false;
        this.isObj = false;
        this.isNameNav = false;
    }

    showObjNav() {
        
        this.isRecord = false;
        this.isLead = false;
        this.isCarousel = false;
        this.isOpp = false;
        this.isObj = true;
        this.isNameNav = false;
    }

    showNameNav() {
        this.isRecord = false;
        this.isLead = false;
        this.isCarousel = false;
        this.isOpp = false;
        this.isObj = false;
        this.isNameNav = true;
    }

}