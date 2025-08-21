// import React,{useState} from "react";
// import "../css/landingpage.css";
// function ContactForm() {
//   const [query, setQuery] = useState('');

//   const sendEmail = () => {
//     // Send AJAX request to server
//     fetch('/send-email', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ query: query })
//     })
//     .then(response => {
//       if (response.ok) {
//         alert("Email sent successfully");
//       } else {
//         alert("Failed to send email. Please try again later.");
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//       alert("Failed to send email. Please try again later.");
//     });
//   };

//   return (
//     <div className="contact-page-wrapper" id="contactSection">
//       <h1 className="primary-heading">Have Question In Mind?</h1>
//       <h1 className="primary-heading">Let Us Help You</h1>
//       <div className="contact-form-container">
//         <input 
//           type="text" 
//           value={query} 
//           onChange={e => setQuery(e.target.value)} 
//           placeholder="Type your queries here" 
//         />
//         <button className="secondary-button" onClick={sendEmail}>Submit</button>
//       </div>
//     </div>
//   );
// }

// export default ContactForm;












import React, { useState } from "react";
import "../css/landingpage.css";

function ContactForm() {
  const [query, setQuery] = useState("");

  const sendEmail = () => {
    // Open the default email client with a pre-filled email
    window.open(`mailto:parul.chaddha94@gmail.com?subject=Query_for_Tastebud&body=${query}`);
  };

  return (
    <div className="contact-page-wrapper" id="contactSection">
      <h1 className="primary-heading">Have Question In Mind?</h1>
      <h1 className="primary-heading">Let Us Help You</h1>
      <div className="contact-form-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="your email address"
        />
        <button className="secondary-button" onClick={sendEmail}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default ContactForm;






















