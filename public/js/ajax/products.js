$(document).ready(function () {
  // Initialize price range slider
  $("#price-range-slider").slider({
    range: true,
    min: 0,
    max: 600,
    step: 5,
    values: [250, 450],
    slide: function (event, ui) {
      $("#price-min").text(ui.values[0]);
      $("#price-max").text(ui.values[1]);
    },
  });

  // Set initial price labels
  $("#price-min").text($("#price-range-slider").slider("values", 0));
  $("#price-max").text($("#price-range-slider").slider("values", 1));

  // Function to get query parameters from URL
  function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");
    for (let pair of pairs) {
      if (pair) {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
      }
    }
    return params;
  }

  // Function to update URL without reloading the page
  function updateURL(params) {
    const query = $.param(params);
    const newUrl = window.location.pathname + "?" + query;
    window.history.pushState(params, "", newUrl);
  }

  // Function to fetch and display products
  function fetchProducts(params = {}) {
    $.ajax({
      url: "/api/product",
      method: "GET",
      data: params,
      success: function (response) {
        // Assuming the API returns data in the following structure:
        // {
        //   docs: [array of products],
        //   page: currentPage,
        //   totalPages: totalPages,
        //   hasPrevPage: boolean,
        //   hasNextPage: boolean,
        //   prevPage: number,
        //   nextPage: number
        // }
        renderProducts(response.docs);
        renderPagination(response);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching products:", error);
      },
    });
  }

  // Function to render products
  function renderProducts(products) {
    const productList = $("#product-list");
    productList.empty();

    if (products.length === 0) {
      productList.append('<p class="text-center">No products found.</p>');
      return;
    }

    products.forEach((product) => {
      const productHTML = `
        <div class="col-sm-4">
          <div class="product-image-wrapper">
            <div class="single-products">
              <div class="productinfo text-center">
                <img src="${product.mainImage}" alt="${product.name}" />
                <h2>$ ${product.price.toFixed(2)}</h2>
                <p>${product.name}</p>
                <a href="#" class="btn btn-default add-to-cart" data-id="${
                  product._id
                }"><i class="fa fa-shopping-cart"></i>Add to cart</a>
              </div>
              <div class="product-overlay">
                <div class="overlay-content">
                  <h2>$ ${product.price.toFixed(2)}</h2>
                  <p>${product.name}</p>
                  <a href="/product-details.html?id=${
                    product._id
                  }" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Details</a>
                </div>
              </div>
            </div>
            <div class="choose">
              <ul class="nav nav-pills nav-justified">
                <li><a href="#" class="add-to-wishlist" data-id="${
                  product._id
                }"><i class="fa fa-plus-square"></i>Add to wishlist</a></li>
                <li><a href="#" class="add-to-compare" data-id="${
                  product._id
                }"><i class="fa fa-plus-square"></i>Add to compare</a></li>
              </ul>
            </div>
          </div>
        </div>
      `;
      productList.append(productHTML);
    });
  }

  // Function to render pagination
  function renderPagination(data) {
    const pagination = $("#pagination");
    pagination.empty();

    if (data.totalPages <= 1) return;

    // Previous Page
    if (data.hasPrevPage) {
      pagination.append(
        `<li><a href="#" class="pagination-link" data-page="${data.prevPage}">&laquo;</a></li>`
      );
    } else {
      pagination.append(`<li class="disabled"><a href="#">&laquo;</a></li>`);
    }

    // Page Numbers
    for (let p = 1; p <= data.totalPages; p++) {
      const activeClass = p === data.page ? "active" : "";
      pagination.append(
        `<li class="${activeClass}"><a href="#" class="pagination-link" data-page="${p}">${p}</a></li>`
      );
    }

    // Next Page
    if (data.hasNextPage) {
      pagination.append(
        `<li><a href="#" class="pagination-link" data-page="${data.nextPage}">&raquo;</a></li>`
      );
    } else {
      pagination.append(`<li class="disabled"><a href="#">&raquo;</a></li>`);
    }
  }

  // Function to gather current filter parameters
  function getCurrentFilters() {
    const params = {};
    const queryParams = getQueryParams();

    // Pagination
    params.page = queryParams.page || 1;

    // Sorting
    params.sortBy = $("#sort-by").val();
    params.sortDirection = $("#sortDirection").val();

    // Price Range
    params.priceFrom = $("#price-range-slider").slider("values", 0);
    params.priceTo = $("#price-range-slider").slider("values", 1);

    // Search Key
    params.key = $("#search-key-product").val();

    // Categories
    const selectedCategories = [];
    $(".category-filter.active, .subcategory-filter.active").each(function () {
      selectedCategories.push($(this).data("category"));
    });
    if (selectedCategories.length > 0) {
      params.categories = selectedCategories.join(",");
    }

    return params;
  }

  // Function to apply filters and fetch products
  function applyFilters() {
    const params = getCurrentFilters();
    updateURL(params);
    fetchProducts(params);
  }

  // Event Listeners

  // Sort By and Sort Direction
  $("#sort-by, #sortDirection").on("change", function () {
    applyFilters();
  });

  // Search
  $("#search-button").on("click", function () {
    applyFilters();
  });

  $("#search-key-product").on("keypress", function (e) {
    if (e.which === 13) {
      // Enter key pressed
      applyFilters();
    }
  });

  // Category Filter Click
  $(".category-filter, .subcategory-filter").on("click", function (e) {
    e.preventDefault();
    const $this = $(this);
    $this.toggleClass("active");

    // Highlight active categories
    if ($this.hasClass("active")) {
      $this.css({
        "font-weight": "bold",
        "background-color": "#f0f0f0",
      });
    } else {
      $this.css({
        "font-weight": "normal",
        "background-color": "transparent",
      });
    }

    applyFilters();
  });

  // Price Filter Button
  $("#price-filter").on("click", function () {
    applyFilters();
  });

  // Pagination
  $(document).on("click", ".pagination-link", function (e) {
    e.preventDefault();
    const page = $(this).data("page");
    if (page) {
      const params = getCurrentFilters();
      params.page = page;
      updateURL(params);
      fetchProducts(params);
    }
  });

  // Initial Fetch
  applyFilters();

  // Handle browser navigation (back/forward)
  window.onpopstate = function (event) {
    if (event.state) {
      fetchProducts(event.state);
      // Update filter inputs based on state
      $("#sort-by").val(event.state.sortBy);
      $("#sortDirection").val(event.state.sortDirection);
      $("#price-range-slider").slider("values", 0, event.state.priceFrom);
      $("#price-range-slider").slider("values", 1, event.state.priceTo);
      $("#price-min").text(event.state.priceFrom);
      $("#price-max").text(event.state.priceTo);
      $("#search-key-product").val(event.state.key);

      // Update category filters
      $(".category-filter, .subcategory-filter").each(function () {
        const category = $(this).data("category");
        if (
          event.state.categories &&
          event.state.categories.split(",").includes(category)
        ) {
          $(this).addClass("active").css({
            "font-weight": "bold",
            "background-color": "#f0f0f0",
          });
        } else {
          $(this).removeClass("active").css({
            "font-weight": "normal",
            "background-color": "transparent",
          });
        }
      });
    }
  };
});
