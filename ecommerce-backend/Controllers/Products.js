
const Product = require('../Models/Product.js');
const {errorHandler} = require('../Helpers/dbErrorHandler.js');
const formidable = require('formidable');
const _ = require('lodash');  // _ is global object of this package
const fs = require('fs');


// 1. to create a product by admin
const create = (req,res)=>{  

    try {
      
      let form = new formidable.IncomingForm();
      console.log(form);
      form.keepExtensions = true;

      form.parse( req ,(err,fields,files)=>{  // parse the req coming from client and pass the files in callback function and files will also get stored  in a temporary folder in our system whose path we can get by files.filepath or type of file by files.mimetype
          
          console.log(fields)  // represent what ever data we send by from 
          console.log(files)   // represent files we send by form

          if(err){
            return res.status(400).json({
              error:"Image could not be uploaded"
            })
          }
          
          // check for all field required for product to create
          const {name,description,price,category,quantity,shipping} = fields;
          
          if(!name||!description||!price||!category||!quantity||!shipping){

            return res.status(404).json({

              error:"All fields are required"

            })

          }

          let product = new Product(fields);  // this will create products based on name-value pair in form but we need to handle file upload as well
          
          if(files.photo){ // now this .photo property depend on how u send data from client if u send using .image then write files.image
            
            // here in files.photo have property called .size which store files in bytes , which we can use to perform validation or restriction on size of file to upload
            if(files.photo.size > 1048576){         

                return res.status(404).json({   
                  error:"Image should be less than 1 mb in size"
                })

            }
            
            product.photo.data = fs.readFileSync(files.photo.filepath) // read form file where this photo is saved
            product.photo.contentType=files.photo.mimetype // get the extension of uploaded file by form 

          }   

           product.save((error,product)=>{
            
              if(error){

                return res.status(400).json({

                  error:errorHandler({err:error,errmsg:error.message})
        
                })
              }

              return res.status(201).json(product);

           });

      } )

        
    } catch (error) {
        return res.status(400).json({

          error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 2. to add product in req object 
const productById = async (req,res,next,id)=>{

    try {
        
      const product = await Product.findById(id);
      
      // if product not found 
      if(!product){
        return res.status(400).json({
          error:"Product not found"
        })
      }

      // if here means product is found so just modify req object
      req.product = product;
      next();

    } catch (error) {
      return res.status(400).json({

        error:errorHandler({err:error,errmsg:error.message})

    })
    }

}

// 3. method to return product to client 
const read = async (req,res)=>{

    try {
        
        req.product.photo = undefined // at the moment we are setting it as undefined because photo is of large size which take to much time to load but latter on we will do some optimization by making sperate request for product images to make it very fast.

        return res.status(200).json(req.product);

    } catch (error) {
      return res.status(400).json({

        error:errorHandler({err:error,errmsg:error.message})

    })
    }

}

// 4. method to delete a product by admin
const remove = async (req,res)=>{

    try {
        
       let product = req.product;
       const deletedProduct = await product.remove(); // similar to product.save() it will remove product instance from DB

       if(deletedProduct){
         return res.status(200).json({message:"Product deleted Successfully"})
       }

    } catch (error) {
        return res.status(400).json({

          error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 5. method to update the existing product in DB
const update = (req,res)=>{

    try {
      
        let form = new formidable.IncomingForm();
        form.keepExtensions = true;
  
        form.parse( req ,(err,fields,files)=>{  
            
            console.log(fields) 
            console.log(files)   
  
            if(err){
              return res.status(400).json({
                error:"Image could not be uploaded"
              })
            }
            
            // getting new or updated values to be added in existing product
            const {name,description,price,category,quantity,shipping} = fields;
            
            if(!name||!description||!price||!category||!quantity||!shipping){
  
              return res.status(404).json({
  
                error:"All fields are required"
  
              })
  
            }
  
            let product = req.product; 
            product = _.extend( product , fields )  // extend method basically return new object by combining all object passed as argument on first argument object and also override the property of first argument obj, but note changed to original object will make changes to new created object by extent but if u want to do deep copy use _.merge()
            console.log(product)
             
            
            if(files.photo){ 
              
              if(files.photo.size > 1048576){         
  
                  return res.status(404).json({   
                    error:"Image should be less than 1 mb in size"
                  })
  
              }
              
              product.photo.data = fs.readFileSync(files.photo.filepath) 
              product.photo.contentType=files.photo.mimetype 
  
            }   
  
             product.save((error,product)=>{   // .save() for the 2nd time on object will update the object 
              
                if(error){
  
                  return res.status(400).json({
  
                    error:errorHandler({err:error,errmsg:error.message})
          
                  })
                }
  
                return res.status(201).json({message:"Product has been updated"});
  
             });
  
        } )
  
          
      } catch (error) {
          return res.status(400).json({
  
            error:errorHandler({err:error,errmsg:error.message})
  
          })
      }    

}

// ################## now we will return products to front end client based on most sold and new arrival means if a particular products has been sold more than other then we want those products to be send to front end as most popular products , and same products might be newly created so we can show those products to front end as new arrival , and not only that will now fetch product based on query string parameter comes from client ################################

// 1. To return products which is most sold and limit then query is ?sortBy=sold&order=desc/asc&limit=4 
// 2. To return products by new arrival and limit then query is ?sortBy=createdAt&order=desc/asc&limit=4
// 3. If no query string parameter is present then return all products 
const list = async (req,res)=>{

   try {
    
    let query = req.query;
    console.log("QUERY IS : ", query);
    
    let order = req.query?.order ? req.query.order : "asc";
    let sortBy = req.query?.sortBy ? req.query.sortBy : "_id";
    let limit = req.query?.limit ? req.query.limit : "6";

    const products = await Product.find().select("-photo").populate("category").sort( [ [sortBy,order] ] ).limit(Number(limit));

    if(products.length===0){
      return res.status(200).json({message:"No products are found"});
    }

    return res.status(200).json(products);

   } catch (error) {
      return res.status(400).json({
  
        error:errorHandler({err:error,errmsg:error.message})
  
      })
   }

}

// To show the related products based on req.product category property and based on that all products that will have same category will be returned
const listRelated = async (req,res)=>{

   try {
     
     let limit = req.query?.limit ? req.query.limit : "6";
     let categoryId = String(req.product.category._id);
     console.log(categoryId);
     
     // here meaning of $ne is that to select all the products except the product which have _id as req.product._id
     const relatedProducts = await Product.find({_id: {$ne:req.product._id} , category:req.product.category} ).limit(Number(limit)).populate('category','_id name');   // here populate only name and _id of category

     if(!relatedProducts){
       return res.status(200).json({messgae:"No related products are found"});
     }
     
     return res.status(200).json(relatedProducts);

   } catch (error) {
     return res.status(400).json({
  
      error:errorHandler({err:error,errmsg:error.message})
  
     })
   }

}

// To return all the categories based on products available 
const listCategories = async(req,res)=>{

    try {
      
      // based on field argument passed to distinct() it will return distinct or dublicates removed values of that field in the form of array 
      const categories = await Product.distinct("category");

      if(!categories){
        return res.status(200).json({messgae:"No categories are found"});
      }

      return res.status(200).json(categories);

    } catch (error) {
      return res.status(400).json({
  
        error:errorHandler({err:error,errmsg:error.message})
    
      })
    }

}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants and all these query of user get stored in req object
 */
const listBySearch = async (req,res)=>{
   
   try {
    
      console.log(req.body);
      let order = req.body.order ? req.body.order : "desc";
      let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
      let limit = req.body.limit ? Number(req.body.limit) : 6;
      let skip = Number(req.body.skip); // here we will have load more button on page based on which when we click on it we will show user more product and send more items to front end for which we will use this skip variable

      let findArgs = {}; // it will contain categories id and the price range 
    
      for (let key in req.body.filters) {       // if key exist then this loop will execute else not
           console.log("INSIDE LOOP")
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price 
                // lte - less than price 
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key]; 
            }
        }
      }  
        console.log(findArgs)

      // at last findArgs will be converted into query object with price range and contain category objectId for items to pick

      let products = await  Product.find(findArgs).select("-photo").populate("category").sort([[sortBy, order]])
      .skip(skip).limit(limit) // here this .skip() will specify the no of document to be skipped from starting 
      
      if(!products){
        return res.status(200).json({messgae:"No categories are found"});
      }

      return res.status(200).json({products,size:products.length});

   } catch (error) {
    return res.status(400).json({
  
      error:errorHandler({err:error,errmsg:error.message})
  
    })
   }
}

// To return photo of a product present in req.product
const photo = async (req,res,next)=>{

  try {
     
     // here we can not directly send the photo to front client like res.json() because by .json() its content type will become application/json but for image the content-type is like .png,.jpeg etc.. so need to first response header by method res.set()
     if(req.product.photo.data){
      
       res.set('Content-Type',req.product.photo.contentType); // by .set() buffer in .data will also got converted into actual extension of image like .png,.jpeg etc 
       
       
       return res.status(200).send(req.product.photo.data);  // here do not use .json() because by this again content-type of header will become application/json but by .send() it will maintain the content-type 
       
     }
        next();

  } catch (error) {
    return res.status(400).json({
  
      error:errorHandler({err:error,errmsg:error.message})
  
    })
  }

}

module.exports={

    create,
    productById,
    read,
    remove,
    update,
    list,
    listRelated,
    listCategories,
    listBySearch,
    photo

}

// Creating a product is different than creating doucment of other models because we have to handle the forum data as well , we need to handle image upload as well 

// to handle image upload and form data we will install package called formidable by npm install formidable and npm install lodash which is used to work with array easily

// to understand formidable go to https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/#:~:text=As%20mentioned%20previously%2C%20formidable%20is%20a%20Node.js%20module,it%20at%20the%20top%20of%20the%20app.js%20file%3A

// // in update product function i try my own way of updating by spread operator first copy the product from req.product into new updatedProduct variable then use Product.findByIdandUpdate() method , but it show error because when copying a object of very large length as product contain buffer image data it will show error so then i use _.extent method of lodash