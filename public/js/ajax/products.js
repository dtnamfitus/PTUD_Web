window.addEventListener("popstate", function () {
  // Lấy lại query từ URL hiện tại
  const params = new URLSearchParams(window.location.search);

  const query = {
    page: params.get("page") || 1,
    limit: params.get("limit") || 9,
    sortBy: params.get("sortBy") || "createdAt",
    sortDirection: params.get("sortDirection") || "asc",
    priceFrom: params.get("priceFrom") || 0,
    priceTo: params.get("priceTo") || 600,
    key: params.get("key") || "",
    categories: params.get("categories") || "",
  };

  // Gọi handlePagination để cập nhật nội dung
  handlePagination(query);
});



$(document).ready(function () {
  // Lấy dữ liệu từ các bộ lọc
  function getQueryData() {
    const page = 1; // Mặc định là trang 1 khi thay đổi bộ lọc
    const limit = 9; // Số sản phẩm mỗi trang
    const sortBy = $("#sort-by").val();
    const sortDirection = $("#sortDirection").val();
    const priceRange = $("#sl2").val().split(",");
    const priceFrom = priceRange[0];
    const priceTo = priceRange[1];
    const key = $("#search-key").val() || "";
    const categories = $(".category-filter.active")
      .map(function () {
        return $(this).data("id");
      })
      .get()
      .join(",");

    return {
      page,
      limit,
      sortBy,
      sortDirection,
      priceFrom,
      priceTo,
      key,
      categories,
    };
  }

  // Xử lý khi thay đổi Sort By
  $("#sort-by, #sortDirection").on("change", function () {
    const query = getQueryData();
    handlePagination(query);
  });

  // Xử lý khi thay đổi Price Range
  $("#sl2").on("change", function () {
    const query = getQueryData();
    handlePagination(query);
  });

  // Xử lý khi click vào category
  $(".category-filter").on("click", function (e) {
    e.preventDefault();
    $(".category-filter").removeClass("active");
    $(this).addClass("active");

    const query = getQueryData();
    handlePagination(query);
  });

  // Xử lý khi click vào Pagination
  $(document).on("click", ".pagination a", function (e) {
    e.preventDefault();
    const page = $(this).data("page") || 1;
    const query = getQueryData();
    query.page = page;
    handlePagination(query);
  });
});


function handlePagination(query) {
  const {
    page,
    limit,
    sortBy = "createdAt",
    sortDirection = "asc",
    priceFrom,
    priceTo,
    key,
    categories,
  } = query;

  // Tạo query string từ các tham số
  const queryString = `?page=${page}&limit=${limit}&sortBy=${sortBy}&sortDirection=${sortDirection}&priceFrom=${priceFrom}&priceTo=${priceTo}&key=${key}&categories=${categories}`;

  // Cập nhật URL trên trình duyệt mà không tải lại trang
  window.history.pushState({}, "", queryString);

  // Gửi AJAX request để cập nhật nội dung
  $.ajax({
    url: `/client/product${queryString}`,
    type: "GET",
    success: function (data) {
      $("#products").html($(data).find("#products").html());
    },
    error: function (xhr, status, error) {
      console.error("Error fetching products:", error);
    },
  });
}

