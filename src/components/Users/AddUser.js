import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Alert,Card} from 'react-bootstrap';
import { useState,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../../context/AppContext';
import { Link } from 'react-router-dom';


function AddUser(){

  const[formData,setFormData]=useState({
      name: '',
      email:'',  
      password:'',
      confirmPassword:'',
      mobile:'',
      dob:''
  });

  // const TimestampToDate = ({ timestamp }) => {
  //   const formatDate = (timestamp) => {
  //     const date = new Date(timestamp * 1000); // Convert to milliseconds if timestamp is in seconds
  //     return date.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy
  //   };

  const [message,setMessage] = useState("")
  const [errors,setErrors] = useState([])
  const {accessToken} = useContext(AppContext)
 const navigate = useNavigate()

  const handleChange=(e) =>{
      setFormData({...formData,[e.target.name]:e.target.value});
  };
  const API_URL = process.env.REACT_APP_BACKEND_API

  function handleSubmit(e){
      e.preventDefault();
     

      fetch(`${API_URL}/users`,{
          method:'POST',
          headers:{
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type':'application/json',

          },
          body:JSON.stringify(formData),
      })
    .then(response =>{
        if(!response.ok){
          throw new Error("Failed");
        }
        return response.json();
    })
    .then(data =>{
       
      if(data.success){
        setErrors([])
        setMessage("User created successfully");

      //redirect
       setTimeout(()=>{
        navigate("/");
       },2000)
        
      }
      else
      {
        //console.log(data.errors);
        setErrors(data.errors)
        setMessage(data.message +"! Please try again")
        
      }
      // clear form data
    //   setFormData({
    //       name:'',
    //       email:'',
    //       password:'',
    //       mobile:'',
    //       dob:''
    // });
})

  .catch(error=>{
      //console.error('Error: ',error);
      navigate("/")
  
     
  });

    }
    return <>
    <Row> 
      <Col sm={4}></Col>
      <Col sm={4} style={{marginTop:50}}>

     {message ==="" ? <></> : <>
      <Alert variant= {errors.length>0 ?"danger" :"success" }>
          {message}
         <ul>
          {errors.map(e=>{
            return <li>{e.path} has {e.msg}</li>
          })}
         </ul>
        </Alert>  
     </>}
     
      <Card style={{backgroundColor:'#F0FFF0'}}>
      <Card.Header style={{backgroundColor:"lightgreen", fontFamily:'sans-serif'}} >Create a new Account</Card.Header>
      <Card.Body>
        <Form className='form' onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="3">
        Name :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" name='name' placeholder='name' onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Email :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" name='email' placeholder="Email" onChange={handleChange} />
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

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
        Confirm Password :
        </Form.Label>
        <Col sm="9">
        <Form.Control type="password" name='conformPassword' placeholder="Conform Password" onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
            Mobile :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="number"  name='mobile' placeholder="Mob. No." onChange={handleChange} />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" >
        <Form.Label column sm="3">
            Date of Birth :
        </Form.Label>
        <Col sm="9">
          <Form.Control type="date"  name='dob' placeholder="DOB" onChange={handleChange} />
        </Col>
      </Form.Group>

      
      <Button variant="success" type='submit' >Sign Up</Button>

      <span  style={{marginLeft:20}}>Already have an account? </span><Link to="/">Sign in</Link><br/>
        </Form>
        
      </Card.Body>
    </Card>
      </Col>
      <Col sm="4"></Col>
    </Row>
     
     
    </>
}

export default AddUser;