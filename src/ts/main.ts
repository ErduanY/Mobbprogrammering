import axios from 'axios'
import './../scss/style.scss'
//import { IPokemons } from './models/IPokemons'
import { IResponse } from './models/IResponse';
import { IPokemon } from './models/IPokemon';
import { IPokemonDetails } from './models/IPokemonDetails';

const mainDiv = document.getElementById("app") as HTMLDivElement;
const pokemonButton = document.createElement("button");
pokemonButton.innerHTML = "Get Pokemons";
mainDiv.appendChild (pokemonButton);




const getPokemons = async () => {
    const pokemonsContainer = document.createElement("ul");
    pokemonsContainer.className = "pokemonsContainer";
    mainDiv.appendChild(pokemonsContainer);

    pokemonsContainer.innerHTML = "";
    
const response = await axios.get<IResponse>("https://pokeapi.co/api/v2/pokemon/");

pokemonButton.remove();

response.data.results.forEach((pokemon) => {
  console.log(pokemon.name);
  

  const pokemonContainer = document.createElement("li");
  const pokemonName = document.createElement("p");
  pokemonName.innerHTML = pokemon.name;
  pokemonContainer.className = "pokemonContainer"
  pokemonName.className = "pokemonContainer--name"

  
  /*pokemonName.addEventListener("click", () => {
    showDetails(pokemon, pokemonContainer)
  });*/

  showDetails(pokemon,pokemonContainer);
  
  pokemonsContainer.appendChild(pokemonContainer);
  pokemonContainer.appendChild(pokemonName);
  
});
};

const showDetails = async (p: IPokemon, container: HTMLLIElement) => {
    
    const pokemonImgFront = document.createElement("img");
    const pokemonImgBack = document.createElement("img");
    
    const response = await axios.get<IPokemonDetails>(p.url);
    
    pokemonImgFront.src = response.data.sprites.front_default;
    pokemonImgBack.src = response.data.sprites.back_default;

    container.appendChild(pokemonImgFront);
    container.appendChild(pokemonImgBack);
};

pokemonButton.addEventListener("click", getPokemons);