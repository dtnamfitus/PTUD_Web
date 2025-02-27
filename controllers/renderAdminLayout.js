/**
 * Renders a layout with the given template and data.
 * @param {Object} res - Express response object.
 * @param {string} template - The template to render.
 * @param {Object} data - The data to pass to the template.
 * @param {string} title - The title of the page.
 * @param {Object} admin - The user object.
 */
const renderAdminLayout = async (req, res, bodyHtml, title) => {
  const admin = req.user;
  console.log("admin: ", req.user)
  console.log("admin: ", req.session.user)


  res.render("layout/admin-layout/layout", {
    title,
    body: bodyHtml,
    admin,
  });
};

module.exports = renderAdminLayout;
