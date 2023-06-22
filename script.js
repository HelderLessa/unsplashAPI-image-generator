const input = document.getElementById("user-input");
const grid = document.getElementById("grid");

window.addEventListener("load", dayNightMode);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    loadImg();
  }
});

async function loadImg() {
  grid.innerHTML = "";
  try {
    const response = await fetch(
      "https://api.unsplash.com/search/photos/?query=" +
        input.value +
        "&per_page=9&client_id=YOUR_UNSPLASH_ACCESS_KEY"
    );
    if (!response.ok) {
      throw new Error(`Something went wrong! Status: ${response.status}`);
    }
    const data = await response.json();
    const imageNodes = [];
    for (let i = 0; i < data.results.length; i++) {
      imageNodes[i] = document.createElement("div");
      imageNodes[i].className = "img";
      imageNodes[i].style.backgroundImage =
        "url(" + data.results[i].urls.raw + ")";
      imageNodes[i].addEventListener("click", () => {
        window.open(data.results[i].links.download, "_blank");
      });
      grid.appendChild(imageNodes[i]);
    }
  } catch (err) {
    alert(err.message);
  }
}

function dayNightMode() {
  const date = new Date();
  const hour = date.getHours();

  if (hour >= 7 && hour <= 19) {
    document.body.style.backgroundColor = "whitesmoke";
    document.body.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }
}
