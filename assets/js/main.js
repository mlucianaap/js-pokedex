const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <button class="card-pokemon" onclick="openModal(${pokemon.number})">
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
            </li>
        </button>
    `
}

const closeModal = (pokemon) => {
    document.querySelector(".modal").classList.remove(pokemon.type);
    document.querySelector(".modal").style.display = "none";
}

const arrow = `<svg width="92" height="16" viewBox="0 0 92 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M91 9C91.5523 9 92 8.55228 92 8C92 7.44772 91.5523 7 91 7V9ZM0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM91 7L1 7V9L91 9V7Z" fill="#3864D2"/>
            </svg>`;

function convertPokemonToModal(pokemon) {
    return `
        <div class="modal-header">
            <div class="modal-header">
                <button class="button-exit" data-close>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM16 9C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7V9ZM1 9H16V7H1V9Z" fill="white"/>
                    </svg>        
                </button>
                <h2 class="modal-title">${pokemon.name}</h2>
            </div>
            <p>#${pokemon.number}</>
        </div>

        <div class="modal-body">
            <img class="modal-img" src="${pokemon.photo}" alt="${pokemon.name}">
            <ol class="modal-types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
            <p class="modal-paragraph">Pokémon nº ${pokemon.number}!</p>
        </div>
    `;
}

const openModal = (pokemonId) => {
    window.scroll(0,0);

    let pokemon;
    pokemons.forEach(element => {
        element.forEach(pokemonApi => {
            if (pokemonApi.number == pokemonId) {
                pokemon = pokemonApi;
                console.log(pokemon);
                
                document.querySelector(".modal").classList.add(pokemon.type);
                document.querySelector(".modal").innerHTML = convertPokemonToModal(pokemon);
            }
        })
    });

    document.querySelector(".modal").style.display = "flex";
    document.querySelector("[data-close]").addEventListener("click", () => closeModal(pokemon));
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})