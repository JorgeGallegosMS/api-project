const SpacePic = require('../models/spacePic')

module.exports = app => {
    app.get('/pics', (req, res) => {
        SpacePic.find()
            .then(pics => {
                res.send({pics})
            }).catch(err => {
                console.error(err)
            })
    })

    app.get('/pics/:id', (req, res) => {
        SpacePic.find({_id: req.params.id})
            .then(pic => {
                res.send(pic)
            }).catch(err => {
                console.error(err)
            })
    })

    app.post('/pics/new', (req, res) => {
        if (req.user) {
            const { name, url } = req.body
            const created_by = req.user.username
            const picture = new SpacePic({name, url, created_by})
    
            picture.save((err, pic) => {
                if (err) {
                    console.error(err)
                } else {
                    res.redirect(`/pics/${pic._id}`)
                }
            })
        } else {
            res.status(401).send({message: 'You must be logged in to do that'})
        }
    })

    app.put('/pics/:id', (req, res) => {
        if (req.user){
            SpacePic.find({_id: req.params.id})
                .then(picture => {
                    if (req.user.username == picture[0].created_by){
                        SpacePic.findOneAndUpdate({_id: req.params.id}, {name: req.body.name})
                            .then(pic => {
                                res.redirect(`/pics/${req.params.id}`)
                            }).catch(err => {
                                console.error(err)
                            })
                    } else {
                        res.status(401).send({message: 'You do not have permission to do that'})
                    }
                }).catch(err => {
                    console.error(err)
                })
        } else {
            res.status(401).send({message: 'You must be logged in to do that'})
        }
    })

    app.delete('/pics/:id', (req, res) => {
        SpacePic.deleteOne({_id: req.params.id})
            .then(() => {
                return res.send({
                    'message': 'Successfully deleted.',
                    '_id': req.params.id
                })
            })
            .catch(err => {
                console.error(err)
            })
    })
}