import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./instructions.css"
const Instructions = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [language, setLanguage] = useState('english'); // Default to English

    const handleNext = (e) => {
        e.preventDefault();
        navigate(`/test/${language}/${id}`);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="instructions">
            <fieldset>
                <legend>निर्देश (INSTRUCTIONS)</legend>

                <p><b>मराठी / Marathi</b></p>
                <p>पुढील पृष्ठावर तुमच्या विचारांच्या आणि कृतींच्या संदर्भात अनेक स्थितिंमध्ये 90 विधांतांचे दिलेले आहेत. प्रत्येक विधांताला लक्ष देऊन वाचा आणि पाच पर्यायी उत्तरांच्या आधारे तुमचा उत्तर निश्चित करा की तुम्ही कसं करता/प्रतिक्रिया करता - सदैव, अधिकतर, अक्षरी, वारंवार, कधी कधी, कधी नाही आणि उपयुक्त बॉक्समध्ये एक चिन्ह लावा जो तुमचा उत्तर सर्वोत्तम दर्शवतो. कृपया प्रत्येक विधांताचा उत्तर द्या।</p>

                <p><b>हिन्दी / Hindi</b></p>
                <p>
                    अगले पृष्ठ पर विभिन्न स्थितियों में आपकी सोच और कार्यवाही के बारे में 90 कथन दिए गए हैं। प्रत्येक कथन को ध्यान से पढ़ें और पाँच वैकल्पिक उत्तरों के आधार पर अपना उत्तर तय करें कि आप कैसे करते हैं/प्रतिक्रिया करते हैं-<strong> हमेशा, अधिकतर, प्रायः, कभी-कभी, कभी नहीं</strong> और उपयुक्त बॉक्स में एक निशान लगाए जो आपके उत्तर को सबसे उपयुक्त व्यक्त करता हो। कृपया प्रत्येक कथन का उत्तर दें।
                </p>
                <p><b>English</b></p>
                <p>
                    On the next page, 90 statements about your thinking and taking action in various situations have been given. Read each statement carefully and decide your answer on how you act/react based on the five alternative answers, <strong>Always, Mostly, Often, Rarely, and Never</strong> and put a mark in the appropriate box which depicts your answer the best. Please respond to each statement.
                </p>
                <form onSubmit={handleNext}>
                    <label htmlFor="language">भाषा निवडा / भाषा का चयन करें / Select Language:</label>
                    <select name="language" id="language" value={language} onChange={handleLanguageChange}>
                        <option value="marathi">Marathi</option>
                        <option value="hindi">Hindi</option>
                        <option value="english">English</option>
                    </select>
                    <button type="submit">Next</button>
                </form>
            </fieldset>
        </div>
    );
};

export default Instructions;
