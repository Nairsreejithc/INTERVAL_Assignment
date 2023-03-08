import Article from "../schema/article.js"
const PostArticle=async(req,res)=>{
    const findevent=await Article.find({Heading:req.body.Heading})
    let data={
        Heading:req.body.Heading,
        read_time:req.body.read_time,
        categories:req.body.categories,
        description:req.body.description,
        thumbnail_image:req.body.thumbnail_image,
        featured_image:req.body.featured_image,
    }
        try{
                var insert=await Article.insertMany([data])
                res.send(insert)
            }
        catch(error){
            res.send(error.message);
        }    
      }


    //   get All Article
    const AllArticle=async(req,res)=>{
        try{
          const {match='{}'}=req.query
          const view=await Article.find(JSON.parse(match))
          res.send(view)
      
        }catch(error){
          res.status(400).send(error.message)
        }
    }
// get by article one
const GetArticle=async(req,res)=>{
    try{
      const {match='{}'}=req.query
      const view=await Article.findOne(JSON.parse(match))
      res.send(view)
  
    }catch(error){
      res.status(400).send(error.message)
    }
}

    // get categiries wise
    const viewByCategories=async(req,res)=>{
        try {
          let category=await Article.find({categories:req.body.categories})
          res.send(category)
          
        } catch (error) {
          res.status(400).send(error.message)
        }
      }
      const update=async(req,res)=>{
        const upd=await Article.findOne({$and:[{Heading:req.body.Heading}]},{})
        // console.log(upd);
        if(upd.length<=0){
            return res.send("nodata");
        }
        else{
            const updateone=await Article.findOneAndUpdate({Heading:upd.Heading},{$set:{Description:"Done"}},{new:true})
            return res.send(updateone)
        }
    }
export {PostArticle,AllArticle,viewByCategories,GetArticle,update}