addBtn = document.getElementById("addTaskBtn");
addBtn.addEventListener("click", function () {
  const modal = document.getElementById("addTaskModal");
  modal.style.display = "block";
  const overlay = document.getElementById("addTaskModalOverlay");
  overlay.style.display = "block";
});

window.onclick = function (event) {
  const modal = document.getElementById("addTaskModal");
  const overlay = document.getElementById("addTaskModalOverlay");
  if (event.target === modal || event.target === overlay) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
};
