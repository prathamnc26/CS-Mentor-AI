const startBtn = document.getElementById("startBtn");
const topicsSection = document.querySelector(".topics");

startBtn.addEventListener("click", () => {
    topicsSection.scrollIntoView({
        behavior: "smooth"
    });
});