//elemetleri seçme
const githubForm=document.getElementById("github-form");
const nameInput=document.getElementById("githubname");
const clearLastUsers=document.getElementById("clear-last-users");
const lastUsers=document.getElementById("last-users");
const github=new Github();
const ui=new UI();
eventListener();
function eventListener(){
    githubForm.addEventListener("submit",getData);
    clearLastUsers.addEventListener("click",clearAllSearched);
    document.addEventListener("DOMContentLoaded",getAllSearched);
}
function getData(e){
    let username=nameInput.value.trim();
    if(username===""){
        alert("lütfen geçerli bir kullanıcı adı girin.");
    }
    else{
        github.getGithubData(username)
        .then(response=>{
            if(response.user.message==="Not Found"){
                ui.showError("kullanıcı bulunamadı");
            }
            else{
                ui.addSerchedUserToUI(username);
                Storage.addSerchedUserToStorage(username);
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo);
            }
        })
        .catch(err=>ui.showError(err));
    }

ui.clearInput();

    e.preventDefault();
}
function clearAllSearched(){
    //tüm arananları temzile
    if(confirm("emin misiniz?")){
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedToUI();
    }
}
function getAllSearched(){
    //arananları storagedan al ve ui ya ekle
    let result="";
    let users=Storage.getSearchedUsersFromStorage();
    users.forEach(user => {
        result += ` <li class="list-group-item">${user}</li>`
// <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
    });
    lastUsers.innerHTML=result;
}