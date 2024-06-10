import { useParams } from "react-router-dom"

const SuccessfulSubmit = () => {
  const { id } = useParams()
  return (
    <div className="instructions">
      <div className='success-page'>
        <div className="success-content">
          <h1>Test Submitted Successfully!</h1>
          <h2>Test Submission id is <b>{id}</b></h2>
          <p>Thank you for completing the test. Your responses have been submitted successfully.</p>
          <p>Your results will be analyzed by our team of professionals. In the meantime, if you have any urgent concerns or questions, please contact your doctor:</p>
          <div className="contact-info">
            <p>Dr. Akshay M. Shriwas</p>
            <p>Email: emindcafe.com</p>
            <p>Phone: +91 96071 44154</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SuccessfulSubmit