const API_URL = "https://dragonball-api.com/api/characters";
const charactersContainer = document.getElementById("characters-container");
const paginationContainer = document.getElementById("paginationId");

function createCharacterCard(character) {
  const card = document.createElement("article");
  card.classList.add("card");

  card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <p>${character.id}</p>
        <h3>${character.name}</h3>
        <p>Ki: ${character.ki}</p>
    `;

  card.addEventListener("click", () => {
    window.location.href = `character-detail.html?identifier=${character.id}`;
  });

  return card;
}

async function getCharacters(pageNumber) {
  try {
    const response = await fetch(API_URL + "?page=" + pageNumber + "&limit=10");
    const data = await response.json();

    charactersContainer.innerHTML = "";

    data.items.forEach((character) => {
      const card = createCharacterCard(character);
      charactersContainer.appendChild(card);
    });

    createPagination(data.meta);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

function createPagination(paginationData) {
  paginationContainer.innerHTML = "";

  const currentPage = paginationData.currentPage;
  const totalPages = paginationData.totalPages;

  // Botón Anterior
  const previousButton = document.createElement("button");
  previousButton.textContent = "Anterior";
  previousButton.disabled = currentPage === 1;

  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      getCharacters(currentPage - 1);
    }
  });
  paginationContainer.appendChild(previousButton);

  // Botones numéricos de página
  for (let i = 1; i <= totalPages; i++) {
    const paginationButton = document.createElement("button");
    paginationButton.textContent = i;
    if (i === currentPage) {
      paginationButton.disabled = true;
    }

    paginationButton.addEventListener("click", () => {
      getCharacters(i);
    });
    paginationContainer.appendChild(paginationButton);
  }

  // Botón Siguiente
  const nextButton = document.createElement("button");
  nextButton.textContent = "Siguiente";
  nextButton.disabled = currentPage === totalPages;

  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      getCharacters(currentPage + 1);
    }
  });
  paginationContainer.appendChild(nextButton);
}

getCharacters(1);
