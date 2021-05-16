module.exports = class Questions {

    questions = []

    constructor(){
        this.questions.push(
            { Question:'Do you want to pick another card?', Answer: 'Yes', Result: true },
            { Question:'Do you want to pick another card?', Answer: 'No', Result: false }
        );
    }

    getAllQuestions(){
        return this.questions;
    }

}