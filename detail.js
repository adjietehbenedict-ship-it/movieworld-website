
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const movie = movies.find(item => item.id === id);

const detail = document.getElementById("detail");
const notFound = document.getElementById("notFound");

if (!movie) {
  notFound.hidden = false;
} else {
  detail.hidden = false;
  document.title = `${movie.title} | MovieWorld`;

  document.getElementById("title").textContent = movie.title;
  document.getElementById("category").textContent = movie.category;

  document.getElementById("meta").textContent =
    `${movie.year} · ${movie.genre} · ${movie.duration} · Rating: ${movie.rating}`;

  document.getElementById("description").textContent =
    movie.description;

  const poster = document.getElementById("poster");
  poster.src = movie.poster;
  poster.alt = `Poster for ${movie.title}`;
  poster.onerror = () => {
    poster.removeAttribute("src");
    poster.alt = "Poster unavailable";
  };

  const download = document.getElementById("download");
  download.href = movie.downloadUrl || "https://t.me/kryptonmovies";

  // Only show a trailer button when an official trailer URL is supplied.
  const trailer = document.getElementById("trailer");

  if (movie.trailer) {
    trailer.href = movie.trailer;
    trailer.hidden = false;
  } else {
    trailer.hidden = true;
  }
}
