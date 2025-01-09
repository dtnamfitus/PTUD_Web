const accountService = require("../../services/user.service");

const renderLayout = require("../renderAdminLayout");

const getAccounts = async (req, res) => {
  try {
    const keyword = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder || "desc";
    // check nan
    if (isNaN(page)) {
      res.status(400).send("Invalid page number");
    }
    if (page < 1) {
      page = 1;
    }
    const filter = {
      keyword,
      page,
      limit,
      sortBy,
      sortOrder,
    }
    const accounts = await accountService.getAllUsers(filter);
    // const formattedCart = cart.map((item) => {
    //   const mainImage = item._product.colors.find(
    //     (color) => color.color_name === item.color_name
    //   ).images[0];
    //   return {
    //     ...item,
    //     _product: {
    //       ...item._product,
    //       mainImage,
    //     },
    //   };
    // });
    // const subtotal = formattedCart.reduce(
    //   (acc, item) => acc + item._product.price * item.quantity,
    //   0
    // );
    
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/accountList",
        { accounts: accounts },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Accounts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching account");
  }
};

// get account detail by id
const getAccountDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getUserById(id);
    const bodyHtml = await new Promise((resolve, reject) => {
      res.render(
        "admin/accountDetail",
        { account: account },
        (err, html) => {
          if (err) return reject(err);
          resolve(html);
        }
      );
    });
    await renderLayout(req, res, bodyHtml, "Account Detail");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching account");
  }
}

//ban/unban account
const banAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await accountService.getUserById(id);
    if (account.status === "active") {
      account.status = "banned";
    } else {
      account.status = "active";
    }
    await account.save();
    res.redirect("/admin/accounts");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error banning account");
  }
}


module.exports = {
  getAccounts,
  getAccountDetail,
  banAccount
};
