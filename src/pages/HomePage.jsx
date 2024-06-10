import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const HomePage = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://misasps.onrender.com/code/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ codeNumber: code }),
            });

            const result = await response.json();
            if (response.ok && result.codeNumber) {
                navigate(`/entry/${code}`);
            } else {
                alert('Failed to validate code. Please insert a valid code.');
            }
        } catch (error) {
            console.error('Error validating code:', error);
            alert('Error validating code. Please try again later.');
        }
    };

    return (
        <div className="container">
            <h1>Welcome to the Multipal Intelligence Scale (MSI-ASPS) Test</h1>
            <h2>Discover Your Unique Strengths</h2>
            <p>Welcome! The Multipal Intelligence Scale (MSI-ASPS) is designed to help you understand the various facets of your intelligence. Based on the theory of multiple intelligences, this test aims to provide a comprehensive assessment of your cognitive abilities across different domains.</p>

            <h2>What to Expect</h2>
            <ul>
                <li><strong>Comprehensive Evaluation</strong>: The MSI-ASPS evaluates your abilities in various areas such as linguistic, logical-mathematical, spatial, musical, bodily-kinesthetic, interpersonal, intrapersonal, and naturalistic intelligences.</li>
                <li><strong>Personalized Insights</strong>: Upon completing the test, you&apos;ll receive detailed feedback about your strengths and areas for improvement.</li>
                <li><strong>Confidential and Secure</strong>: Your responses are confidential and will be used solely for the purpose of providing you with an accurate assessment.</li>
            </ul>

            <h2>How It Works</h2>
            <ul>
                <li><strong>Answer Honestly</strong>: There are no right or wrong answers. The accuracy of your results depends on how honestly you answer each question.</li>
                <li><strong>Take Your Time</strong>: The test is not timed. Take your time to reflect on each question and respond as accurately as possible. The Test time will be 20 min which is sufficient for completing test.</li>
                <li><strong>Review Your Results</strong>: After completing the test, you will receive a detailed report outlining your scores in each intelligence domain from your doctor.</li>
            </ul>

            <h2>Start Your Journey</h2>
            <p>Embark on a journey of self-discovery and unlock your full potential with the MSI-ASPS. Please enter your secret code below to begin the test.</p>

            <form className="code" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="code"
                    id="code"
                    className="code-input"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter your secret code"
                    required
                />
                <button type="submit" className="submit-button">Submit</button>
            </form>

            <div className="contact">
                <p>If you have any questions or need assistance, please contact our support team at <a href="mailto:emindcafe@gmail.com">emindcafe@gmail.com</a>.</p>
            </div>

            <p>Thank you for choosing the MSI-ASPS to explore your unique intelligence profile. We wish you an insightful and enriching experience!</p>
        </div>
    );
};

export default HomePage;
