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
        renderSingleGame(game.appid)
      }
      div.innerHTML = `
       <div class="pictures">
       <img
        src="${game.header_image}"
       />
     </div>
    <div class="info">
      <div class="game-name">${game.name}</div>
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
renderGameLists();


let searchIcon = document.getElementById("search-icon");
searchIcon.onclick = () => {
  search = document.getElementById("search-form").value;
  renderGameLists()    
}
const renderSingleGame = async (appid) => {
  console.log(appid)
  let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/single-game/${appid}`
  const response = await fetch(url) 
  const data = await response.json();
  console.log(data.data)
  let game = data.data;
  let gameBackground = document.getElementById("page-background")
  gameBackground.style.background = `url('${game.background}')`;
  let headerNew = document.querySelector(".header-flex");
  headerNew.classList.remove("header-flex");
  headerNew.classList.add("header-flex-new");
  let gameDetails = document.getElementById("main-area");
  gameDetails.classList.add("flex-column");
  gameDetails.innerHTML = `<div class="name-and-communityhub center">
          <div class="single-game-name">${game.name}</div>
          <button class="community-hub">Community Hub</button>
        </div>
        <div class="page-background-shade">
          <div class="single-game-info center">
            <div class="single-game-details">
              <img class="single-game-picture" src="${game.header_image}">
              <div class="language-and-platform">
                <div class="second-header-section-styles">
                  <div>Include total ${game.achievements} achievements</div>
                  <div>Supported Platforms</div>
                  <div>Supported Language</div>
                </div>
                <div class="second-details-section-styles">
                  <div>sss</div>
                  <div class="platforms">
                    <ul class="ul-platforms">
                      <li>Windows</li>
                      <li>Mac</li>
                      <li>Linux</li>
                    </ul>
                  </div>
                  <div>English</div>
                </div>
              </div>
            </div>
            <div class="description-area">
              <img class="game-header-img" src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/03/steam-logo-1.jpg">
              <div class="description-texts">
                ${game.description}
              </div>
              <div class="overall-details">
                <div class="details-wrap">
                  <div class="header-section-styles">
                    <div>Overall Reviews</div>
                    <div>Total Reviews</div>
                  </div>
                  <div class="details-section-styles">
                    <div>Mostly Positive (${Math.round(100 - (game.negative_ratings / game.positive_ratings * 100))}%)</div>
                    <div>${game.positive_ratings + game.negative_ratings} Users</div>
                  </div>
                </div>
              </div>
              <div class="overall-details">
                <div class="details-wrap">
                  <div class="header-section-styles">
                    <div>Release Date</div>
                  </div>
                  <div class="details-section-styles">
                    <div>${game.release_date}</div>
                  </div>
                </div>
              </div>
              <div class="overall-details">
                <div class="details-wrap">
                  <div class="header-section-styles">
                    <div>Developer</div>
                    <div>Publisher</div>
                  </div>
                  <div class="details-section-styles">
                    <div>${game.developer}</div>
                    <div>Valve</div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="popular-tags-style">Popular user-defined tags for this product</div>
                <ul class="popular-tags">
                  <li>Free to Play</li>
                  <li>MOBA</li>
                  <li>Multiplayer</li>
                  <li>Strategy</li>
                  <li>PvP</li>
                  <li>+</li>
                </ul>
              </div>
            </div>
          </div>
        </div>";`
        const ul = gameDetails.querySelector(".ul-platforms");
      ul.innerHTML = "";
      game.platforms.forEach((tag) => {
        const li = document.createElement("li");
        li.innerHTML = tag;
        ul.appendChild(li);
      });
        const ulTagsProduct = gameDetails.querySelector(".popular-tags");
      ulTagsProduct.innerHTML = "";
      game.steamspy_tags.forEach((tagsProduct) => {
        const liTagsProduct = document.createElement("li");
        liTagsProduct.innerHTML = tagsProduct;
        ulTagsProduct.appendChild(liTagsProduct);
      });
}


