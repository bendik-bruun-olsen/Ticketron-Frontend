// pages/HomePage.tsx
import React from 'react'
import Navbar from '../components/Navbar'
import { BookingCard } from '../components/BookingCard'

const Homepage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <h2>Welcome to the Home Page</h2>
            <p>You are successfully logged in!</p>
            <BookingCard />
        </div>
    )
}

export default Homepage
