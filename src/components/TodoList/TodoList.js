
import React, {useState} from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Row, Col } from 'reactstrap';

function TodoList(){   
    const [tasks, updateTasks] = useState( [ 
                { id: 1, heading: "Go to the bank", text: "Not Done" }, 
                { id: 2, heading: "Build BBQ", text: "Not Done" }, 
                { id: 3, heading: "Make an appointment with Lidor", text: "Not Done" },
                { id: 4, heading: "Schedule a walk with Michal", text: "Not Done" },
                { id: 5, heading: "Clean the house", text: "Not Done" },
                { id: 6, heading: "Clean the house", text: "Not Done" },
                { id: 7, heading: "Clean the house", text: "Not Done" } ]);

    const handleCheckboxClick = (event) => {
        const {id, checked} = event.target;

        let newArr = [...tasks];
        newArr[id-1].text = checked ? "Done" : "Not Done";
        updateTasks(newArr);
    }

    return(
        <div className="p-4">
            <h3>TO DO List</h3>
            <ListGroup>
               { tasks.map( (task) => 
                    <ListGroupItem key={task.id}>
                        <div className="d-flex justify-content-start">
                            <div className="mr-3">
                                <input id={task.id} type="checkbox" onClick={handleCheckboxClick}></input>
                            </div>
                            <div>
                                <ListGroupItemHeading>{ task.heading }</ListGroupItemHeading>
                                <ListGroupItemText>{ task.text } </ListGroupItemText>
                            </div>
                        </div>
                    </ListGroupItem>)}
            </ListGroup>
        </div>
    );
}

export default TodoList;