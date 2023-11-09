import { Router } from "express";
import { productsManager } from "../managers/ProductsManager.js";


const router = Router();

router.get("/login", (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.user) {
    return res.redirect("/profile");
  }
  res.render("signup");
});

router.get("/profile", async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
//obtengo listado de productos.
const products = await productsManager.findAll(req.query);
console.log('products',products)
if (!products.payload.length){
    return res.status(200).json({ message: 'No products' });
}

  console.log('user',req.session.user);
  res.render("profile", { products:products.payload,user: req.session.user });
});

export default router;