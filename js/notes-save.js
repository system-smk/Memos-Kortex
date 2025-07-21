function saveNote() {
  const note = document.getElementById("noteInput").value;
  localStorage.setItem("smkortex_note", note);
  document.getElementById("savedStatus").innerText = "✅ Note sauvegardée localement.";
}

// Chargement automatique à l’ouverture
window.onload = () => {
  const saved = localStorage.getItem("smkortex_note");
  if (saved) {
    document.getElementById("noteInput").value = saved;
    document.getElementById("savedStatus").innerText = "🧠 Note restaurée.";
  }
};
