import jquery from "jquery";
const BASE_URL ="http://localhost:4200/users/";
export class BackendService{

    static saveUser(user, success){
        return jquery.post(BASE_URL, user, success);
    }

    static deleteUser(id){
        return jquery.ajax(BASE_URL+id, {
            type:'delete',
        })
    }

    static getUsers(){
        return jquery.get(BASE_URL);
    }
    static getRoles(){
        return jquery.get('http://localhost:4200/roles');
    }
}