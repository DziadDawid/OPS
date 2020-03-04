exports.app = (req, res) => {
    res.render('index', {
        formMessage: req.flash('ddupa')
    });
}