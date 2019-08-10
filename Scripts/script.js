document.addEventListener("DOMContentLoaded",function(event) {
    var playerList = [];
    var answeredPlayerList = [];
    var questionList = [];
    var answerId = 0;
    
    function addPlayer(playerList) {
        checkAddPlayer = confirm("Apakah anda ingin menambahkan pemain? ");
        if (checkAddPlayer == true) {
            var insertName = prompt("Masukkan Nama Pemain: ");
            var player = {
                name : insertName,
                answer : ""
            }
            playerList.push(player);
            addPlayer(playerList);
        }
    }

    function countTimer(timerSelector,setTimer) {
        var intervalSet = setInterval(function () {
            timerSelector.textContent = setTimer;
            if (--setTimer < 0) {
                clearInterval(intervalSet);
                questionBegin();
            };
        },1000)
    };

    function addList() {
        var pendingList = document.querySelector(".left-container");
        var ulPending = document.createElement('ul');
        for (let index = 0; index < playerList.length; index++) {
            var liPending = document.createElement('li');
            liPending.textContent = playerList[index].name;
            ulPending.appendChild(liPending);
        }
        pendingList.appendChild(ulPending);
    }

    function questionBegin() {
        var popUp = document.querySelector(".modal-wrapper");
        popUp.style.display = "block";
        var questionNumber = Math.floor(Math.random() * questionList.length);
        var selectedPlayer = Math.floor(Math.random() * playerList.length);
        document.querySelector("#candidate").textContent = playerList[selectedPlayer].name;
        var questionText = document.querySelector("#question");
        var correct =document.querySelector("#correct-button");
        var wrong = document.querySelector("#wrong-button");
        var buttonAnswer = document.querySelector("#begin-button");

        buttonAnswer.addEventListener("click",function (event) {
            document.querySelector(".sentence").style.display = "none";
            buttonAnswer.style.display = "none";
            questionText.style.display = "block";
            correct.style.display = "inline-block";
            wrong.style.display = "inline-block";
            questionText.textContent = questionList[questionNumber];
        });

        correct.addEventListener("click",function (event) {
            playerList[selectedPlayer].answer = "correct";
            var passedPlayer = playerList[selectedPlayer];
            answeredPlayerList.push(passedPlayer);
            playerList.splice(selectedPlayer,1);
            var liPassed = document.createElement('li');
            liPassed.textContent = answeredPlayerList[answerId].name + " - " + answeredPlayerList[answerId].answer;
            document.querySelector(".right-container ul").appendChild(liPassed);
            document.querySelector(".left-container ul").children[selectedPlayer].remove();
            answerId ++;
            questionList.splice(questionNumber,1);
        });
    };

    function revert() {
        document.querySelector(".sentence").style.display = "block";
        buttonAnswer.style.display = "block";
        questionText.style.display = "none";
        correct.style.display = "none";
        wrong.style.display = "none";
    }

    function rightList() {
        var passedList = document.querySelector(".right-container");
        var ulPassed = document.createElement("ul");
        passedList.appendChild(ulPassed);
    }

    var checkOldList = confirm('Apakah anda ingin melanjutkan list lama? ');
    if (checkOldList == true) {
        
    }
    else{
        rightList();
        alert("Please enter all candidates name one by one into the prompt window after");
        addPlayer(playerList);
        var setTimer = prompt("How many seconds do you wish to set your timer?");
        addList();
        for (let index = 0; index < playerList.length; index++) {
            questionList.push("Question "+index);
        }
        var timerSelector = document.querySelector("#seconds-left");
        countTimer(timerSelector,setTimer);
        
        
        
        console.log(questionList);
    }
});
    