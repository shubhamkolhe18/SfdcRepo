// Apex
public class QuizProvider {
    @AuraEnabled
    public static void submitQuizAnswer(String applicantName, String question1, String answer1, String question2, String answer2) {
        QuizApp__c quizApp = new QuizApp__c(
            Applicant_Name__c = applicantName,
            Question_1__c = question1,
            Answer_1__c = answer1,
            Question_2__c = question2,
            Answer_2__c = answer2
        );
        
        insert quizApp;
    }
}