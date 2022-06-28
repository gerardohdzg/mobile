class Login{
    get username(){
        return $('//android.widget.EditText[1]');
    }

    get password(){
        return $('//android.widget.EditText[2]');
    }

    get button(){
        return $('//android.widget.Button[@text = "Log In"]');
    }

    async signIn(username, password){
        await this.username.setValue(username);
        await this.password.setValue(password);
        await this.button.click();
    }
}

module.exports = new Login();