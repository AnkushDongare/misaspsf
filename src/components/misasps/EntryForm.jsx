import { useState } from 'react';
import './entry.css'
import { useNavigate } from "react-router-dom"
function EntryForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        father_name: '',
        family_name: '',
        dob: '',
        gender: '',
        class: '',
        subject1: '',
        subject2: '',
        subject3: '',
        subject4: '',
        subject5: '',
        subject6: '',
        institution: '',
        place: '',
        area: '',
        school_type: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? (checked ? [...prevData[name], value] : prevData[name].filter(item => item !== value)) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://misasps.onrender.com/entry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Responses submitted successfully!', responseData);
                navigate(`/instructions/${responseData.id}`);
            } else {
                console.error('Failed to submit responses.');
            }
        } catch (error) {
            console.error('Error submitting responses:', error);
        }
    };

    return (
        <div className="entryForm">
            <form id="mainForm" onSubmit={handleSubmit}>
                <fieldset>
                    <legend>(कृपया निम्नलिखित प्रविष्टियाँ भरें :) Please fill in the following entries:</legend>

                    <label htmlFor="name">नाम (Name):</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                    <label htmlFor="father_name">पिता का नाम (Father&apos;s Name):</label>
                    <input type="text" id="father_name" name="father_name" value={formData.father_name} onChange={handleChange} required />

                    <label htmlFor="family_name">परिवार का नाम (Family Name):</label>
                    <input type="text" id="family_name" name="family_name" value={formData.family_name} onChange={handleChange} required />

                    <label htmlFor="dob">जन्म की तारीख (Date of Birth):</label>
                    <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

                    <p htmlFor="gender">लिंग (Gender):</p>

                    <label htmlFor="male">पुरूष (Male)</label>
                    <input type="radio" id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} required />
                    <label htmlFor="female">स्त्री (Female)</label>
                    <input type="radio" id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} required />

                    <label htmlFor="class">कक्षा (Class):</label>
                    <input type="text" id="class" name="class" value={formData.class} onChange={handleChange} required />

                    <label htmlFor="subject1">विषय (Subject) 1:</label>
                    <input type="text" id="subject1" name="subject1" value={formData.subject1} onChange={handleChange} />
                    <label htmlFor="subject2">विषय (Subject) 2:</label>
                    <input type="text" id="subject2" name="subject2" value={formData.subject2} onChange={handleChange} />
                    <label htmlFor="subject3">विषय (Subject) 3:</label>
                    <input type="text" id="subject3" name="subject3" value={formData.subject3} onChange={handleChange} />
                    <label htmlFor="subject4">विषय (Subject) 4:</label>
                    <input type="text" id="subject4" name="subject4" value={formData.subject4} onChange={handleChange} />
                    <label htmlFor="subject5">विषय (Subject) 5:</label>
                    <input type="text" id="subject5" name="subject5" value={formData.subject5} onChange={handleChange} />
                    <label htmlFor="subject6">विषय (Subject) 6:</label>
                    <input type="text" id="subject6" name="subject6" value={formData.subject6} onChange={handleChange} />

                    <label htmlFor="institution">संस्थान (Institution):</label>
                    <input type="text" id="institution" name="institution" value={formData.institution} onChange={handleChange} required />

                    <label htmlFor="place">स्थान (Place):</label>
                    <input type="text" id="place" name="place" value={formData.place} onChange={handleChange} required />

                    <p>क्षेत्र (Area) :</p>
                    <label htmlFor="metro">मेट्रो (Metro)</label>
                    <input type="radio" id="metro" name="area" value="metro" checked={formData.area === 'metro'} onChange={handleChange} />
                    <label htmlFor="urban">शहरी (Urban)</label>
                    <input type="radio" id="urban" name="area" value="urban" checked={formData.area === 'urban'} onChange={handleChange} />
                    <label htmlFor="rural">ग्रामीण (Rural)</label>
                    <input type="radio" id="rural" name="area" value="rural" checked={formData.area === 'rural'} onChange={handleChange} />

                    <p>स्कूल के प्रकार (Types of School):</p>
                    <label htmlFor="government">सरकारी (Government)</label>
                    <input type="checkbox" id="government" name="school_type" value="government" checked={formData.school_type.includes('government')} onChange={handleChange} />
                    <label htmlFor="private">निजी (Private)</label>
                    <input type="checkbox" id="private" name="school_type" value="private" checked={formData.school_type.includes('private')} onChange={handleChange} />
                    <label htmlFor="aided">एडेड (Aided)</label>
                    <input type="checkbox" id="aided" name="school_type" value="aided" checked={formData.school_type.includes('aided')} onChange={handleChange} />

                    <label htmlFor="boys_only">केवल लड़के (Boy&apos;s Only)</label>
                    <input type="checkbox" id="boys_only" name="school_type" value="boys_only" checked={formData.school_type.includes('boys_only')} onChange={handleChange} />
                    <label htmlFor="girls_only">केवल लड़कियाँ (Girl&apos;s Only)</label>
                    <input type="checkbox" id="girls_only" name="school_type" value="girls_only" checked={formData.school_type.includes('girls_only')} onChange={handleChange} />
                    <label htmlFor="combined">संयुक्त (Combined)</label>
                    <input type="checkbox" id="combined" name="school_type" value="combined" checked={formData.school_type.includes('combined')} onChange={handleChange} />
                    <br />
                    <input type="submit" value="Submit" />
                </fieldset>
            </form>
        </div>
    )
}

export default EntryForm;