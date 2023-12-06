import axios from 'axios'
import './../scss/style.scss'
//import { IPokemons } from './models/IPokemons'
import { IResponse } from './models/IResponse';
import { IPokemon } from './models/IPokemon';
import { IPokemonDetails } from './models/IPokemonDetails';

const mainDiv = document.getElementById("app") as HTMLDivElement;
const pokemonsContainer = document.createElement("ul");
pokemonsContainer.className = "pokemonsContainer";
mainDiv.appendChild(pokemonsContainer);

const pokemonButton = document.createElement("button");
pokemonButton.innerHTML = "Hämta Pokemons";
mainDiv.appendChild (pokemonButton);


const getPokemons = async () => {
pokemonsContainer.innerHTML = "";

const response = await axios.get<IResponse>("https://pokeapi.co/api/v2/pokemon/");


response.data.results.forEach((pokemon) => {
  console.log(pokemon.name);
  
  const pokemonContainer = document.createElement("li");
  const pokemonName = document.createElement("p");
  pokemonName.innerHTML = pokemon.name;
  pokemonName.className = "pokemonName"

  
  pokemonName.addEventListener("click", () => {
    showDetails(pokemon, pokemonContainer)
  });
  
  pokemonsContainer.appendChild(pokemonContainer);
  pokemonContainer.appendChild(pokemonName);
  
});
};

const showDetails = async (p: IPokemon, container: HTMLLIElement) => {
    const pokemonImg = document.createElement("img");

    console.log(p);
    
    const response = await axios.get<IPokemonDetails>(p.url);

    console.log(response.data);
    
    pokemonImg.src = response.data.sprites.back_default;

    container.appendChild(pokemonImg);
   
};

pokemonButton.addEventListener("click", getPokemons);