class Settings{

    get logout(){
        return $('//android.widget.ImageView[@content-desc = "Log Out"]');
    }
}

module.exports = new Settings();