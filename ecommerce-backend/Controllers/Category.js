
const Category = require('../Models/Category.js');
const {errorHandler} = require('../Helpers/dbErrorHandler.js');

// 1. method to create category but only done by authenticated admin
const create = async(req,res)=>{  

    try {
      
        const category = new Category(req.body);
        await category.save();

        if(category){
          return res.status(201).json({category})
        }
        
    } catch (error) {
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 2. method for based on categoryId we will modify the req object
const categoryById= async (req,res,next,id)=>{

    try {
        
        const category = await Category.findById(id);
        if(!category){
            return res.status(400).json({error:"Category is not found"})
        }

        req.category = category;
        next();

    } catch (error) {
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 3. method to read and return the category present in req object 
const read = async (req,res)=>{

    try {
        
        const category = req.category;
        if(!category){
            return res.status(400).json({error:"Category not found"})
        }

        return res.status(200).json(category)

    } catch (error) {
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 4. method to update category
const update = async (req,res)=>{

    try {
        
        let category = req.category
        category.name = req.body.name

        category = await category.save();   // this time update this category document
        return res.status(200).json({message:"Category has been updated" , category});

    } catch (error) {
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

// 5. method to remove category 
const remove = async (req,res)=>{

    try {

        let category = req.category
        await category.remove();    // delete this category document from DB
        return res.status(200).json({message:"Category has been deleted"});
        
    } catch (error) {
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }


}

// 6. method to return all categories to client
const list = async (req,res)=>{

    try{

       const categories = await Category.find(); // return all categories in model 
       if(categories.length===0){
          return res.status(400).json({error:"There exists no categories"})
       }
       
       return res.status(200).json(categories);

    } catch (error){
        return res.status(400).json({

            error:errorHandler({err:error,errmsg:error.message})

        })
    }

}

module.exports={

    create,
    categoryById,
    read,
    update,
    remove,
    list,

}