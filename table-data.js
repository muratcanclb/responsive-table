let musicData = null;
document.addEventListener("DOMContentLoaded", function () {
  getMusicData();
  const form = document.getElementById("myForm");
  form.addEventListener("submit", function (event) {
    clearTable();
    event.preventDefault();
    if (document.getElementById("name").value) {
      // Input alanından değeri al
      const searchValue = document.getElementById("name").value;
      getMusicData(searchValue);
    }
  });
});
function getMusicData(filteredName) {
  axios
    .get("https://66141b0b2fc47b4cf27b9bf3.mockapi.io/api/music")
    .then(function (response) {
      musicData = response.data;
      if (filteredName) {
        // Alınan değeri kullan
        musicData = response.data.filter(function (music) {
          return music.name.startsWith(filteredName);
        });
      }
      const tableBody = document.querySelector("#musicTable tbody");
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        timeZone: "Europe/Istanbul", // Türkiye saati için zaman dilimini ayarlayın
      };
      musicData.forEach(function (music) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = music.id;
        row.insertCell(1).textContent = music.name;
        row.insertCell(2).textContent = music.type;
        const heartIcon = document.createElement("i");
        row.insertCell(3);
        if (music.isFavorite) {
          heartIcon.className = "fa fa-heart likeMusic";
          row.cells[3].appendChild(heartIcon);
          row.cells[3].classList.add("likeMusic");
        } else {
          heartIcon.className = "fa fa-heart";
          row.cells[3].appendChild(heartIcon);
        }
        row.insertCell(4).textContent = music.singer;
        const date = new Date(music.createdDate);
        row.insertCell(5).textContent = new Intl.DateTimeFormat(
          "tr-TR",
          options
        ).format(date);
        row.insertCell(6).textContent = music.price + " TL";
      });
    });
}
function clearTable() {
  // Tabloyu seç
  const table = document.getElementById("musicTable");
  // Tablonun tbody'sini seç
  const tbody = table.getElementsByTagName("tbody")[0];
  // tbody'nin tüm çocuklarını kaldır (satırları kaldır)
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}
