import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import '../css/CreateActivity.css'

const AddUserToTrip = ( { api_url } ) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState( { username: 'JohnDoe' } )
    const { trip_id } = useParams()

    const handleChange = (event) => {
        const { name, value } = event.target

        setUsername((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    
    const addUserToTrip = async (event) => {
        event.preventDefault()

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(username),
        }
        
        await fetch(`${api_url}/api/users-trips/create/${trip_id}`, options)

      //  window.location = '/'
	navigate('/');
    }

    return (
        <form>
            <center><h3>Add User to Trip</h3></center>

            <label>Enter GitHub Username</label> <br />
            <input type='text' id='username' name='username' value={username.username} onChange={handleChange} /><br />
            <br />

            <label>Trip ID</label><br />
            <input type='number' id='trip_id' name='trip_id' value={trip_id} readOnly /><br />
            <br/>

            <input type='submit' value='Submit' onClick={addUserToTrip} />
        </form>
    )
}

export default AddUserToTrip
