import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Link } from 'react-router-dom';

function Login(){
  
  
    const {onLogin}= useContext(AppContext)

    const[ formData,setFormData]=useState({
        email: '',
        password:''
    });


    const[submitting,setSubmitting]=useState(false);
    const navigate = useNavigate()

    const handleChange=(e) =>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const API_URL = process.env.REACT_APP_BACKEND_API

    function handleSubmit(e){
      console.log("sumitting")
        e.preventDefault();
        
        //Dispaly submitting msg
        setSubmitting(true);
        
        fetch(`${API_URL}/users/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify(formData),
        })
    .then(response =>{
        if(!response.ok){
            throw new Error('Login failed');
        }
        return response.json();
    })

    .then(data =>{

       console.log('Login success',data);

        //clear form data
        setFormData({
            email:'',
            password:'',
        });

        //Hide submtting msg
        setSubmitting(false);

        // now save accessToekn in local storage in order to access it in further reuquests to server
        //localStorage.setItem("accessToken",data.accessToken)

        onLogin(data.user,data.accessToken)
        alert("Login Successfully!");
       
        navigate("/users/"+data.user._id);
         
    })

    .catch(error=>{
       console.error('Login Error: ',error);

        //hide submitting msg
        setSubmitting(false);
    });
    
}
  return <>
    <Card className="bg-dark text-white">
      <Card.ImgOverlay>
        <Card.Title style={{color:'blue',textAlign:'center',marginTop:30, fontWeight:600,fontSize:40,fontFamily:'sans-serif'}}>Authentication-Form</Card.Title>
        <Row>
          <Col sm={4}></Col>
          <Col sm={4} style={{ marginTop: 80 }}>
            <Card style={{ backgroundColor: '#F0FFF0' }}>
              <Card.Header style={{ backgroundColor: "lightgreen" }}>Login</Card.Header>
              <Card.Body>
                
                <Form className='form' onSubmit={handleSubmit}>
                  
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      Your Email :
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="email" name="email" placeholder='email' onChange={handleChange} />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="mb-3" >
                    <Form.Label column sm="3">
                      Password :
                    </Form.Label>
                    <Col sm="9">
                      <Form.Control type="password" name='password' placeholder="Password" onChange={handleChange} />
                    </Col>
                  </Form.Group>
                  <span >Not a User ? </span><Link to="/users/add">Sign up</Link><br/>

                   {/* <Link to={"/users/add"} className="btn btn-success" style={{ marginTop: 15 }}>Create Account</Link> */}
                  <Button  type="submit"  className="btn btn-success" style={{marginTop:15}} >Login</Button>
                </Form>
              
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}></Col>
        </Row>

      </Card.ImgOverlay>
    </Card>  
    </>
}

export default Login;