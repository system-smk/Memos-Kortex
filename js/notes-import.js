function importMemoFromFile() {
  const input = document.getElementById("memoFileInput");
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = () => {
    let content = reader.result;

    // Si c’est un .json, on extrait la propriété "note"
    if (file.name.endsWith(".json")) {
      try {
        const parsed = JSON.parse(content);
        content = parsed.note || "";
      } catch (e) {
        content = "[⚠️ Erreur de lecture JSON]";
      }
    }

    document.getElementById("noteInput").value = content;
    document.getElementById("savedStatus").innerText = "✅ Mémo importé avec succès.";
  };

  reader.readAsText(file);
}
