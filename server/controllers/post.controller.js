const Post = require("../models/post.model");

module.exports.get_all = (req, res) => {
    Post.find().sort({name: 1})
        .then(posts => res.json(posts))
        .catch( err =>{
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.create_post = (req, res) => {
    Post.create(req.body)
        .then(post => res.json(post))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.get_post = (req, res) => {
    Post.findOne({_id: req.params.id})
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
}

module.exports.update_post = (req, res) => {
    //new:true nos regresa el documento ya modificado
    //runValidators: true nos revisa una vez más las validaciones del modelo
    Post.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
}

module.exports.delete_post = (req, res) => {
    Post.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
}
