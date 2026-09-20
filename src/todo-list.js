import "./styles.css"
class Todo {
    constructor(title,description,dueDate,priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.complete = false
        this.checklist = []
    }


    
    addSubTask(task){
        for (const item of this.checklist){
            if (task.title === item.title){
                return "made already"
            }
        }
        this.checklist.push(task)
    }



}

let todoListMaker = (function(){
    let todoList

    if(!localStorage.getItem("todoList")){
        todoList = [{name:"default",list:[]}]
        updateStorage()
    }
    else {
        todoList = JSON.parse(localStorage.getItem("todoList"))
        for (const project of todoList){
            for (const todo of project.list){
                Object.setPrototypeOf(todo , Todo)
            }
        }
    }

    function updateStorage() {
        localStorage.setItem("todoList", JSON.stringify(todoList))
    }

    function addProject(project){
        if(!(todoList.findIndex(item => item.name === project.name)=== -1)){
            return "made"

        }
        todoList.push(project)
    }

    function removeProject(name){
        const index = todoList.findIndex( project => project.name === name)
        todoList.splice(index,1)
    }

    function addTodo(todo,nameOfProject){
        let index = todoList.findIndex( project => project.name === nameOfProject)
        if(!(todoList.some(e => e.name === nameOfProject))){
            return "no project"
        }

        let todoIndex = todoList[index].list.findIndex( item => item.title === todo.title)
        if (!(todoIndex === -1)){
            return "already made"
        }
        todoList[index].list.push(todo)
    }
    function removeTodo(todo,nameOfProject){
        let projectIndex = todoList.findIndex( project => project.name === nameOfProject)
        console.log(projectIndex,todoList)
        if(projectIndex === -1){
            return
        }
        let todoIndex = todoList[projectIndex].list.findIndex( item => item.title === todo.title)
        if (todoIndex === -1){
            return
        }
        todoList[projectIndex].list.splice(todoIndex,1)
        
    }

    

    return {addProject,removeProject,todoList,addTodo,removeTodo,updateStorage}
})()

class SubTask{
    constructor(title,completed){
        this.title = title
        this.completed = false 
        
    }


}

class Project {
    constructor(name){
        this.name = name
        this.list = []
    }
}



export {Project,todoListMaker,Todo,SubTask}

