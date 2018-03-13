
// Classes start here

function QuizType(quizTypeId, questions) {
    this.quizTypeId = quizTypeId;
    this.questions = questions;
}

function Quiz(quizTypeId, startTime, numberCorrect, numberSkipped, endTime) {
    this.quizTypeId = quizTypeId;
    this.startTime = startTime;
    this.numberCorrect = numberCorrect;
    this.numberSkipped = numberSkipped;
    this.endTime = endTime;
    this.generateQuestion = function () {
        // Get new question type and difficulty
        var tempQuestion = quizTypes[this.quizTypeId].questions[this.numberCorrect];
        var tempQuestionTypeId = tempQuestion[0];
        var tempQuestionDifficulty = tempQuestion[1];
        // Generate new question
        currentQuestions[this.quizTypeId] = new CurrentQuestion(tempQuestionTypeId, this.quizTypeId, questionTypes[tempQuestionTypeId].generateQuestionData(tempQuestionDifficulty));
        // Display question on UI
        questionTypes[tempQuestionTypeId].displayQuestion(this.quizTypeId);
        // Update Question Number
        $("#quiz-container-" + quizTypeId + " .question-number").html(quizzes[quizTypeId].numberSkipped + quizzes[quizTypeId].numberCorrect + 1);
        
        console.log(currentQuestions[this.quizTypeId]);
        }
}

function QuestionType(questionTypeId, generateQuestionData, displayQuestion) {
    this.questionTypeId = questionTypeId;
    this.generateQuestionData = generateQuestionData;
    this.displayQuestion = displayQuestion;
}

function CurrentQuestion(questionTypeId, quizTypeId, questionData) {
    this.questionTypeId = questionTypeId;
    this.quizTypeId = quizTypeId;
    this.questionData = questionData;
}



         
	// Create a QuizType object

	var tempQuizTypeId = 0;
	var tempQuestions = [[0, 0], [0, 0], [0, 1], [0, 1], [0, 2], [0, 2]]; // [questionTypeId, difficulty]
	var tempNoOfQuestionsForEachLevel = [2, 2];


quizTypes[tempQuizTypeId] = new QuizType(tempQuizTypeId, tempQuestions);

console.log(quizTypes[0]);

// Create Question Types

var tempQuestionTypeId = 0;

var tempGenerateQuestionData = function (questionLevel) {
        switch (questionLevel) {
    case 0:
        // create question here
        			var min = 0;

                    var max = 10;

                    var x = Math.floor((Math.random() * max) + min);

                    var c = Math.floor((Math.random() * max) + min);

                    var a = c + Math.floor((Math.random() * max) + min);

                    var b = x + Math.floor((Math.random() * max) + min);

                    var d = a * x - c * x + b;

                    if (a == 1) { a = ""; }

                    if (c == 1) { c = ""; }

                    questionLHS = a + "x+" + b; 
                    
                    questionRHS = c + "x+" + d;

                    // generate solution
               
               return (generateQuestionDataObject(questionLHS, questionRHS));
 
        break;
    case 1:
                    var min = -10;

                    var max = 10;

                    var x = Math.floor((Math.random() * max) + min);

                    var c = Math.floor((Math.random() * max) + min);

                    var a = c + Math.floor((Math.random() * max) + min);

                    var b = x + Math.floor((Math.random() * max) + min);

                    var d = a * x - c * x + b;

                    if (a == 1) { a = ""; }

                    if (c == 1) { c = ""; }

                    questionLHS = a + "x+" + b; 
                    
                    questionRHS = c + "x+" + d;

                    // generate solution
               
               return (generateQuestionDataObject(questionLHS, questionRHS));
        break;
        case 2:
                    var min = -20;

                    var max = 0;

                    var x = Math.floor((Math.random() * max) + min);

                    var c = Math.floor((Math.random() * max) + min);

                    var a = c + Math.floor((Math.random() * max) + min);

                    var b = x + Math.floor((Math.random() * max) + min);

                    var d = a * x - c * x + b;

                    if (a == 1) { a = ""; }

                    if (c == 1) { c = ""; }

                    questionLHS = a + "x+" + b; 
                    
                    questionRHS = c + "x+" + d;

                    // generate solution
               
               return (generateQuestionDataObject(questionLHS, questionRHS));
        break;
        }
    };

    var tempDisplayQuestion = function(quizTypeId) {

    	var tempLHS = currentQuestions[quizTypeId].questionData.lhs

    	var startingHTML = `<table class="workingTable">
                    <tbody>
                        <tr id="first">
                            <td><span class="question-number"></span>. Solve</td>
                             <td class="alignRight"><span class="staticMath lhs questionLHS">`+currentQuestions[quizTypeId].questionData.lhs+`</span></td>
                                <td><span class="staticMath">=</span></td>
                                <td class="alignLeft"><span class="staticMath rhs questionRHS">`+currentQuestions[quizTypeId].questionData.rhs+`</span></td>
                            <td><button type="button" class="start btn btn-success btn-rounded">Go!</button></td>
                        </tr>
                    </tbody>
                </table><div class="resultDiv"></div><hr><div class="solutionDiv"><button class="showSolution pull-right btn btn-rounded btn-outline-secondary">Skip question and view the solution</button></div>`;

                $("#quiz-container-" + quizTypeId).html(startingHTML);

            }

questionTypes[tempQuestionTypeId] = new QuestionType(tempQuestionTypeId, tempGenerateQuestionData, tempDisplayQuestion);