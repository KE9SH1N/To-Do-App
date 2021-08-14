//getting all required elements

const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    let userData = inputBox.value; // getting user enterd values
    if(userData.trim() !=0){ // if user values aren't only space
        addBtn.classList.add("active"); // active the add button status when user type anything
    }
    else{
        addBtn.classList.remove("active"); // remove active button status
    }
}


    showTask(); //calling function here

    //if user click on the add button

    addBtn.onclick = () =>{ //getting user entered value
        let userData = inputBox.value; // getting user enterd values
        let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
        if(getLocalStorage == null){ //if localStorage is null
            listArr = []; //creating a blank array
        }else{
            listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
        }

        listArr.push(userData); // pushing or adding user data
        localStorage.setItem("New Todo",JSON.stringify(listArr)); // transforming js object into json string

        showTask(); //calling function here
    }

//add task to list inside ul function

function showTask(){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage

    if(getLocalStorage == null){ //if localStorage is null
        listArr = []; //creating a blank array
    }else{
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }

    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length; //passing the todo list length value.

    if(listArr.length>0){ //if array length is greater than zero
        deleteAllBtn.classList.add("active"); // active the clear all button
    }else{
        deleteAllBtn.classList.remove("active"); // deactive the clear all button
    }

    let newLiTag = '';
    listArr.forEach((element, index) => {
        newLiTag += `<li> ${element} <span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`;
    });

    todoList.innerHTML = newLiTag; // adding new elements
    inputBox.value = ""; // once task added leave the input field blank

}

//delete task function

function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo"); //getting localStorage
    listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    listArr.splice(index, 1); //delete or remove particular list elements

    //after remove an element then update the local storage again

    localStorage.setItem("New Todo",JSON.stringify(listArr)); // transforming js object into json string
    showTask(); //calling function here
}


//delete all element 

deleteAllBtn.onclick = () =>{
    listArr = [];

    //after remove all element then update the local storage again

    localStorage.setItem("New Todo",JSON.stringify(listArr)); // transforming js object into json string
    showTask(); //calling function here


}