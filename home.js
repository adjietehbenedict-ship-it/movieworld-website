
const grid = document.getElementById("movieGrid");
const search = document.getElementById("search");
const category = document.getElementById("category");
const empty = document.getElementById("empty");
const resultCount = document.getElementById("resultCount");

function renderHome() {
  const query = search.value.trim().toLowerCase();
  const selected = category.value;

  const filtered = movies.filter(movie => {
    const text = [
      movie.title,
      movie.genre,
      movie.category,
      movie.description
    ].join(" ").toLowerCase();

    return text.includes(query) &&
      (selected === "All" || movie.category === selected);
  });

  grid.replaceChildren();
  resultCount.textContent = `${filtered.length} title(s) found`;
  empty.hidden = filtered.length > 0;

  filtered.forEach(movie => {
    const card = document.createElement("article");
    card.className = "card";

    const img = document.createElement("img");
    img.src = movie.poster;
    img.alt = `Poster for ${movie.title}`;
    img.loading = "lazy";

    // Show a fallback if an image URL fails.
    img.onerror = () => {
      img.removeAttribute("src");
      img.alt = "Poster unavailable";
      img.style.aspectRatio = "2 / 3";
    };

    const content = document.createElement("div");
    content.className = "card-content";

    const title = document.createElement("h3");
    title.textContent = movie.title;

    const meta = document.createElement("p");
    meta.textContent =
      `${movie.category} · ${movie.year} · ${movie.genre}`;

    const description = document.createElement("p");
    description.textContent = movie.description;

    const link = document.createElement("a");
    link.className = "button";
    link.href = `movie.html?id=${encodeURIComponent(movie.id)}`;
    link.textContent = "View Details";

    content.append(title, meta, description, link);
    card.append(img, content);
    grid.append(card);
  });
}

search.addEventListener("input", renderHome);
category.addEventListener("change", renderHome);

renderHome();
