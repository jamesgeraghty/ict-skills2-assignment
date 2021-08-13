import React, { useRef } from "react"
import { Form, Button, Card } from "react-bootstrap"


export default function Signup() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConFirmRef = useRef()

    return (

        <>

        <Card>
            <Card.Body>
               <h2 className="text-center mb-4">Sign Up</h2>
               <Form>
                   <Form.Group id="email">
                       <Form.label>Email</Form.label>
                       <Form.Control type="email" ref= {emailRef} required />
                   </Form.Group>
                   <Form.Group id="password">
                   <Form.label>passowrd</Form.label>
                       <Form.Control type="password" ref= {passwordRef} required />
                   </Form.Group>
                   <Form.Group id="password-confirm">
                   <Form.label>Password Confirmation</Form.label>
                       <Form.Control type="password" ref= {passwordConFirmRef}Ref required />
                   </Form.Group>
                   <Button className="w-100" type="submit">Sign Up </Button>
               </Form>
            </Card.Body>
        </Card>
        <div className=" w-100 text-center mt-2">
            Already have an account? Log In 
        </div>
        </>
    )
}
