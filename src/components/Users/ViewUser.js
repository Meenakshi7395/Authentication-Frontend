import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import React, { useState,useEffect,useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';

function ViewUser(){

    /// read the id from query parameter of the url 
    const { id } = useParams(); // Access the userId parameter
    console.log(id);
    const [userData,setUserData] = useState({
        name: '',
        email:'',  
        password:'',
        mobile:'',
        dob:'',
    })
  
    const navigate=useNavigate()
    /// use this id to make api call to server to fetch the user
    const {accessToken} = useContext(AppContext)
    const API_URL = process.env.REACT_APP_BACKEND_API

    
    function getById()   
    {
        console.log("fetching")
        fetch(`${API_URL}/users/`+id,{
            method:'GET',
            headers:{
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type':'application/json',
            },
                                                        
        }).then(response =>{
            if(!response.ok){
              throw new Error("Failed");
            }
            return response.json();
        })
        .then(data =>{
           
            if(data.success)
            {
                setUserData(data.users)
            }
            else
            {
                alert(data.message)
            }
        

        }).catch(error=>{
            console.error('Login Error: ',error);
            //navigate('/')
        });

    }

    useEffect(()=>{getById()},[])
    
    return<>
        <Row>
          <Col sm={3}></Col>
          <Col sm={6} style={{marginTop:50}}>
          <Card style={{backgroundColor:'#F0FFF0'}}>
          <Card.Header style={{backgroundColor:"lightgreen",fontFamily:'sans-serif'}}>Welcome {userData.name} </Card.Header>
          <Card.Body>
            <p><strong>Name : </strong>{userData.name}</p>
            <p><strong>Email : </strong> {userData.email}</p>
            <p><strong>Mobile : </strong>{userData.mobile}</p>
            <p><strong>Date of Birth : </strong>{userData.dob}</p>
            
            
            <Link to={"/users/add"} className="btn btn-secondary">Back</Link>
            
            
          </Card.Body>
        </Card>
          </Col>
          <Col sm="3"></Col>
        </Row>
    </>
}

export default ViewUser;
