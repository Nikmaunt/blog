import {PostSchema} from "../models/post.js";


export const create = async (req,res) => {
    try {
        const doc = new PostSchema({
            title: req.body.title,
            text: req.body.title,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId
        })
        const post = await doc.save()
    } catch (err){}
}