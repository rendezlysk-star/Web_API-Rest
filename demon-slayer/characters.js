const url = "https://www.demonslayer-api.com/api/v1/characters?limit=45";
const contenedor = document.getElementById("contenedor");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.content.forEach((personaje) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <img src="${personaje.img}" alt="${personaje.name}">
        <p>${personaje.id}</p>
        <h3>${personaje.name}</h3>
        <p>Edad: ${personaje.age}</p>
      `;

      contenedor.appendChild(card);
    });
  });
