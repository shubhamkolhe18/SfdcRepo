// JavaScript
import { LightningElement, track } from 'lwc';
import submitQuizAnswer from '@salesforce/apex/QuizProvider.submitQuizAnswer';

export default class QuizApp extends LightningElement {
    answer1 ;
    answer2 ;
    @track showCorrectAnswer = false;
    @track disableApplicantNameFieldFlag = false;
    @track showQuestionPage = false;
    @track selectedAnswers = {};
    isSaveButtonDisabled = true;
    applicantName = '';

    get ques1options() {
        return [
            { label: 'Jabalpur', value: 'Jabalpur' },
            { label: 'Bhopal', value: 'Bhopal' },
            { label: 'Indore', value: 'Indore' },
            { label: 'Gwalior', value: 'Gwalior' },
        ];
    }

    get ques2options() {
        return [
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Kolkata', value: 'Kolkata' },
            { label: 'Bangalore', value: 'Bangalore' },
            { label: 'New Delhi', value: 'New Delhi' },
        ];
    }

    submitNamehandler() {
        this.showQuestionPage = true;
        this.disableApplicantNameFieldFlag = true;
    }

    handleRadioChange(event) {
    const question = event.target.name;
    const answer = event.target.value;
    this.selectedAnswers[question] = answer;

    // Check if all questions have been answered
    const allQuestionsAnswered = Object.keys(this.selectedAnswers).length === 2;

    // Enable the Save button if all questions have been answered
    this.isSaveButtonDisabled = !allQuestionsAnswered;
    }


    saveAnswerHandler() {
    // Get the selected answers
    const answer1 = this.selectedAnswers.question1 || '';
    const answer2 = this.selectedAnswers.question2 || '';

    this.answer1 = answer1;
    this.answer2 = answer2;

    // Call the Apex method to save the answers
    submitQuizAnswer({ applicantName: this.applicantName, question1: 'What is the capital of Madhya Pradesh?', answer1, question2: 'What is the capital of India?', answer2 })
        .then(() => {
            // Reset the component after saving
            this.resethandler();
            this.showQuestionPage = false;
            this.applicantName = '';
            this.disableApplicantNameFieldFlag = false;
            this.showCorrectAnswer = true;

            setTimeout(() => {
            this.hideAnswerPage();
            }, 3000);
        })
        .catch(error => {
            console.error(error);
        });
    }


    resethandler() {
        // Reset the component state
        // alert('hello baby')
        this.showQuestionPage = true;
        this.selectedAnswers = {};
        this.isSaveButtonDisabled = true;
        this.disableApplicantNameFieldFlag = true;
        
    }

    handleNameChange(event) {
    this.applicantName = event.target.value;
    }

    cancelButtonhandler(){
        this.disableApplicantNameFieldFlag = false;
        
        // this.resethandler();
        this.applicantName = '';
        this.showCorrectAnswer = '';
        this.selectedAnswers = {};
        this.showQuestionPage = false;
    }

    hideAnswerPage() {
        this.showCorrectAnswer = false;
    }
}