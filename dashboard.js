let completed = localStorage.getItem("completedTopics");

if(completed==null){

completed=0;

}

document.getElementById("completed").innerText=completed;

document.getElementById("progressFill").style.width=(completed/8)*100+"%";