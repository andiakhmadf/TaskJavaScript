document.addEventListener("DOMContentLoaded",function(event) {
    var timerSelector = document.querySelector("#seconds-left");
    var questionText = document.querySelector("#question");
    var correct =document.querySelector("#correct-button");
    var wrong = document.querySelector("#wrong-button");
    var buttonAnswer = document.querySelector("#begin-button");
    var popUp = document.querySelector(".modal-wrapper");
    
    function addPlayer(playerList) {
        var playerName = /\S/;
        checkAddPlayer = confirm("Do you wish to add new pending candidate? ");
        if (checkAddPlayer == true) {
            var insertName = prompt("Enter new candidate name: ");
            while (playerName.test(insertName) == false) {
                if (playerName.test(insertName) == false) {
                    alert("Nama tidak boleh kosong");
                }
                insertName = prompt("Enter new candidate name: ");
            };
            var player = {
                name : insertName,
                answer : ""
            };
            playerList.push(player);
            addPlayer(playerList);
        };
    };

    function countTimer(timerSelector,setTimer,selectedPlayer) {
        revert();
        var intervalSet = setInterval(function () {
            timerSelector.textContent = setTimer;
            --setTimer;
            if (setTimer < 0) {
                clearInterval(intervalSet);
                questionBegin(selectedPlayer);
            }
        },1000);
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

    function questionBegin(selectedPlayer) {
        popUp.style.display = "flex";
        var questionNumber = Math.floor(Math.random() * questionList.length);
        document.querySelector("#candidate").textContent = playerList[selectedPlayer].name;
        questionText.textContent = questionList[questionNumber];
        questionList.splice(questionNumber,1);
    };

    function revert() {
        document.querySelector(".sentence").style.display = "block";
        popUp.style.display = "none";
        buttonAnswer.style.display = "inline-block";
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
    };

    function startGame(selectedPlayer) {
        if (playerList.length != 0) {
            countTimer(timerSelector,setTimer,selectedPlayer);
        }else{
            popUp.style.display = "none";
            answerID = 0;
            alert("Game Over!");
        }
    };

    function getRandom() {
        var selectedPlayer = Math.floor(Math.random() * playerList.length);
        return selectedPlayer;
    };

    // ---------------------------------- MAIN PROGRAM -------------------------------------------
    var checkOldList = confirm("Do you wish to continue the old list? ");
    if (checkOldList == true && typeof (Storage) != undefined) {
        var setTimer = localStorage.getItem("setTimer");
        var playerList =  JSON.parse(localStorage.getItem("playerList") || []) ;
        var answeredPlayerList = JSON.parse(localStorage.getItem("answeredPlayerList") || []);
        var answerID = JSON.parse(localStorage.getItem("answerID") || []);
        var questionList = JSON.parse(localStorage.getItem("questionList") || []);
        loadList(playerList,answeredPlayerList);
        selectedPlayer = getRandom();
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
        localStorage.setItem("playerList", JSON.stringify(playerList));
        var numOnly = /\d/;
        while (numOnly.test(setTimer) == false) {
            var setTimer = prompt("How many seconds do you wish to set your timer?");
            if (numOnly.test(setTimer) == false) {
                alert("Harus Angka");
            };
        };
        localStorage.setItem("setTimer",setTimer);
        addList();
        for (let index = 0; index < playerList.length; index++) {
            questionList.push("Question "+index);
        }
        localStorage.setItem("answeredPlayerList",JSON.stringify(answeredPlayerList));
        localStorage.setItem("answerID",JSON.stringify(answerID));
        localStorage.setItem("questionList",JSON.stringify(questionList));
        selectedPlayer = getRandom();
        startGame(selectedPlayer);
    }

    correct.addEventListener("click",function(event) {
        event.preventDefault();
        playerList[selectedPlayer].answer = "correct";
        var passedPlayer = playerList[selectedPlayer];
        answeredPlayerList.push(passedPlayer);
        playerList.splice(selectedPlayer,1);
        var liPassed = document.createElement('li');
        liPassed.textContent = answeredPlayerList[answerID].name + " - " + answeredPlayerList[answerID].answer;
        document.querySelector(".right-container ul").appendChild(liPassed);
        document.querySelector(".left-container ul").children[selectedPlayer].remove();
        answerID ++;
        localStorage.setItem("playerList", JSON.stringify(playerList));
        localStorage.setItem("answeredPlayerList",JSON.stringify(answeredPlayerList));
        localStorage.setItem("answerID",JSON.stringify(answerID));
        localStorage.setItem("questionList",JSON.stringify(questionList));
        selectedPlayer = getRandom();
        startGame(selectedPlayer);
    });

    wrong.addEventListener("click",function(event) {
        event.preventDefault();
        playerList[selectedPlayer].answer = "wrong";
        var passedPlayer = playerList[selectedPlayer];
        answeredPlayerList.push(passedPlayer);
        playerList.splice(selectedPlayer,1);
        var liPassed = document.createElement('li');
        liPassed.textContent = answeredPlayerList[answerID].name + " - " + answeredPlayerList[answerID].answer;
        document.querySelector(".right-container ul").appendChild(liPassed);
        document.querySelector(".left-container ul").children[selectedPlayer].remove();
        answerID ++;
        localStorage.setItem("playerList",JSON.stringify(playerList));
        localStorage.setItem("answeredPlayerList",JSON.stringify(answeredPlayerList));
        localStorage.setItem("answerID",JSON.stringify(answerID));
        localStorage.setItem("questionList",JSON.stringify(questionList));
        selectedPlayer = getRandom();
        startGame(selectedPlayer);
    });

    buttonAnswer.addEventListener("click",function (event) {
        document.querySelector(".sentence").style.display = "none";
        buttonAnswer.style.display = "none";
        questionText.style.display = "block";
        correct.style.display = "inline-block";
        wrong.style.display = "inline-block";
    });
});
    