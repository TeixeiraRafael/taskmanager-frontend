import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { api } from "../api/api";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const TaskList = ({tasks, active_tasks, finished_tasks}) => {
    const navigate = useNavigate()
    const [access_token, setAccessToken] = useState();
    const [showUpdateTaskForm, setShowUpdateTaskForm] = useState(false);

    const [task_name, setTaskName] = useState("");
    const [task_description, setTaskDescription] = useState("");

    useEffect(() => {
        const getToken = async () => {
            const token = await JSON.parse(localStorage.getItem('access_token'));
            setAccessToken(token);
        }
        getToken();
    }, [])

    const updateTaskStatus = async (task) => {
        const requestData = {
            'access_token': access_token,
            'id': task.id,
            'name': task.name,
            'description': task.description,
            'done': ! task.done
        }

        await api.put('/task', requestData)
            .then((response) => {
                if(response.data.success === true) window.location.reload();
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }

    const deleteTask = async (task) => {
        console.log(task)
        const requestData = {
            'access_token': access_token,
        }

        const deleteUrl = '/task/' + task.id

        await api.delete(deleteUrl, {data: requestData})
            .then((response) => {
                if(response.data.success === true) window.location.reload();
            }).catch((err) => {
                console.log(err.response.data.message)
            })
    }
    
    const handleShowUpdateTaskForm = (task) =>{
        setTaskName(task.name);
        setTaskDescription(task.description);
        setShowUpdateTaskForm(true);
    }

    const handeCloseUpdateTaskForm = () => {
        setShowUpdateTaskForm(false);
    }

    const handleUpdateTask = (e, task) => {
        e.preventDefault();
        console.log(e);
        console.log(task)
    }

    return(
        <>  
            <br />
            <Card body>
            <h3>
                Tarefas Ativas:
            </h3>
            <Container md={12}>
                {
                    active_tasks.map((task) => {
                        return (
                            <div key={task.id}>
                                <hr></hr>
                                <Row>
                                    <Col md={12}>
                                        <h5>{task.name}</h5>
                                        {task.description}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col md={4}>
                                        <Button variant="danger" onClick={() => deleteTask(task)}> Excluir </Button>
                                    </Col>
                                    <Col md={{offset:6}}>
                                        <Button onClick={() => updateTaskStatus(task)}> Concluir </Button>
                                    </Col>
                                </Row>
                                <br />
                            </div>
                        )
                    })
                }
            </Container>
            </Card>
            <br/>
            <Card body>
                <h3>Tarefas Concluídas</h3>
                <Container md={12}>
                    {
                        finished_tasks.map((task) => {
                            return (
                                <div key={task.id}>
                                    <hr></hr>
                                    <Row>
                                        <Col md={4}>
                                            <h5>{task.name}</h5>
                                            {task.description}
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col md={4}>
                                            <Button variant="danger" onClick={() => deleteTask(task)}> Excluir </Button>
                                        </Col>
                                        <Col md={{offset:6}}>
                                            <Button onClick={() => updateTaskStatus(task)}> Restaurar </Button>
                                        </Col>
                                    </Row>
                                    <br />
                                </div>
                            )
                        })
                    }
                </Container>
            </Card>
        </>
    );
}

export default TaskList;