class Storage {
    static getSearchedUsersFromStorage(){
        //tüm kullanıcıları al

        let users;
        if(localStorage.getItem("searched")===null){
            users=[];
        }
        else{
            users=JSON.parse(localStorage.getItem("searched"));
        }
        return users;
    }
    static addSerchedUserToStorage(username){
        //kulanıcı ekle
        let users=this.getSearchedUsersFromStorage();
        if(users.indexOf(username) === -1){
            users.push(username);
        }
        localStorage.setItem("searched",JSON.stringify(users));
    }
    static clearAllSearchedUsersFromStorage(){
    //tüm kullanıcıalrı sil
    localStorage.removeItem("searched");
    }
}