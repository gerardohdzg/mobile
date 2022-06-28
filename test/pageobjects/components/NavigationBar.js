class NavigationBar{

    get myPlaceIt(){
        return $('//android.widget.ImageView[@content-desc = "My Placeit\nTab 2 of 2"]');
    }

}

module.exports = new NavigationBar();