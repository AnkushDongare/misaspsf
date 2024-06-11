import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Result() {
    const { id } = useParams()
    const [data, setData] = useState(null);
    const [details, setDetails] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5000/api/data', { id });
                setData(response.data.response);
                const patientDetails = await axios.get('http://localhost:5000/get/patient', response.data.response.patient);
                setDetails(patientDetails.data.response)
                const result = await axios.post('http://localhost:5000/api/result', { id });
                setResult(result)
                console.log(patientDetails);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Result Data:</h1>
            <pre>Test ID: {data._id}</pre>
            <div>
                {details.map((item, index) => (
                    <ul key={index}>
                        <li>Name:  {`${item.name} ${item.father_name} ${item.family_name}`}</li>
                        <li>Gender:  {item.gender}</li>
                        <li>dob:  {new Date(item.dob).toLocaleDateString()}</li>

                    </ul>
                ))}
            </div>
            <h2>Category Results:</h2>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {result.data.categoryResults && Object.entries(result.data.categoryResults).map(([category, score]) => (
                        <tr key={category}>
                            <td>{category}</td>
                            <td>{score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Result;
