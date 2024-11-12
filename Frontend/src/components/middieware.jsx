import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Middieware({ children }) {
    const userData = useSelector((state) => state.user.data);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userData) {
            navigate('/');
        }
    }, [userData, navigate]);

    if (!userData) {
        return null; // Prevents rendering if userData is missing
    }

    return children; // Only renders children if userData is present
}

export default Middieware;
