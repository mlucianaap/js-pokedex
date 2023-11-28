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
    document.querySelector("body").classList.remove('stop-scrolling');
}

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

        <ol class="modal-types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <div class="modal-body-info">

            <div class="modal-about">
                <h3 class="modal-info-title">About</h3>
                <div class="modal-about-info">
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
            </div>

            <div class="modal-stats">
                <h3 class="modal-info-title">Base Stats</h3>
                <div class="modal-stats-info">
                    <ol class="modal-stats-name">
                        ${pokemon.stats.map((stat) => `
                            <div class="stats-name">
                                <li>${stat.name}</li>
                            </div>
                            `).join('')}
                    </ol>
                    <ol class="modal-stats-value">
                        ${pokemon.stats.map((stat) => `
                            <div class="stats-value">
                                <li>${stat.value}</li>
                            
                                <div class="rect-stats" style="width: ${stat.value}px;">
                                    <div class="rect-background"></div>
                                </div>
                            </div>
                            `).join('')}
                    </ol>
                </div>
            </div>
        </div>

        <div class="modal-body">
        </div>
    `;
}

function searchColor(typePokemon) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${typePokemon}`);
}

const openModal = (pokemonId) => {
    window.scroll(0,0);

    document.querySelector('body').classList.add('stop-scrolling');

    let pokemon;
    pokemons.forEach(element => {
        element.forEach(pokemonApi => {
            if (pokemonApi.number == pokemonId) {
                pokemon = pokemonApi;
        
                document.querySelector(".modal").classList.add(pokemon.type);     
                document.querySelector(".modal").innerHTML = convertPokemonToModal(pokemon);
            }
        })
    });

    document.querySelectorAll(".rect-stats")
        .forEach((rect) => rect.classList.add(pokemon.type));
    
    document.querySelectorAll(".rect-background")
        .forEach((rect) => rect.classList.add(pokemon.type));
    
    document.querySelectorAll(".modal-info-title")
        .forEach((title) => title.style.color = searchColor(pokemon.type));
    
    document.querySelectorAll(".stats-name")
        .forEach((name) => name.style.color = searchColor(pokemon.type));
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