class LoginModel {
    username!:string;
    password!:string;

    constructor(props?: Partial<LoginModel>) {
        Object.assign(this, props);
    }
    
    isValid(){
        return this.username && this.password;
    }
    
}

export {LoginModel};