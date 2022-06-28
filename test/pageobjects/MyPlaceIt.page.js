class MyPlaceIt{

    get title(){
        return $('//android.view.View[@content-desc = "My Placeit"]');
    }

    get settingsIcon(){
        return $('//android.view.View[1]/android.view.View[1]/android.widget.ImageView');
    }
}

module.exports = new MyPlaceIt();