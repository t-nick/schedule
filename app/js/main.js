 window.onload = function () {
        var acc = document.getElementsByClassName("schedule-day");
        for (var i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var tasks = this.nextElementSibling;
                if (tasks.style.display === "block" && screen.width <= 767) {
                    tasks.style.display = "none";
                } else {
                    tasks.style.display = "block";
                }
            });
        }
      }