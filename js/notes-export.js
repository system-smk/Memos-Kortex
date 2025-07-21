function exportMemoToJSON(filename = "memo-smkortex.json") {
  const memo = document.getElementById("noteInput").value;
  const data = {
    note: memo,
    timestamp: new Date().toISOString(),
    author: "Mathieu-Karim"
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;

  document.body.appendChild(link);   // 🔧 Ajout dans le DOM
  link.click();                      // ✅ Déclenchement
  document.body.removeChild(link);  // 🔧 Nettoyage du DOM
}
