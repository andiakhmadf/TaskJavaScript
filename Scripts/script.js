document.addEventListener("DOMContentLoaded",function(event) {
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
    };

    function countTimer(timerSelector,setTimer) {
        revert();
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
    };

    function questionBegin() {
        popUp.style.display = "block";
        var questionNumber = Math.floor(Math.random() * questionList.length);
        var selectedPlayer = Math.floor(Math.random() * playerList.length);
        document.querySelector("#candidate").textContent = playerList[selectedPlayer].name;
        
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
            liPassed.textContent = answeredPlayerList[answerID].name + " - " + answeredPlayerList[answerID].answer;
            document.querySelector(".right-container ul").appendChild(liPassed);
            document.querySelector(".left-container ul").children[selectedPlayer].remove();
            answerID ++;
            questionList.splice(questionNumber,1);
            localStorage.setItem("playerList", JSON.stringify(playerList));
            localStorage.setItem("answeredPlayerList",JSON.stringify(answeredPlayerList));
            localStorage.setItem("answerID",JSON.stringify(answerID));
            localStorage.setItem("questionList",JSON.stringify(questionList));
            startGame();
        });

        wrong.addEventListener("click",function (event) {
            playerList[selectedPlayer].answer = "wrong";
            var passedPlayer = playerList[selectedPlayer];
            answeredPlayerList.push(passedPlayer);
            playerList.splice(selectedPlayer,1);
            var liPassed = document.createElement('li');
            liPassed.textContent = answeredPlayerList[answerID].name + " - " + answeredPlayerList[answerID].answer;
            document.querySelector(".right-container ul").appendChild(liPassed);
            document.querySelector(".left-container ul").children[selectedPlayer].remove();
            answerID ++;
            questionList.splice(questionNumber,1);
            localStorage.setItem("playerList",JSON.stringify(playerList));
            localStorage.setItem("answeredPlayerList",JSON.stringify(answeredPlayerList));
            localStorage.setItem("answerID",JSON.stringify(answerID));
            localStorage.setItem("questionList",JSON.stringify(questionList));
            startGame();
        });
    };

    function revert() {
        document.querySelector(".sentence").style.display = "block";
        popUp.style.display = "none";
        buttonAnswer.style.display = "block";
        buttonAnswer.style.textAlign = "center";
        questionText.style.display = "none";
        correct.style.display = "none";
        wrong.style.display = "none";
    };

    function rightList() {
        var passedList = document.querySelector(".right-container");
        var ulPassed = document.createElement("ul");
        passedList.appendChild(ulPassed);
    };

    function loadList(playerList,answeredPlayerList) {
        var pendingList = document.querySelector(".left-container");
        var ulPending = document.createElement('ul');
        playerList.forEach(player => {
            var liPending = document.createElement('li');
            liPending.textContent = player.name;
            ulPending.appendChild(liPending);
        });
        pendingList.appendChild(ulPending);
        
        var passedList = document.querySelector(".right-container");
        var ulPassed = document.createElement('ul');
        answeredPlayerList.forEach(player => {
            var liPassed = document.createElement('li');
            liPassed.textContent = player.name + " - " + player.answer;
            ulPassed.appendChild(liPassed);
        });
        passedList.appendChild(ulPassed);
    }

    function startGame() {
        if (playerList.length != 0) {
            countTimer(timerSelector,setTimer);
        }else{
            popUp.style.display = "none";
            answerID = 0;
            alert("Game Over!");
        }
        
    };

    var checkOldList = confirm('Apakah anda ingin melanjutkan list lama? ');
    if (checkOldList == true && typeof (Storage) != undefined) {
        var setTimer = localStorage.getItem("setTimer");
        var playerList =  JSON.parse(localStorage.getItem("playerList") || []) ;
        var answeredPlayerList = JSON.parse(localStorage.getItem("answeredPlayerList") || []);
        var answerID = JSON.parse(localStorage.getItem("answerID") || []);
        var questionList = JSON.parse(localStorage.getItem("questionList") || []);
        var timerSelector = document.querySelector("#seconds-left");
        var questionText = document.querySelector("#question");
        var correct =document.querySelector("#correct-button");
        var wrong = document.querySelector("#wrong-button");
        var buttonAnswer = document.querySelector("#begin-button");
        var popUp = document.querySelector(".modal-wrapper");
        loadList(playerList,answeredPlayerList);
        startGame();
    }
    else{
        localStorage.clear();
        var playerList = [];
        var answeredPlayerList = [];
        var questionList = [];
        var answerID = 0;
        rightList();
        alert("Please enter all candidates name one by one into the prompt window after");
        addPlayer(playerList);
        var setTimer = prompt("How many seconds do you wish to set your timer?");
        localStorage.setItem("setTimer",setTimer);
        addList();
        for (let index = 0; index < playerList.length; index++) {
            questionList.push("Question "+index);
        }
        var timerSelector = document.querySelector("#seconds-left");
        var questionText = document.querySelector("#question");
        var correct =document.querySelector("#correct-button");
        var wrong = document.querySelector("#wrong-button");
        var buttonAnswer = document.querySelector("#begin-button");
        var popUp = document.querySelector(".modal-wrapper");
        startGame();
    }
});
    