public class AccountTriggerClass {
    public static void updateRating(List<Account> accList){
        for(Account acc : accList){
            if(acc.Industry!=null && acc.Industry == 'Media'){
                acc.Rating = 'Hot';
            }else{
                acc.Rating = '';
            }
        }
    }
}