public class AccountProviderHandler{
	public static void createAutoContact(List<Account> accList){
	List<Contact> conList = new List<Contact>();
	for(Account acc : accList){
			Contact con = new contact();
			con.firstName = acc.Name + 'FN';
			con.lastName = acc.Name + 'LN';
			con.AccountId = acc.id;
			conList.add(con);
		}
		if(!conList.isEmpty()){
		insert conList;
		}
	}
}