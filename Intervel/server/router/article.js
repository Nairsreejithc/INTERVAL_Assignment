import express  from "express";
import { AllArticle, PostArticle ,viewByCategories ,GetArticle, update} from "../controller/article.js";


const router=express.Router()

router.post('/Article',PostArticle)

router.get('/GetAll',AllArticle)

router.get('/one',viewByCategories)

router.get('/particular',GetArticle)

router.put('/Update',update)
export default router