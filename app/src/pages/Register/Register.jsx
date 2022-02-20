import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { api } from "../../api/api";
import { authContext } from "../../context/AuthContext";

import RegisterForm from "../../components/RegisterForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

const Register = () => {
    const navigate = useNavigate();
    
    const [error, setError] = useState("");
    const [alert, setAlert] = useState();
    const { authenticated } = useContext(authContext);
    
    useEffect(() => {
        if (authenticated) {
            navigate('/login');
        }
    }, [authenticated])
    
    useEffect(() => {
        if(error === "") {
            setAlert("")
        }else {
            setAlert(
                <Alert variant='danger'> {error} </Alert>
            )
        } 
    }, [error])

    const registerUser = async(username, email, password) => {
        const requestData = {
            'username': username,
            'email': email,
            'password': password
        }

        api.post('/register', requestData)
            .then((response) => {
                if(response.data.success === true){
                    console.log("Registered!");
                    navigate('/login');
                }
            }).catch((err) => {
                console.log(err.response.data);
                setError(err.response.data.message);
            })
    }

    return(
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="4" sm="2" xs="1">
                        <h1>Register</h1>
                        {alert}
                        <RegisterForm registerUser={registerUser} />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Register;