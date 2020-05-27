var express = require('express');
var product=require('./model')
var router = express.Router();
var sesion=require('./checkSession')

/* GET home page. */
router.get('/', async function(req, res, next) {
    //console.log(req.session.user.name)
let products=await product.find();
res.render('pro', { title: 'Products in DB',data:products });
});

/*router.get('/', async function(req, res, next) {
    let products= await new  product({
        "name":"laptop",
        "price":"1200"

    });
   products.save()
    console.log(products.name)
    res.render('pro', { title: 'Express tgo t',data:products });
    });
    */
router.get('/inputs',sesion, function(req, res, next) {
    
    res.render('inputs', { title: 'Input Form', });
    });

router.post('/inputs',async function(req, res, next) {
        
        let products=await new product(req.body);
        products.save()
    
        res.redirect('/products');
        });   
        
        
router.get('/delete/:id',async function(req, res, next) {
            let del_product=await product.findByIdAndDelete(req.params.id)
            res.redirect('/products')
            
            });       
            
 router.get('/edit/:id',async function(req, res, next) {
             let up_product=await product.findById(req.params.id)
             res.render("edit",{products:up_product})
                
                }); 
                
                
  router.post('/edit/:id',async function(req, res, next) {
                let producte=await product.findById(req.params.id)
                  producte.name=req.body.name;
                  producte.price=req.body.price;
                  producte.save()
                    res.redirect('/products')
                       
                       });                  
 
                
  router.get('/cart/:id',async function(req, res, next) {
     let up_product=await product.findById(req.params.id)
     
     let cart=[];
     if(req.cookies.cart) cart=req.cookies.cart;
     cart.push(up_product)
     res.cookie("cart",cart)
    
         res.redirect('/products')
                           
                           }); 
  router.get('/cart/remove/:id', function(req, res, next) {
                        
                            let cart=[];
                            if(req.cookies.cart) cart=req.cookies.cart;
                            cart.splice(
                            cart.findIndex((c)=>(c._id==req.params.id)),
                            1

                            )
                            res.cookie("cart",cart)
                           
                                res.redirect('/cart')
                                                  
                                                  });                            
                           


module.exports = router;
