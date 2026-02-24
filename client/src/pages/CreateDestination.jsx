import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom' // Added useNavigate
import '../css/CreateDestination.css'

const CreateDestination = ({ api_url }) => {
    const { trip_id } = useParams()
    const navigate = useNavigate() // Initialize the navigation hook
    
    const [destination, setDestination] = useState({
        destination: '',
        description: '',
        city: '',
        country: '',
        img_url: '',
        flag_img_url: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setDestination((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // --- REFACTORED CODEPATH ---

    const createDestination = async (event) => {
        event.preventDefault()

        try {
            // 1. Create the Destination record first
            const destOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(destination)
            }
            const destResponse = await fetch(`${api_url}/api/destinations`, destOptions)
            const newDestData = await destResponse.json()
            
            // We need the ID from the first request to fuel the second request
            const newDestinationId = newDestData.id 

            // 2. Link the Destination to the Trip
            const linkOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    trip_id: trip_id, 
                    destination_id: newDestinationId 
                })
            }
            await fetch(`${api_url}/api/trips-destinations`, linkOptions)

            // 3. Success! Move the user home
            // We use navigate('/') instead of window.location for a smoother, 
            // single-page app experience (no full page reload).
            navigate('/')

        } catch (error) {
            console.error("Error in the creation sequence:", error)
            alert("Something went wrong creating the destination.")
        }
    }

    // --- END REFACTOR ---

    return (
        <form onSubmit={createDestination}> 
            <center><h3>Add Destination</h3></center>

            <label>Destination</label> <br />
            <input type='text' name='destination' value={destination.destination} onChange={handleChange}/><br />
            
            <label>Description</label><br />
            <textarea rows='5' cols='50' name='description' value={destination.description} onChange={handleChange}></textarea>
            
            <label>City</label><br />
            <input type='text' name='city' value={destination.city} onChange={handleChange}/><br />
            
            <label>Country</label><br />
            <input type='text' name='country' value={destination.country} onChange={handleChange}/><br />
            
            <label>Image URL</label><br />
            <input type='text' name='img_url' value={destination.img_url} onChange={handleChange}/><br />
            
            <label>Flag Image URL</label><br />
            <input type='text' name='flag_img_url' value={destination.flag_img_url} onChange={handleChange}/><br />

            <label>Trip ID</label><br />
            <input type='text' value={trip_id} readOnly/><br />
            
            <br/>
            <button type='submit'>Submit</button>
        </form>
    )
}

export default CreateDestination
