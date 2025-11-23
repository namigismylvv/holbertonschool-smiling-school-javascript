document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.getElementById("carousel-inner");
  const carousel = document.getElementById("carouselExampleControls");
  const loader = document.querySelector(".loader");

  // Fetch quotes for the first carousel
  fetch("https://smileschool-api.hbtn.info/xml/quotes")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((quote, index) => {
        const activeClass = index === 0 ? "active" : "";
        const carouselItem = `
              <div class="carousel-item ${activeClass}">
                <div class="row mx-auto align-items-center">
                  <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                    <img src="${
                      quote.pic_url
                    }" class="d-block align-self-center" alt="Carousel Pic ${
          index + 1
        }" />
                  </div>
                  <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                    <div class="quote-text">
                      <p class="text-white">« ${quote.text}</p>
  <h4 class="text-white font-weight-bold">${quote.name}</h4>
  <span class="text-white">${
    quote["sub-title"]
  }</span> <!-- Change this line -->
  
                    </div>
                  </div>
                </div>
              </div>
            `;
        carouselInner.insertAdjacentHTML("beforeend", carouselItem);
      });
      loader.style.display = "none";
      carousel.style.display = "block";
    })
    .catch((error) => console.error("Error fetching quotes:", error));

  // Fetch popular tutorials for the second carousel
  const carouselInner2 = document.querySelector(
    "#carouselExampleControls2 .carousel-inner"
  );
  const carousel2 = document.getElementById("carouselExampleControls2");
  const loader2 = document.createElement("div");
  loader2.className = "loader";
  carousel2.parentNode.insertBefore(loader2, carousel2);

  fetch("https://smileschool-api.hbtn.info/xml/popular-tutorials")
    .then((response) => response.json())
    .then((data) => {
      let carouselItem = '<div class="carousel-item active"><div class="row">';
      data.forEach((tutorial, index) => {
        if (index > 0 && index % 4 === 0) {
          carouselItem +=
            '</div></div><div class="carousel-item"><div class="row">';
        }
        carouselItem += `
              <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
                <div class="card">
                  <img src="${
                    tutorial.thumb_url
                  }" class="card-img-top" alt="Video thumbnail" />
                  <div class="card-img-overlay text-center">
                    <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                  </div>
                  <div class="card-body">
                    <h5 class="card-title font-weight-bold">${
                      tutorial.title
                    }</h5>
                    <p class="card-text text-muted">${
                      tutorial["sub-title"]
                    }</p> <!-- Change this line -->
  
                    <div class="creator d-flex align-items-center">
                      <img src="${
                        tutorial.author_pic_url
                      }" alt="Creator of Video" width="30px" class="rounded-circle" />
                      <h6 class="pl-3 m-0 main-color">${tutorial.author}</h6>
                    </div>
                    <div class="info pt-3 d-flex justify-content-between">
                      <div class="rating">
                        ${[...Array(5)]
                          .map(
                            (_, i) =>
                              `<img src="images/${
                                i < tutorial.star ? "star_on" : "star_off"
                              }.png" alt="star" width="15px" />`
                          )
                          .join("")}
                      </div>
                      <span class="main-color">${tutorial.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
      });
      carouselItem += "</div></div>";
      carouselInner2.insertAdjacentHTML("beforeend", carouselItem);
      loader2.style.display = "none";
      carousel2.style.display = "block";
    })
    .catch((error) => console.error("Error fetching tutorials:", error));

  // Fetch latest videos for the third carousel
  const carouselInner3 = document.querySelector(
    "#carouselExampleControls3 .carousel-inner"
  );
  const carousel3 = document.getElementById("carouselExampleControls3");
  const loader3 = document.querySelector("#carouselExampleControls3 + .loader");

  fetch("https://smileschool-api.hbtn.info/xml/latest-videos")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let carouselItem = '<div class="carousel-item active"><div class="row">';
      data.forEach((video, index) => {
        if (index > 0 && index % 4 === 0) {
          carouselItem +=
            '</div></div><div class="carousel-item"><div class="row">';
        }
        carouselItem += `
            <div class="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img src="${
                  video.thumb_url
                }" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${video.title}</h5>
                  <p class="card-text text-muted">${
                    video["sub-title"]
                  }</p> <!-- Change this line -->
  
                  <div class="creator d-flex align-items-center">
                    <img src="${
                      video.author_pic_url
                    }" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${video.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      ${[...Array(5)]
                        .map(
                          (_, i) =>
                            `<img src="images/${
                              i < video.star ? "star_on" : "star_off"
                            }.png" alt="star" width="15px" />`
                        )
                        .join("")}
                    </div>
                    <span class="main-color">${video.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
      });
      carouselItem += "</div></div>";
      carouselInner3.insertAdjacentHTML("beforeend", carouselItem);
      loader3.style.display = "none";
      carousel3.style.display = "block";
    })
    .catch((error) => console.error("Error fetching latest videos:", error));

  // Fetch quotes for the first carousel
  fetch("https://smileschool-api.hbtn.info/xml/quotes")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((quote, index) => {
        const activeClass = index === 0 ? "active" : "";
        const carouselItem = `
            <div class="carousel-item ${activeClass}">
              <div class="row mx-auto align-items-center">
                <div class="col-12 col-sm-2 col-lg-2 offset-lg-1 text-center">
                  <img src="${
                    quote.pic_url
                  }" class="d-block align-self-center" alt="Carousel Pic ${
          index + 1
        }" />
                </div>
                <div class="col-12 col-sm-7 offset-sm-2 col-lg-9 offset-lg-0">
                  <div class="quote-text">
                    <p class="text-white">« ${quote.text}</p>
                    <h4 class="text-white font-weight-bold">${quote.name}</h4>
                    <span class="text-white">${quote["sub-title"]}</span>
                  </div>
                </div>
              </div>
            </div>
          `;
        carouselInner.insertAdjacentHTML("beforeend", carouselItem);
      });
      loader.style.display = "none";
      carousel.style.display = "block";
    })
    .catch((error) => console.error("Error fetching quotes:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-text-area");
  const topicDropdown = document.querySelector(".box2 .dropdown-menu");
  const sortDropdown = document.querySelector(".box3 .dropdown-menu");
  const resultsSection = document.querySelector(".results .row");
  const loader = document.createElement("div");
  loader.className = "loader";

  // Initial state
  let currentSearch = "";
  let currentTopic = "all";
  let currentSort = "most_popular";

  // Add loader before results section
  resultsSection.parentNode.insertBefore(loader, resultsSection);

  function loadCourses() {
    resultsSection.style.display = "none";
    loader.style.display = "block";

    const url = `https://smileschool-api.hbtn.info/xml/courses?q=${currentSearch}&topic=${currentTopic}&sort=${currentSort}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Update topics dropdown
        topicDropdown.innerHTML = data.topics
          .map(
            (topic) =>
              `<a class="dropdown-item" href="#" data-value="${topic}">${topic}</a>`
          )
          .join("");

        // Update sort dropdown
        sortDropdown.innerHTML = data.sorts
          .map(
            (sort) =>
              `<a class="dropdown-item" href="#" data-value="${sort}">${sort.replace(
                "_",
                " "
              )}</a>`
          )
          .join("");

        // Update search if API returns a query
        if (data.q) {
          searchInput.value = data.q;
          currentSearch = data.q;
        }

        // Update video cards
        resultsSection.innerHTML = data.courses
          .map(
            (course) => `
            <div class="col-12 col-sm-4 col-lg-3 d-flex justify-content-center">
              <div class="card">
                <img src="${
                  course.thumb_url
                }" class="card-img-top" alt="Video thumbnail" />
                <div class="card-img-overlay text-center">
                  <img src="images/play.png" alt="Play" width="64px" class="align-self-center play-overlay" />
                </div>
                <div class="card-body">
                  <h5 class="card-title font-weight-bold">${course.title}</h5>
                  <p class="card-text text-muted">${course["sub-title"]}</p>
                  <div class="creator d-flex align-items-center">
                    <img src="${
                      course.author_pic_url
                    }" alt="Creator of Video" width="30px" class="rounded-circle" />
                    <h6 class="pl-3 m-0 main-color">${course.author}</h6>
                  </div>
                  <div class="info pt-3 d-flex justify-content-between">
                    <div class="rating">
                      ${[...Array(5)]
                        .map(
                          (_, i) =>
                            `<img src="images/${
                              i < course.star ? "star_on" : "star_off"
                            }.png" alt="star" width="15px" />`
                        )
                        .join("")}
                    </div>
                    <span class="main-color">${course.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          `
          )
          .join("");

        loader.style.display = "none";
        resultsSection.style.display = "flex";
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }

  // Event Listeners
  searchInput.addEventListener("keyup", (e) => {
    currentSearch = e.target.value;
    loadCourses();
  });

  topicDropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      currentTopic = e.target.dataset.value;
      e.target.closest(".dropdown").querySelector("span").textContent =
        e.target.textContent;
      loadCourses();
    }
  });

  sortDropdown.addEventListener("click", (e) => {
    if (e.target.classList.contains("dropdown-item")) {
      currentSort = e.target.dataset.value;
      e.target.closest(".dropdown").querySelector("span").textContent =
        e.target.textContent;
      loadCourses();
    }
  });

  // Initial load
  loadCourses();
});
