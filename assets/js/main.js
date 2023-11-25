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
                    <img src="/assets/images/arrow.svg">       
                </button>
                <h2 class="modal-title">${pokemon.name}</h2>
            </div>
            <p>#${pokemon.number}</>
        </div>
        
        <img class="modal-img" src="${pokemon.photo}" alt="${pokemon.name}">

        <div class="modal-body">
            
            <ol class="modal-types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>

            <h3 class="modal-info-title" style="${getComputedStyle(document.documentElement).getPropertyValue(`--${pokemon.type}`)}">About</h3>
            <div class="modal-about">
                <div class="modal-about-weight">
                    <div class="modal-about-weight-info">
                        <img src="/assets/images/weight.svg">
                        <p class="modal-paragraph">${pokemon.weight/10} kg</p>
                    </div>
                    <h4 class="modal-about-subtitle">Weight</h4>
                </div>
                <div class="modal-about-height">
                    <div class="modal-about-height-info">
                        <img src="/assets/images/straighten.svg">
                        <p class="modal-paragraph">${pokemon.height/10} m</p>
                    </div>
                    <h4 class="modal-about-subtitle">Height</h4>
                </div>
                <div class="modal-about-abilities">
                    <ol class="modal-abilities">
                        ${pokemon.abilities.map((ability) => `<li>${ability.replace("-", " ")}</li>`).join('')}
                    </ol>
                    <h4 class="modal-about-subtitle">Abilities</h4>
                </div>
            </div>

            <h3 class="modal-info-title" style="var(--${pokemon.type})">Base Stats</h3>
            <div class="modal-stats">
                <ol class="modal-stats-name">
                    ${pokemon.stats.map((stat) => `<li>${stat.name.replace("-", " ")}</li>`).join('')}
                </ol>
                <ol class="modal-stats-value">
                    ${pokemon.stats.map((stat) => `<li>${stat.value}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;
}

function searchColor(typePokemon) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${typePokemon}`);
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

    document.querySelectorAll(".modal-info-title")
        .forEach((title) => title.style.color = searchColor(pokemon.type));
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