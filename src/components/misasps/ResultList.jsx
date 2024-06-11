import { useEffect, useState } from 'react';
import axios from 'axios';

const ResultList = () => {
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [response1, response2] = await Promise.all([
                    axios.get('http://localhost:5000/api/data'),
                    axios.get('http://localhost:5000/get/patient')
                ]);
                setData1(response1.data.response || []);
                setData2(response2.data.response || []);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading data, please wait...</div>;
    if (error) return <div>Failed to load data: {error.message}</div>;

    // Create a map of patient IDs to their details from data2
    const patientMap = data2.reduce((map, patient) => {
        map[patient._id] = patient;
        return map;
    }, {});

    // Filter out duplicate test IDs
    const uniqueData1 = data1.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t._id === item._id
        ))
    );

    return (
        <div>
            <h1>Data from Route 1</h1>
            <table>
                <thead>
                    <tr>
                        <th>Test ID</th>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        <th>Patient Gender</th>
                        <th>Patient DOB</th>
                        <th>Patient Class</th>
                        <th>Patient Institution</th>
                        <th>Patient Place</th>
                        <th>Response Count</th>
                    </tr>
                </thead>
                <tbody>
                    {uniqueData1.map(item => {
                        const patient = patientMap[item.patient] || {};
                        return (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.patient}</td>
                                <td>{patient.name || 'N/A'}</td>
                                <td>{patient.gender || 'N/A'}</td>
                                <td>{patient.dob ? new Date(patient.dob).toLocaleDateString() : 'N/A'}</td>
                                <td>{patient.class || 'N/A'}</td>
                                <td>{patient.institution || 'N/A'}</td>
                                <td>{patient.place || 'N/A'}</td>
                                <td>{Object.keys(item.response).length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ResultList;
