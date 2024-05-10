import {useState} from "react"
import TaskEntryArea from "./TaskEntryArea.js"


export default function ToDoList(){
    const [itemList, setItemList]=useState([])

    const [currTask, setCurrTask]=useState("") //for entry textbox

    const [isAddItemClicked, setIsAddItemClicked]=useState(false) //for opening up comment box to take entry

    function handleAddItem(){
        setIsAddItemClicked(true)
    }

    function handleCancel(){
        setIsAddItemClicked(false)
    }

    function handleMarkAsDone(taskId){
        setItemList(prevItemList => prevItemList?.map(item => item.id===taskId?{...item, isDone:!item.isDone}:item))
    }

    function handleDeleteTask(taskId){
        setItemList(prevItemList => prevItemList.filter(item => item.id!==taskId))
    }

    function handleDeleteList(){
        setItemList([])
    }

    function handleEnter(){
        if(currTask !== ""){
            setItemList(prevItemList => [...prevItemList, {
                id: Date.now(),
                text: currTask, 
                isDone: false
            }])
        }
        setCurrTask("")
        setIsAddItemClicked(false)
    }

    function handleEntry(event){
        const {value}=event.target
        //console.log(value)
        setCurrTask(value)
    }

    const strikethroughStyle = {
        textDecoration: 'line-through'
    }

    return(
        <div className="to-do-list">
            <h1>TO DO LIST</h1>
            <ul>
            {
                itemList.map(item => 
                    <li className="tasks" key={item.id}>
                        <p className="text">{item.isDone? <p style={strikethroughStyle}>{item.text}</p> : item.text}</p>  
                        <button className="done-btn" onClick={() => handleMarkAsDone(item.id)}>Done</button>
                        <button className="delete-task-btn" onClick={() => handleDeleteTask(item.id)}>Delete</button>
                    </li>
                )
            }
            </ul>
            <button className="add-btn" onClick={handleAddItem}>Add item</button>
            {isAddItemClicked && <TaskEntryArea handleCancel={handleCancel} handleEnter={handleEnter} handleEntry={handleEntry} />}
            <button className="delete-list-btn" onClick={handleDeleteList}>Delete List</button>
        </div>
    )
}