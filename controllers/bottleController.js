import asyncHandler from 'express-async-handler'
import BottlePost from '../models/postModel'

const getBottles = asyncHandler( async(req, res) => {
    try{
        const allPost = await BottlePost.find({name: /\w/g });
            res.json(allPost);}
            catch (err) {
                console.log({message: err})
            }
    })

const portBottles = asyncHandler ( async(req, res) => {
    
})

    export {
        getBottles
    }
