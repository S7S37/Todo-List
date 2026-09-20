import { add } from "date-fns"
import {Project,todoListMaker,Todo,SubTask} from "./todo-list.js"
import { ja } from "date-fns/locale"
let currentProject = "all"


function projectDom(){
const projectsContainer = document.querySelector(".sidebar .projects")
const addButton = document.querySelector(".Add-project")
const addProjectForm = document.querySelector(".add-project-form")
addButton.addEventListener("click", () => {
    addProjectForm.classList.remove("closed")
    addButton.classList.add("closed")
})
document.querySelector("button.all").addEventListener("click", (e) => {
    e.preventDefault()
    currentProject = "all"
    const allProjects = document.querySelectorAll(".project-button")
    for (const project of allProjects){
        project.classList.remove("active")
    }
    e.target.classList.add("active")
    externalTodoDom.displayTodos()
})
function displayProjects(){
    projectsContainer.textContent = ""
    for(const item of todoListMaker.todoList){
        
        const projectContainer = document.createElement("div")
        const projectName = document.createElement("button")
        const projectDeleteButton = document.createElement("button")
        projectName.classList.add("project-button")
        projectContainer.classList.add("project")
        projectDeleteButton.classList.add("delete-project")
        projectName.textContent = item.name
        projectDeleteButton.textContent = "Delete"
        projectContainer.append(projectName,projectDeleteButton)
        projectsContainer.appendChild(projectContainer)
        projectDeleteButton.addEventListener("click", () => {
            todoListMaker.removeProject(item.name)
            projectsContainer.removeChild(projectContainer)
            displayProjects()
            externalTodoDom.displayTodos()
            todoListMaker.updateStorage()

        })
        projectName.addEventListener("click", (e) => {
            e.preventDefault()
            currentProject = item.name
            const allProjects = document.querySelectorAll(".project-button , .all")
            for (const project of allProjects){
                project.classList.remove("active")
            }
            document.querySelector("button.all")
            projectName.classList.add("active")
            externalTodoDom.displayTodos()
        })
    }
}

function addProject() {
    const addButton = document.querySelector(".Add-project")
    const addProjectForm = document.querySelector(".add-project-form")
    const cancelButton = document.querySelector(".cancel-project")
    const confirmAdd = document.querySelector(".confirm-add")
    const form = document.querySelector(".add-project-form")
    addButton.addEventListener("click", () => {
        addProjectForm.classList.remove("closed")
        addButton.classList.add("closed")
    })

    cancelButton.addEventListener("click" , (e) => {
        e.preventDefault()
        addProjectForm.classList.add("closed")
        addButton.classList.remove("closed")        
    })
    function confirmProjectAdd(e) {
        e.preventDefault()

        const projectName = document.querySelector("#project-name")
        if (projectName.value === ""){
            alert("name cannot be empty")
            return
        } 
        let checker = todoListMaker.addProject(new Project(projectName.value))
        if(checker === "made"){
            alert("project already made")
            return
        }
        addProjectForm.classList.add("closed")
        addButton.classList.remove("closed")
        projectName.value = ""
        displayProjects()
        todoListMaker.updateStorage()
    }
    
    form.addEventListener("submit",(e) => confirmProjectAdd(e))
}
displayProjects()
addProject()
}
function todoDom(){
const todoMainContainer = document.querySelector(".todos")
    function displayTodos(){
        todoMainContainer.innerHTML = ""


        function displayTodo(todo,project){
            const todoContainer = document.createElement("div")
            const todoName = document.createElement("h4")
            const dueDate = document.createElement("p")
            const todoDisplayDetails = document.querySelector(".todo-details-display")
            todoContainer.addEventListener("click", (e) => {
                e.preventDefault()
                todoDisplayDetails.classList.remove("closed")
                displayTodoDescription(todo, project)

            })
            todoContainer.classList.add("todo")
            todoContainer.classList.add(todo.priority)
            todoName.textContent = todo.title
            dueDate.textContent = todo.dueDate
            todoContainer.append(todoName,dueDate)
            todoMainContainer.appendChild(todoContainer)
        }

        if(currentProject === "all"){
            for (const project of todoListMaker.todoList){
                for(let todo of project.list){
                    displayTodo(todo,project)
                }
            }
        }
        else {
            for (const project of todoListMaker.todoList){
                if(!(project.name ===currentProject)){
                    continue;
                }
                for(const todo of project.list){
                    displayTodo(todo,project)
                    
                }
            }
        }
    }

    

    function addTodo(){
        const addTodoButton = document.querySelector(".add-todo")
        const addTodoForm  = document.querySelector(".new-todo")
        const projectSelector = document.querySelector("#select-project")
        const addTodoConfirmButton = document.querySelector(".push-todo")
        addTodoButton.addEventListener("click" , (e) => {
            e.preventDefault()
            addTodoForm.classList.remove("closed")
            projectSelector.textContent = ""
            for (const item of todoListMaker.todoList){
                
                const option = document.createElement("option")
                option.textContent = item.name
                option.value = item.name
                projectSelector.appendChild(option)
            }
        })
        addTodoConfirmButton.addEventListener("click", (e) => {
            const nameInput = document.querySelector("#todo-name")
            const dateInput = document.querySelector("#todo-date")
            const projectSelector = document.querySelector("#select-project")
            const prioritySelector = document.querySelector("#select-priority")
            if (nameInput.value === ""){
                alert("name must not be empty")
                return
            }
            else if(projectSelector.value === undefined){
                alert("please choose a project")
                return
            }
            let todoChecker = todoListMaker.addTodo(new Todo(nameInput.value,null,dateInput.value,prioritySelector.value),projectSelector.value)
            if (todoChecker === "no project"){
                alert("no project selected, please choose one")
            }
            else if (todoChecker === "already made"){
                alert("todo is already made")
            }
            addTodoForm.classList.add("closed")
            addTodoButton.classList.remove("closed")
            displayTodos()
            todoListMaker.updateStorage()
        })

    }
    
    function displayTodoDescription(todo,project){
        const projectHeader = document.querySelector(".project-name .todo-details-project-name")
        const todoPriority = document.querySelector(".project-name .internal-priority")
        const todoTitle = document.querySelector(".todo-title h3")
        const dueDateInput = document.querySelector(".due-date-input")
        const todoDescription = document.querySelector(".description-container .description")
        const subTaskMainContainer = document.querySelector(".sub-tasks")
        const completedButton = document.querySelector(".mark-complete")
        const deleteButton = document.querySelector(".delete-todo")
        const saveButton = document.querySelector(".save-button")
        const ConfirmAddButton = document.querySelector(".add-subclass")
        projectHeader.textContent =
        todoPriority.textContent = 
        todoTitle.textContent = 
        dueDateInput.value = 
        todoDescription.textContent = ""
        projectHeader.textContent = project.name
        todoPriority.textContent = todo.priority
        todoTitle.textContent = todo.title
        dueDateInput.value = todo.dueDate
        todoDescription.value = todo.description
        todo.complete === true ? 
        completedButton.classList.add("complete"):
        completedButton.classList.remove("complete")
        subTaskMainContainer.textContent = ""
        function displaySubTask(task){
            const subTaskContainer = document.createElement("div")
            const subTaskInput = document.createElement("input")
            const subTaskLabel = document.createElement("label")
            subTaskContainer.classList.add("subtask")
            subTaskInput.type = "checkbox"
            subTaskInput.id = task.title
            subTaskLabel.textContent = task.title
            subTaskInput.checked = task.completed
            subTaskLabel.setAttribute("for" , task.title)
            subTaskContainer.append(subTaskInput,subTaskLabel)
            subTaskMainContainer.appendChild(subTaskContainer)
        }
        function displaySubTasks(){
        document.querySelector(".sub-tasks").textContent = ""
        for(const item of todo.checklist){
            displaySubTask(item)
        }}
        displaySubTasks()

function newSubTask(e){
            const subTaskAddInput = document.querySelector("#new-sub-task-input")
            if (subTaskAddInput.value === ""){
                return alert("the name of subTask can't be empty")
            }
            const checker = todo.addSubTask(new SubTask(subTaskAddInput.value))
            if(checker === "made already"){
                alert("already made buddy")
            }
            document.querySelector(".add-sub-task").classList.remove("closed")
            document.querySelector(".new-sub-task").classList.add("closed")
            displaySubTasks()
            todoListMaker.updateStorage()
        }

        ConfirmAddButton.addEventListener("click", newSubTask)
        saveButton.addEventListener("click", function saveButtonFunction(e){
            const allSubTasks = document.querySelectorAll(".subtask")
            
            todo.dueDate = dueDateInput.value
            todo.description = todoDescription.value
            completedButton.classList.contains("complete") ? todo.complete = true : todo.complete = false
            document.querySelector(".todo-details-display").classList.add("closed")
            console.log(todo)
            
            if(allSubTasks === null){
                return
            }
            for (const task of allSubTasks){
                let complete
                let title
                for(const node of task.children){
                    if (node.tagName === "INPUT"){
                        complete = node.checked
                    }
                    else if(node.tagName === "LABEL"){
                        title = node.textContent
                    }
                }
                const subTaskIndex = todo.checklist.findIndex(item => item.title === title)
                if (subTaskIndex === -1){
                    return
                }
                else {
                    todo.checklist[subTaskIndex].completed = complete
                }

            }
                saveButton.removeEventListener("click" , saveButtonFunction)
                displayTodos()
                ConfirmAddButton.removeEventListener("click", newSubTask)
                todoListMaker.updateStorage()

        })

        deleteButton.addEventListener("click", function deleteButtonFunction(e){
            todoListMaker.removeTodo(todo,project.name)
            document.querySelector(".todo-details-display").classList.add("closed")
            deleteButton.removeEventListener("click" , deleteButtonFunction)
            displayTodos()
            ConfirmAddButton.removeEventListener("click", newSubTask)
            todoListMaker.updateStorage()
        })
                document.querySelector(".cancel-button").addEventListener("click", () => {
            document.querySelector(".todo-details-display").classList.add("closed")
            ConfirmAddButton.removeEventListener("click", newSubTask)
        })

    }


    (() => {
        document.querySelector("button.cancel-todo").addEventListener("click", () => {
            document.querySelector(".new-todo").classList.add("closed")
        })

        document.querySelector(".add-sub-task").addEventListener("click" , () => {
            document.querySelector(".new-sub-task").classList.remove("closed")
            document.querySelector(".add-sub-task").classList.add("closed")
        })
        document.querySelector(".cancel-subclass").addEventListener("click" , ()=> {
            document.querySelector(".new-sub-task").classList.add("closed")
            document.querySelector(".add-sub-task").classList.remove("closed")
        })
        document.querySelector(".mark-complete").addEventListener("click", (e) => {
            e.target.classList.contains("complete") ? 
            e.target.classList.remove("complete") :
            e.target.classList.add("complete") 
             

        })
    })()
displayTodos()
addTodo()
return {displayTodos}
}

let externalTodoDom = todoDom()


export {projectDom}