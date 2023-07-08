import PostSchema from "../models/post.js";


export const create = async (req, res) => {
    try {
        const doc = new PostSchema({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(','),
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to create post',
        });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const post = await PostSchema.find().limit(5).exec();

        const tags = post.map((obj)=> obj.tags)
            .flat()
            .slice(0,5)

        res.json(tags);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Unable to get post',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const post = await PostSchema.find().populate('user').exec();
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: 'Unable to get post',
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id
        PostSchema.findOneAndUpdate(
            {_id: postId}, {$inc: {viewsCount: 1}}, {returnDocument: "After"}).populate('user')
            .then(doc => res.json(doc))
            .catch(err => res.status(500).json({message: "Post not found"}))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to get post',
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id
       await PostSchema.findOneAndDelete({
            _id: postId
        }).then((doc) => {

                if (!doc) {
                    return res.status(404).json({
                        message: 'Post not found',
                    });
                }
                res.json({
                    success: true
                })
            }
        )  .catch(err => res.status(500).json({message: "Unable to delete"}))
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to find post',
        });
    }

};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostSchema.updateOne(
            {_id: postId},
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                user: req.userId,
            }
        )
            .then(doc => res.json({success: true}))
            .catch(err => res.status(500).json({message: "Post not found"}));
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Unable to update post',
        });
    }
}