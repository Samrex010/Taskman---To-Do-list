try{
    const taskss = document.querySelector('.tasks');
    const inputTxt = document.getElementById("new_task");
    const addBtn = document.getElementById('submit_btn');
    const emptyText = document.querySelector(".empty");

    //Displaying all Tasks
    function loadTasks(){
        for (let i = 0; i < localStorage.length; i++){
            let idtask = document.createElement("div");
             //Adding task
                idtask.innerHTML = `<div class="task">
                <div class="text">${localStorage.getItem(localStorage.key(i))}</div>

                <div class="delete_container">
                <input type="checkbox" class="complete">
                <span class="delete"><i class="fa-solid fa-circle-minus"></i></span>
                </div>
            </div>`;
                taskss.appendChild(idtask);
        
        }
    }
    loadTasks();

    //Adding new Task
    addBtn.addEventListener("click", addTask);
    function addTask(){
        let id = Math.random()*10+Math.random();
        if(inputTxt.value.length > 0){
            //Creating Div
            const idtask = document.createElement("div");

            //Adding task
            idtask.innerHTML = `<div class="task">
            <div class="text">${inputTxt.value}</div>

            <div class="delete_container">
            <input type="checkbox" class="complete">
            <span class="delete"><i class="fa-solid fa-circle-minus"></i></span>
            </div>
            </div>`;
            taskss.appendChild(idtask);
            localStorage.setItem(`task${id}`,`${inputTxt.value}`);
            //Added
            inputTxt.value = ""
            edit();
            deleteTask();
            warning();
        }
    }

    //Add task with Enter key
    function enterKeyAction(){
        inputTxt.addEventListener("keypress", function(event) {

          // If the user presses the "Enter" key on the keyboard
          if (event.key === "Enter") {
            // Trigger the button element with a click
            addBtn.click();
          }
        });
    }
    enterKeyAction();
    
    function edit(){
        const checkbox = document.querySelectorAll(".complete");

        checkbox.forEach((check)=>{

            check.addEventListener("click", ()=>{

                if(check.checked){
                    check.parentElement.parentElement.style.textDecoration = "line-through";
                    check.nextElementSibling.style.fontSize = "1.3em";

                    check.parentElement.parentElement.parentElement.style.opacity = "0.5"; //Opacity reduced after task completed
                }
                else{
                    check.parentElement.parentElement.style.textDecoration = "none";
                    check.parentElement.parentElement.parentElement.style.opacity = "1"; //Opacity Back to Normal
                }
            })
        })
    }

    function deleteTask(){
        const deleteBtn = document.querySelectorAll(".delete");

        deleteBtn.forEach((item)=>{
            item.addEventListener("click",()=>{
                for(let i=0; i<localStorage.length; i++){
                    let key = localStorage.key(i);
                    let value = localStorage.getItem(key);
                    console.log(item.parentElement.parentElement.innerText)
                    if(item.parentElement.parentElement.querySelector(".text").innerText == value){
                        localStorage.removeItem(key);
                        item.parentElement.parentElement.remove();
                    }
                }
            })
        })
    }
    function warning(){
        if(taskss.children.length<=2){
            emptyText.style.display = "block";
            }
        if(taskss.children.length>2){
            emptyText.style.display = "none";  
        }
    }
    warning();
    edit();
    deleteTask();
}catch(err){
    console.error(err);
}