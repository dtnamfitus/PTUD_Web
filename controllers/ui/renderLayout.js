/**
 * Renders a layout with the given template and data.
 * @param {Object} res - Express response object.
 * @param {string} template - The template to render.
 * @param {Object} data - The data to pass to the template.
 * @param {string} title - The title of the page.
 * @param {Object} user - The user object.
 */
const renderLayout = async (req, res, bodyHtml, title) => {
  const user = req.user;

  res.render("layout/client-layout/layout", {
    title,
    body: bodyHtml,
    user,
  });
};

module.exports = renderLayout;
