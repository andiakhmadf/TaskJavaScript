document.addEventListener("DOMContentLoaded",function(event) {
    var playerList = [];
    var answeredPlayerList = [];
    var questionList = [];
    
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
                var popUp = document.querySelector(".modal-wrapper");
                popUp.style.display = "block";
                var questionNumber = Math.floor(Math.random() * questionList.length);
                var selectedPlayer = Math.floor(Math.random() * playerList.length);
                document.querySelector("#candidate").textContent = playerList[selectedPlayer].name;
                // var questionText = document.querySelector("#question");
                // var buttonAnswer = document.querySelector("#begin-button");
                // if (questionList[questionNumber] == questionNumber) {
                //     console.log(questionList[questionNumber].value);
                //     questionText.appendChild(questionList[questionNumber].value);
                //     buttonAnswer.addEventListener("click",function(event) {
                //         document.querySelector(".sentence").style.display = "none";
                //         questionText.style.display = "block";
                //         buttonAnswer.style.display = "none";
                        
                //     });
                // };
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

    var checkOldList = confirm('Apakah anda ingin melanjutkan list lama? ');
    if (checkOldList == true) {
        
    }
    else{
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
    