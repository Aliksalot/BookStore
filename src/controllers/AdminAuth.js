
function checkIsAdmin(req, res, next){
    if(req.session.isAdmin === true){
        next()
    }else{
        res.redirect('/login')
    }
}

function changeToAdmin(req){
    req.session.isAdmin = true;
}



module.exports = {
    checkIsAdmin,
    changeToAdmin
}