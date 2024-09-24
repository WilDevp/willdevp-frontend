// Variable para manejar el seguimiento de la pagina
let currentPage = 1;

// Función para obtener los datos de la API
async function getCharacters(page){
    const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`);
    const data = await response.json();
    return data.results;
}

// Función para crear la tarjeta de los personajes
function createCharacterCard(character){
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <img src="${character.image}" alt="${character.name}">
        <div class="card-body">
            <h2>${character.name}</h2>
            <p>${character.status}</p>
            <p>${character.species}</p>
        </div>
    `;
    return card;
}


// Función para mostrar los datos en la pagina
async function displayCharacters(page){
    const container = document.getElementById('characters-container');
    const characters = await getCharacters(page);
    characters.forEach(character => {
        const card = createCharacterCard(character);
        container.appendChild(card);
    });
}

// Función para cargar mas personajes
function handleLoadMore(){
    currentPage++;
    displayCharacters(currentPage);
}

// Evento para cargar mas personajes
document.addEventListener('DOMContentLoaded', () => {
    displayCharacters(currentPage);
    const loadMoreButton = document.getElementById('load-more');
    loadMoreButton.addEventListener('click', handleLoadMore);
})