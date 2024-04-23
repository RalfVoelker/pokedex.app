function pokemonHtml(i, currentPokemon) {
  isRunning = true;
    return /*html*/ `
      <div class="card" onclick="openPokemonCard(${i})">
        <div class="box-inside">
          <div class="container-img d_fl_fe_c" id="pokemon-img${i}">       
          <img class="pokemon-img" src="${currentPokemon["sprites"]["other"]["home"]["front_default"]}"></div>  
          <div class="d_fl_c_c container-name"><h2>${currentPokemon["name"]}</h2></div>
          <div class="d_flexdir_r_sa container-types">
            <div id="type0${i}"></div>
            <div id="type1${i}"></div>
          </div>
          <div class="d_fl_c_c container-id"><p>Id: #${currentPokemon["id"]}</p></div> 
        </div>  
      </div>`;
  }
  

function renderContentPokemonCardHtml(activatedPokemon, pokemon, content) {
    return /*html*/ `
    <div class="view-card">
      <div class="head-pokemoncard d_flex_c" id="poke-card-img${activatedPokemon}">
        <div class="d_flexdir_c poke-card-img-center">     
          <img class="poke-card-img" src="${pokemon["sprites"]["other"]["home"]["front_default"]}">
        </div>
      </div>
      <div class="info-pokemoncard d_flexdir_c_c">
        <div class="d_flexdir_r_sb" id="bar" onclick="event.stopPropagation();">
          <div><img class="icon" onclick="lastCard(${activatedPokemon})" src="./img/icon/links.png"></div>
          <div class="d_fl_c_c info-pokemon-name"><h5>${pokemon["name"]}</h5></div>
        <div><img class="icon" onclick="nextCard(${activatedPokemon})" src="./img/icon/rechts.png"></div>
      </div>
      <div class="d_fl_c_c">
        <div class="d_flexdir_r_c poke-card-types">
          <div id="poke-card-type0${activatedPokemon}"></div>
          <div id="poke-card-type1${activatedPokemon}"></div>
        </div>
      </div>
      <div class="skillchart-poke-card">
        <canvas id="skills"></canvas>
      </div>
    </div>
    `;
  }