import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qoq32ug', 'template_bvtxt9j', form.current, {
        publicKey: '7SWs3PpwBtvP3nax8',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  const inputStyle = {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    marginBottom: '5px',
    fontWeight: 'bold',
    display: 'block',
  };

  const buttonStyle = {
    padding: '12px',
    backgroundColor: '#915eff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#915eff',
  };

  return (
    <form ref={form} onSubmit={sendEmail} style={{ maxWidth: '500px', width: '400px', marginLeft: '120px', marginTop: '70px' }}>
      <label style={{ ...labelStyle, color: '#915eff' }}>Name</label>
      <input type="text" name="user_name" style={inputStyle} required />
      <label style={{ ...labelStyle, color: '#915eff' }}>Email</label>
      <input type="email" name="user_email" style={inputStyle} required />
      <label style={{ ...labelStyle, color: '#915eff' }}>Message</label>
      <textarea name="message" style={{ ...inputStyle, height: '120px' }} required />
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={e => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={e => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Send
      </button>
    </form>
  );
};

export default ContactUs;

