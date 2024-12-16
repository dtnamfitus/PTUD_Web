function handlePagination(query) {
  const { page, limit } = query;
  $.ajax({
    url: `/api/products?page=${page}&limit=${limit}`,
    type: "GET",
    success: function (response) {
      // Assuming 'response' is HTML that can be directly injected
      $("#products").html(response);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching products:", error);
    },
  });
}
