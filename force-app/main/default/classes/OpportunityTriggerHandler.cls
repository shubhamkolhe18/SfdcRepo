public class OpportunityTriggerHandler {
    Public Static void updateDesc(List<Opportunity> Opplist){
        for(Opportunity Opp : Opplist){
            if(Opp.Amount!=null && Opp.Amount>100000){
                Opp.Description='Hot Opportunity';
            }else{
                Opp.Description = 'Moderate Opportunity';
            }
        }
    }
}