const url = "https://dragonball-api.com/api/characters?limit=58";
const contenedor = document.getElementById("contenedor");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.items.forEach((personaje) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${personaje.image}" alt="${personaje.name}">
        <p>${personaje.id}</p>
        <h3>${personaje.name}</h3>
        <p>Ki: ${personaje.ki}</p>
      `;

      contenedor.appendChild(card);
    });
  });
