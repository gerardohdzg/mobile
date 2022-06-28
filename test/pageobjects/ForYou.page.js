class ForYou{
    get title(){
        return $('//android.view.View[@content-desc = "For You"]');
    }
}

module.exports = new ForYou();