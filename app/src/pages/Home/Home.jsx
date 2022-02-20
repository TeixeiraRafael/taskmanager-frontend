import React, {useContext, useState, useEffect, useRef } from "react";
import { authContext } from '../../context/AuthContext';

import { api } from "../../api/api";

import TaskList from '../../components/TaskList';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const Home = () => {
    const { logout } = useContext(authContext);
    
    const [error, setError] = useState("");
    const [tasks, setTasks] = useState([]);
    const [access_token, setAccessToken] = useState("");

    const [active_tasks, setActiveTasks] = useState([]);
    const [finished_tasks, setFinishedTasks] = useState([]);

    const [showTaskForm, setShowTaskForm] = useState(false);

    const [task_name, setTaskName] = useState("");
    const [task_descprition, setTaskDescription] = useState("");

    useEffect(() => {
        async function fetchData() {
            const access_token = await JSON.parse(localStorage.getItem('access_token'));
            api.post('/get_tasks', {'access_token': access_token})
            .then( (response) => {
                let _tasks = response.data.tasks;
                let _finished_tasks = Array();
                let _active_tasks = Array();

                _tasks.map((task) => {
                    task.done ? _finished_tasks.push(task) : _active_tasks.push(task)
                })
                setTasks(_tasks);
                setActiveTasks(_active_tasks);
                setFinishedTasks(_finished_tasks);
                setAccessToken(access_token);

            }).catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            });
        };
        fetchData();
    }, []);

    const handeCloseTaskForm = () => {
        setShowTaskForm(false);
    }

    const handleCreateTask = (e) => {
        e.preventDefault();
        const requestData = {
            'access_token': access_token,
            'name': task_name,
            'description': task_descprition,
        }

        api.post('/task', requestData)
            .then((response)=> {
                if(response.data.success) window.location.reload();
            }).catch((err) => {
                console.log(err);
            })
    }


    return(
        <>
            <Container>
                <Modal show={showTaskForm} onHide={handeCloseTaskForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nova Tarefa</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={ e => handleCreateTask(e)}>
                            <Form.Group className="mb-3" controlId="formBasicName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control required type="text" placeholder="Digite o nome da tarefa" onChange={e => setTaskName(e.target.value)} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control required type="text" placeholder="Descrição" onChange={e => setTaskDescription(e.target.value)} />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Adidionar
                            </Button>
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handeCloseTaskForm}>Fechar</Button>
                    </Modal.Footer>

                </Modal>
                <Row className="justify-content-md-center">
                    <Col md="8" sm="2" xs="1">
                        <Card body>
                            <Row>
                                <Col md={12}>
                                    <h1>Serverless <br/>Tasks Manager</h1>
                                </Col>
                            </Row>
                            <hr></hr>
                            <Row>
                                <Col md={{}}>
                                    <Button onClick={() => {setShowTaskForm(true)}}>+ Nova tarefa</Button>
                                </Col>
                                <Col md={{offset: 7}}>
                                    <Button onClick={logout}>Sair</Button>
                                </Col>
                            </Row>
                        </Card>
                        <TaskList tasks={tasks} active_tasks={active_tasks} finished_tasks={finished_tasks}/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;