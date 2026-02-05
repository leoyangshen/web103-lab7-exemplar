import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActivityBtn from '../components/ActivityBtn';
import '../css/TripDetails.css';

const TripDetails = ({ data, api_url }) => {
    const { id } = useParams();
    const [trip, setTrip] = useState({
        id: 0, title: '', description: '', img_url: '', 
        num_days: 0, start_date: '', end_date: '', total_cost: 0.00
    });
    
    const [activities, setActivities] = useState([]);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        // 1. Find the specific trip from the trips state passed from App.jsx
        const result = data.find(item => item.id === parseInt(id));
        if (result) {
            setTrip(result);
        }

        // 2. Fetch Activities for this specific trip id
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${api_url}/api/activities/${id}`);
                const json = await response.json();
                setActivities(json);
            } catch (error) {
                console.error("Could not fetch activities:", error);
            }
        };

        // 3. Fetch Linked Destinations (The Great Wall, etc.)
        const fetchDestinations = async () => {
            try {
                // Matches router.get('/destinations/:trip_id') in trips-destinations.js
                const response = await fetch(`${api_url}/api/trips-destinations/destinations/${id}`);
                const json = await response.json();
                setDestinations(json);
            } catch (error) {
                console.error("Could not fetch destinations:", error);
            }
        };

        fetchActivities();
        fetchDestinations();
    }, [data, id, api_url]);

    return (
        <div className="TripDetails">
            <main>
                {/* Trip Banner Section */}
                <div style={{ backgroundImage: `url(${trip.img_url})` }} className="trip-header">
                    <div className="trip-header-content">
                        <h1>{trip.title}</h1>
                        <p>{trip.description}</p>
                        
                        {/* DESTINATION SECTION: Shows 'The Great Wall' */}
                        <div className="destination-list">
                            {destinations && destinations.length > 0 ? (
                                destinations.map((dest, index) => (
                                    <span key={index} className="destination-tag">
                                        📍 {dest.destination} {/* Matches your JSON key 'destination' */}
                                    </span>
                                ))
                            ) : (
                                <span className="no-dest">No destinations linked yet</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Activities Section */}
                <div className="activities-container">
                    <h2>Planned Activities</h2>
                    <div className="activities-grid">
                        {activities && activities.length > 0 ? (
                            activities.map((act) => (
                                <ActivityBtn 
                                    key={act.id} 
                                    id={act.id} 
                                    activity={act.activity} 
                                    num_votes={act.num_votes}
                                    api_url={api_url} 
                                />
                            ))
                        ) : (
                            <p>No activities yet! Use the button below to add some.</p>
                        )}
                    </div>
                    
                    <div className="details-controls">
                        <a href={`/activity/create/${id}`}>
                            <button className="addActivityBtn">+ Add Activity</button>
                        </a>
                        <a href={`/destination/new/${id}`}>
                            <button className="addDestBtn">+ Add Destination</button>
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TripDetails;
