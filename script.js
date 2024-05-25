const getGenreLists = async () => {
    try {
      const url =
        "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres";
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data.data);
      return data.data;
    } catch (error) {
      console.log("error", err);
    }
  };

  const renderGenreLists = async () => {
    try {
      const data = await getGenreLists();
      const genresList = document.querySelector(".genres-group");
      genresList.innerHTML = "";
      data.forEach((genre, index) => {
        console.log(genre);
        const x = document.createElement("li");
        x.className = "genre";
        x.innerHTML = genre.name;
        genresList.appendChild(x);
      });
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const getGameLists = async () => {
    try {
      const url =
        "https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games";
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data.data);
      return data.data;
    } catch (error) {
      console.log("error", err);
    }
  };
  const renderGameLists = async () => {
      const data = await getGameLists();
      const gamesList = document.querySelectorAll(".genre-li");
      
      console.log("error", error.message);
    }
  
