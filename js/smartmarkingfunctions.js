



// Functions start here

window.onbeforeunload = function() {
  //return "You will lose all your progress if you leave or refresh this page, are you sure?";
};

 function createQuestion() {
                    
                    var min = 1;

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
                    
                }

function completeQuiz(quizTypeId) {
    
    
                        $("#quiz-container-" + quizTypeId).html(`<div class="row">
                    <!-- Column -->
                    <div class="col-lg-12">
                        <div class="card card-inverse card-primary">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="m-r-20 align-self-center">
                                        <h1 class="text-white"><i class="fa fa-smile-o"></i></h1></div>
                                    <div>
                                        <h3 class="card-title">Quiz Complete!</h3>
                                        <h6 class="card-subtitle">Great work - you've completed 1 quiz today, see if you can make it 2!</h6> </div>
                                    </div>
                                            
                                    <ul class="feeds text-white">
                                    <li><div class="bg-success"><i class="fa fa-check"></i></div> Questions correct: 6 out of 6</li>
                                    <li><div class="bg-warning"><i class="ti-control-forward"></i></div> Questions skipped: <b class="number-skipped">0</b></li>
                                    <li><div class="bg-info"><i class="fa fa-clock-o"></i></div> Time taken: <b class="time-taken">(Not currently working)</b>
                                    </ul>
                                    </div>
                            </div>
                        </div>
                    </div>`);
    
                    $(".number-skipped").html(quizzes[quizTypeId].numberSkipped);
                    
}

function checkAnswer(answer) {

                    var message = "";
                     
                    var solved = false;
    
                    if (currentQuestions[quizTypeId].questionData.minimumNumberOfSteps > 0 && currentQuestions[quizTypeId].questionData.currentNumberOfSteps < currentQuestions[quizTypeId].questionData.minimumNumberOfSteps) {
                        
                        message = '<div class="alert alert-warning">You need to show at least ' + currentQuestions[quizTypeId].questionData.minimumNumberOfSteps + ' lines of working (including your answer) for this question.<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button></div>';
                        
                        }

                    else if (answer == currentQuestions[quizTypeId].questionData.solution) {

                        quizzes[quizTypeId].numberCorrect ++;
                        
                        $(".number-correct").html(quizzes[quizTypeId].numberCorrect);
                        
                        $(".quiz-progress-bar").width(parseInt(100*quizzes[quizTypeId].numberCorrect/quizTypes[tempQuizTypeId].questions.length)+"%");
                        
                        
                        $(".nextStep").hide();
                        $(".hint").hide();
                        
                        if (quizzes[quizTypeId].numberCorrect == quizTypes[tempQuizTypeId].questions.length) {
                            
                            completeQuiz(quizTypeId);
                            
                        }
                        


                        message = '<button type="button" class="btn btn-success btn-lg btn-rounded next-question"><i class="fa fa-check"></i> Correct! Click for the next question</button>';
                        
                        solved = true;



                    } else {

                        message = '<div class="alert alert-warning">That\'s not right - try again.</div>';
                    }

                    $("#quiz-container-" + quizTypeId + " .resultDiv").html(message);
                     
                     return solved;
                    
                 }


                function getSolution(lhs, rhs) {

                    console.log()

                    return JSON.parse(Mathsteps.solveExpression(lhs + "=" + rhs));

                }
function upperCaseFirstLetter(string) {
                    
                    return string.charAt(0).toUpperCase() + string.slice(1);
                    
                }

                function lowerCaseAllWordsExceptFirstLetters(string) {
                    
                    return string.replace(/\w\S*/g, function(word) {
                        
                        return word.charAt(0) + word.slice(1).toLowerCase();
                        
                    });
                    
                }
                
                function generateNoOfSteps(steps) { 
                    
                    var noOfSteps = -1;
                    
                    for (key in steps) {
                        
                        if (typeof steps[key][1] !== null && typeof steps[key][1] === "object") { 
                            
                            noOfSteps++; 
                        
                        } else if (typeof steps[key]["after change"] != 'undefined' && steps[key]["hint"] != 1) {

                                var stepArr = steps[key]["after change"].split("=");

                                if (typeof stepArr[0] != 'undefined' && typeof stepArr[1] != 'undefined') {

                                    noOfSteps ++;

                                }

                        } 

                    }
                    
                    return(noOfSteps);
                    
                }

                function getInstructionSymbolAndOpposite(instructionArray, amount = "") {
                    
                    var instruction = instructionArray[0].toLowerCase();

                            var symbol = "";
                            
                            var oppositeSymbol = "";

                            var opposite = "";
                    
                            var fullInstruction = ""
                            
                            amount = '<span class="staticMath">' + amount + '</span>';

                            if (instruction == "add") {
                                symbol = "+";
                                opposite = "subtract";
                                oppositeSymbol = "-";
                                fullInstruction = "Add " + amount + " to both sides";
                            } else if (instruction == "subtract") {
                                oppositeSymbol = "+";
                                opposite = "add";
                                symbol = "-";
                                fullInstruction = "Subtract " + amount + " from both sides";
                            } else if (instruction == "multiply") {
                                oppositeSymbol = "/";
                                opposite = "divid";
                                symbol = "*";
                                fullInstruction = "Multiply both sides by " + amount;
                            } else if (instruction == "divide") {
                                oppositeSymbol = "*";
                                opposite = "multiply";
                                symbol = "÷";
                                fullInstruction = "Divide both sides by " + amount;
                            }

                            if (instruction == "divide") instruction = "divid";
                    
                    return({symbol:symbol, opposite:opposite, instruction:instruction, fullInstruction:fullInstruction})
                    
                }
                
                function generateHintsAndCommonProblems(steps) {  
                    
                    var hintCounter = 1;
                    
                    var commonProblems = [];
                            
                    var hints = [];
                    
                    for (key in steps) { 

                        if (steps[key]["hint"] == 1) {
                            
                            var tempArr = getInstructionSymbolAndOpposite(steps[key]["change"].split("_"));
                            
                            var symbol = tempArr.oppositeSymbol;
                            
                            var instruction = tempArr.instruction;
                            
                            var opposite = tempArr.opposite;

                            var commonProblemsIndex = commonProblems.length;
                            
                            commonProblems[commonProblemsIndex] = new Object();

                            commonProblems[commonProblemsIndex]['symbol'] = symbol + steps[key]["amount"];

                            commonProblems[commonProblemsIndex]['description'] = "It looks like you " + opposite + "ed " + steps[key]["amount"] + " instead of " + instruction + "ing. Try again.";

                            if (instruction == "multiply" || instruction == "divid") instruction = "Try " + instruction + "ing both sides by " + steps[key]["amount"];
                            else instruction = "Try " + instruction + "ing " + steps[key]["amount"] + " from both sides";

                            //solutionSteps += '<tr><td>HINT</td><td colspan=4>' + instruction + '</td></tr>';

                            hints[hintCounter] = instruction;

                            hintCounter++;

                        } 
                        
                    }

                    return ({hints:hints, commonProblems:commonProblems});
                }

function setupMathFields() {

                    
                    var slides = document.getElementsByClassName("staticMath");

                        for (var i = 0; i < slides.length; i++) {

                            MQ.StaticMath(slides.item(i));

                        }
                    
                    if (isTouch) {
                        
                        // Do setup for touch devices
                    
                        setupMathFieldsTouch();
   
                    } else {
                        
                        // Do setup for non-touch devices

                        var slides = document.getElementsByClassName("math-input");

                        for (var i = 0; i < slides.length; i++) {

                            var answerSpan = slides.item(i);

                            var answerMathField = MQ.MathField(answerSpan, {

                                handlers: {

                                    edit: function() {

                                        var enteredMath = answerMathField.latex(); 

                                    },

                                    enter: function() {

                                        alert(1);

                                        createRow(document.activeElement.parentNode.parentNode);

                                    }

                                }

                            });

                        }

                    }
                    
                }
                
                function getLatex(element) {
                    
                    if (isTouch) {
                        
                        return (element.getAttribute("math-input-value"));
                        
                    } else {
                    
                        return (MQ.MathField(element).latex());
                        
                    }
                    
                }

                function getQuizTypeIdFromDiv(quizDiv) {

                    return (parseInt(quizDiv.attr("id").match(/\d+/)[0]));

                }

                function createRow(button) {

                    var containingTable = $(button).parent().parent();

                    var quizDiv = containingTable.parent();

                    var quizTypeId = getQuizTypeIdFromDiv(quizDiv);


                    var hintHTML = 'Hint';

                    if (button.id == 'first') {
                        
                        lhs = currentQuestions[quizTypeId].questionData.questionLHS;
                        
                        rhs = currentQuestions[quizTypeId].questionData.questionRHS;
                        
                        var removeRow = '';
                        
                    } else {

                        if (button.rowIndex == 1) {
                            
                            var previousLHS = currentQuestions[quizTypeId].questionData.questionLHS;
                            
                            var previousRHS = currentQuestions[quizTypeId].questionData.questionRHS;
                            
                        } else {
                            
                            var previousLHS = getLatex(button.previousElementSibling.cells[1].children[0]);
                            
                            var previousRHS = getLatex(button.previousElementSibling.cells[3].children[0]);
                            
                        }

                        var removeRow = '<span class="removeRow text-info"><i class="ti-back-right"></span>';
                        
                        var lhs = getLatex(button.cells[1].children[0]);
                        
                        var rhs = getLatex(button.cells[3].children[0]);
                        
                        if (lhs == "x" && !isNaN(rhs)) {
                            
                            
                            checkAnswer(rhs);
                                
                                return;
                            
                        }
                        
                        
                        $(".removeRow").remove();
                        
                        var answerHTML = "";

                        var parser = math.parser();

                        console.log(currentQuestions[quizTypeId]);
                        
                        parser.eval('x = ' + currentQuestions[quizTypeId].questionData.solution);

                        var message = '<span class="message ';

                        try {

                            var lhsValue = parser.eval(lhs);

                        } catch (err) {

                            message += 'wrong">&#x2717; Check your left hand side - it doesn\'t appear to be a valid expression';

                        }

                        if (message == '<span class="message ') {

                            try {

                                var rhsValue = parser.eval(rhs);

                            } catch (err) {

                                message += 'wrong">&#x2717; Check your right hand side - it doesn\'t appear to be a valid expression';

                            }


                        }

                        if (message == '<span class="message ') {

                            if (lhsValue != rhsValue) {

                                // CHeck for common errors
                                
                                $.each(currentQuestions[quizTypeId].questionData.commonProblems, function( index, commonProblem ) {
                                    
                                    if (typeof commonProblem ['symbol'] !== null && typeof commonProblem ['description'] !== null) {
  
                                        var problemValueLHS =  "(" + previousLHS + ")" + commonProblem ['symbol'];

                                        var problemValueRHS =  "(" + previousLHS + ")" + commonProblem ['symbol'];

                                        if (MathExpression.fromText(problemValueLHS).equals(MathExpression.fromText(lhs)) || MathExpression.fromText(problemValueRHS).equals(MathExpression.fromText(rhs))) {

                                                message += ' wrong">&#x2717; ' + commonProblem ['description'];

                                            }
                                        
                                        }

                                });

                                if (message == '<span class="message ') message += ' wrong">&#x2717; That\'s not right - check your working';

                            } else {

                                // Check if simpler or more complex

                                var steps = getSolution(lhs, rhs);
                                
                                if (generateNoOfSteps(steps) < currentQuestions[quizTypeId].questionData.stepsRemaining ) {
                                    
                                    message += ' text-success">&#10004;';
                                    
                                    currentQuestions[quizTypeId].questionData.currentNumberOfSteps ++;

                                    var hintsAndCommonProblems = generateHintsAndCommonProblems(steps);


                                    currentQuestions[quizTypeId].questionData.steps = steps;
                                    currentQuestions[quizTypeId].questionData.stepsRemaining = generateNoOfSteps(steps);
                                    currentQuestions[quizTypeId].questionData.hints = hintsAndCommonProblems.hints;
                                    currentQuestions[quizTypeId].questionData.commonProblems = hintsAndCommonProblems.commonProblems;
                                    
                                } else if (generateNoOfSteps(steps) == currentQuestions[quizTypeId].questionData.stepsRemaining ) {
                                    
                                    message += ' warning">&#9888; That is correct, but it doesn\'t look any simpler than the previous line.';
                                    
                                } else {

                                    message += ' warning">&#9888; That is correct, but it looks more complicated than the previous line.';

                                }

                            }

                        }

                        $(button).find('td:last').html(message + "</span>");

                    }


                    containingTable.find(".math-input").addClass("disabled");
                    
                    var nonTouchClass = "";
                    if (!isTouch) { nonTouchClass = " math-input-nontouch"; }
                    
                    var hintHTML = "";
                    
                    if (typeof currentQuestions[quizTypeId].questionData.hints[1] != 'undefined') {
                        
                        hintHTML = '<span style="position:absolute"><a class="protip hint text-warning" data-pt-title="'+currentQuestions[quizTypeId].questionData.hints[1]+'" data-pt-offset-left="50">Hint&nbsp&nbsp</a></span>';
                        
                    }

                    var markup = '<tr><td>' + removeRow + '</td><td class="alignRight"><div class="math-input' + nonTouchClass + '" id="answerStepLHS-'+button.rowIndex+'">' + lhs + '</div></td><td class="staticMath working-equals">=</td><td><div class="math-input' + nonTouchClass + '" id="answerStepRHS-'+button.rowIndex+'">' + rhs + '</div></td><td><button class="btn btn-rounded btn-success nextStep">Next step</button>'+hintHTML+'</td></tr>';
                    
                    containingTable.append(markup);
                    
                    setupMathFields();
                    
                    setupProtips();
                    
                }



function setupInteractivity() {
    
    
                    $('html').on('vclick click', '.refresh-example', function() {
                        
                        quizzes[quizTypeId].generateQuestion();
    
                        $(".example-container").html(currentQuestions[quizTypeId].questionData.solutionSteps);
                    
                        setupMathFields();
                    
                    });
    

                    $('html').on('vclick click', '.showSolution', function() {
                        
                        $(".workingTable").addClass("non-interactive");
                        
                        quizzes[tempQuizTypeId].numberSkipped ++;
                        
                        $(".number-skipped").html(quizzes[tempQuizTypeId].numberSkipped);
                        
                    $(this).parent().html(currentQuestions[quizTypeId].questionData.solutionSteps + "<hr><button type='button' class=' btn btn-success btn-rounded next-question'>Try another question</button>");
                    
                        setupMathFields();
                    
                    });

                    $('html').on('vclick click', '.nextStep', function() {
                        
                        createRow(this.parentNode.parentNode);

                    });

                     $('html').on('vclick click', '.start', function() {
                        
                        createRow(this.parentNode.parentNode);
                        
                        $(".start").remove();
                        
                    });

}

function setupProtips() {
     $(".protip").protipSet({
                trigger: 'hover',
                position:'right',
                         scheme:'aqua'
});
}


function setupSmartMarking(quizTypeId) {

                var quizDiv = $("#quiz-container-" + quizTypeId);


                    quizDiv.on('click vclick', '.removeRow', function() {
                        
                        currentQuestions[quizTypeId].questionData.currentNumberOfSteps --;

                        $(this).parents("tr").prev().find(".disabled").removeClass("disabled");

                        if ($(this).parents("tr").index() > 2) {

                            $(this).parents("tr").prev().find("td").first().html("<span class='removeRow text-info'><i class='ti-back-right'></span>");

                        }
                        
                        var hintHTML = "";
                    
                        if (typeof currentQuestions[quizTypeId].questionData.hints[1] != 'undefined') {
                        
                            hintHTML = '<span style="position:absolute"><a class="protip hint text-warning" data-pt-title="'+currentQuestions[quizTypeId].questionData.hints[1]+'" data-pt-offset-left="50">Hint&nbsp&nbsp</a></span>';
                        
                        }
                        
                        $(this).parents("tr").prev().find("td").last().html('<button class="btn btn-rounded btn-success nextStep">Next step</button>'+hintHTML);
                        
                        var prevLHS = getLatex(document.getElementById($(this).parents("tr").prev().find("td").first().next().find("div").attr("id")));
                        
                        var prevRHS = getLatex(document.getElementById($(this).parents("tr").prev().find("td").first().next().next().next().find("div").attr("id")));
                        
                        var steps = getSolution(prevLHS, prevRHS);
                    
                        var hintsAndCommonProblems = generateHintsAndCommonProblems(steps);
                                    
                        currentQuestions[quizTypeId].questionData.stepsRemaining = generateNoOfSteps(steps);
                        currentQuestions[quizTypeId].questionData.hints = hintsAndCommonProblems.hints;
                         currentQuestions[quizTypeId].questionData.commonProblems = hintsAndCommonProblems.commonProblems;
                
                        
                        $(this).parents("tr").remove();
                        
                       setupProtips();

                    });

                    quizDiv.on('vclick click', '.next-question', function() {
                        
                        $(".workingTable").removeClass("non-interactive");

                        quizzes[quizTypeId].generateQuestion();

                        setupMathFields();
                        
                    });

                
                quizDiv.on('hover', '.hint', function() {

                    var quizTypeId = getQuizTypeIdFromDiv(quizDiv);

                    $(this).popover({
                        
                        trigger: 'manual',
                        
                        placement: 'right',
                        
                        content: function() {
                            
                            var message = currentQuestions[quizTypeId].questionData.hints[1];
                            
                            return message;
                            
                        }
                        
                    });
                    
                    $(this).html("&nbsp;");
                    
                    $(this).popover("show");

                });
                

                setupMathFields();


}

function generateQuestionDataObject(questionLHS, questionRHS) {

                var solution;
                
                var steps = getSolution(questionLHS, questionRHS);
                    
                var hintsAndCommonProblems = generateHintsAndCommonProblems(steps);
                
                questionSteps = generateNoOfSteps(steps);
                
                var i = 1;
                var solutionSteps = '<table id="suggestedSolution"><tbody><tr><td class="working-first-column">Problem:</td><td class="alignRight"><span class="staticMath lhs workingLHS">' + questionLHS + '</span></td><td><span class="staticMath">=</span></td><td class="alignLeft"><span class="staticMath rhs workingRHS">' + questionRHS + '</td><td></td></tr>';

                for (key in steps) {
                    
                    var step = new Object();

                    if (typeof steps[key][2] != 'undefined') { // if it is a multi-part step
                        
                        step = steps[key][2]; 
                    
                    } else {
                        
                        step = steps[key];
                    }
                    
                    var stepArr = step["after change"].split("=");
                    
                    if (step["hint"] == 1 && step["amount"] != "") {
                                
                                var tempArr = getInstructionSymbolAndOpposite(steps[key]["change"].split("_"), step["amount"]);
                            
                                var process = tempArr.symbol + ' ' + step["amount"];
                            
                                var fullInstruction = tempArr.fullInstruction;
                                
                                solutionSteps+='<tr><td></td><td class="hintLHS"><button class="btn btn-rounded btn-sm btn-outline-primary"><span class="staticMath lhs"><span class="staticMath">' + process + '</span></button></td><td></td> <td class="hintRHS"><button class="btn btn-rounded btn-sm btn-outline-primary"><span class="staticMath">' + process + '</span></button></td><td class="working-instructions">' + fullInstruction + '</td></tr>';
                        
                    } else if (typeof stepArr[0] != 'undefined' && typeof stepArr[1] != 'undefined') {

                                solutionSteps+='<tr><td>Step ' + i  + ':</td><td class="workingLHS text-info">' + stepArr[0] + '</span></td><td><span class="staticMath text-info">=</span></td> <td class="workingRHS text-info"><span class="staticMath rhs">' + stepArr[1] + '</td><td></td></tr>';

                                i++;

                                solution = parseInt(stepArr[1]);

                            }
                    
                    
                            }
                      

                solutionSteps += '</tbody></table>';
    
                var minimumNumberOfSteps = 2;

                    return ({questionLHS:questionLHS, questionRHS:questionRHS, lhs:questionLHS, rhs:questionRHS, questionSteps:questionSteps, stepsRemaining:questionSteps, solution:solution, steps:steps, solutionSteps:solutionSteps, hints:hintsAndCommonProblems.hints, commonProblems:hintsAndCommonProblems.commonProblems,minimumNumberOfSteps:minimumNumberOfSteps,currentNumberOfSteps:1})


}