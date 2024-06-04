let genre = "";
let search = "";

const getGenreLists = async () => {
  try {
    const url =
      "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres";
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("error", error);
  }
};

const renderGenreLists = async () => {
  try {
    const data = await getGenreLists();
    const genresList = document.querySelector(".genres-group");
    genresList.innerHTML = "";
    data.forEach((displayGenre, index) => {
      const x = document.createElement("li");
      x.className = "genre";
      x.onclick = () => {
        genre = displayGenre.name;
        renderGameLists()
      };
      x.innerHTML = displayGenre.name;
      genresList.appendChild(x);
    });
  } catch (error) {
    console.log("error", error);
  }
};
renderGenreLists()

const getGameLists = async () => {
  try {
    let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?`;
    if (genre) {
      url += `genres=${encodeURIComponent(genre)}`;
    } if (search) {
      url += `q=${search}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log("error", error);
  }
};

const renderGameLists = async () => {
  try {
    const data = await getGameLists();
    const display = document.querySelector(".info-games");
    display.innerHTML = "";
    data.forEach((game) => {
      console.log(game);
      const div = document.createElement("div");
      div.className = "games";
      div.onclick = () => {
        renderSingleGame()
      }
      div.innerHTML = `
       <div class="pictures">
       <img
        src="${game.header_image}"
       />
     </div>
    <div class="info">
      <div>${game.name}</div>
      <ul class="game-tags">
        <li>Action</li>
        <li>FPS</li>
        <li>Free-to-play</li>
        <li>Funny</li>
      </ul>
    </div>
    <div class="game-cta">
      <div class="game-price">
        <div id="CS2-price" class="price">${
          game.price === 0 ? "Free" : game.price
        }</div>
      </div>
      <button class="buttons">${
        game.price > 0 ? "Add to cart" : "Play for Free!"
      }</button>
    </div>`;
      const ul = div.querySelector(".game-tags");
      ul.innerHTML = "";
      game.steamspy_tags.forEach((tag) => {
        const li = document.createElement("li");
        li.innerHTML = tag;
        ul.appendChild(li);
      });
      display.appendChild(div);
    });
  } catch (error) {
    console.log("error", error);
  }
};


let searchIcon = document.getElementById("search-icon");
searchIcon.onclick = () => {
  search = document.getElementById("search-form").value;
  renderGameLists()    
}

const renderSingleGame = async () => {
  let gameDetails = document.getElementById("main-area");
  gameDetails.innerHTML = "";
}



