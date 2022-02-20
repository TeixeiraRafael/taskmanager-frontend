import React, {useContext, useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router";

import { authContext } from '../../context/AuthContext';

import LoginForm from "../../components/LoginForm";

import Alert from 'react-bootstrap/Alert';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authenticated, login } = useContext(authContext);
    
    const [error, setError] = useState("");
    const [alert, setAlert] = useState();

    useEffect(() => {
        if(authenticated){
            navigate('/home')
        }
    }, [authenticated]);

    useEffect(() => {
        if (location.state){
            setError(location.state.error_message);
        }
    }, [location]);

    useEffect(() => {
        if(error === "") {
            setAlert("")
        }else {
            setAlert(
                <Alert variant='danger'> {error} </Alert>
            )
        }    
    }, [error]);

    const handleLogin = (email, password) => {
        const requestData = {
            'email': email,
            'password': password
        }
        login(requestData);
    }
    
    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="4" sm="2" xs="1">
                        <h1>Login</h1>
                        {alert}
                        <LoginForm handleLogin={handleLogin}></LoginForm>
                    </Col>
                </Row>
            </Container>
        </>
    ); 
}

export default Login;