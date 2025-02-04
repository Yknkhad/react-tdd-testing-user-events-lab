import React, { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState({
    coding: false,
    design: false,
    marketing: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleInterestChange = (e) => {
    const { name, checked } = e.target;
    setInterests((prev) => ({ ...prev, [name]: checked }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>Newsletter Signup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <h3>Areas of Interest:</h3>
            <label>
              <input
                type="checkbox"
                name="coding"
                checked={interests.coding}
                onChange={handleInterestChange}
              />
              Coding
            </label>
            <label>
              <input
                type="checkbox"
                name="design"
                checked={interests.design}
                onChange={handleInterestChange}
              />
              Design
            </label>
            <label>
              <input
                type="checkbox"
                name="marketing"
                checked={interests.marketing}
                onChange={handleInterestChange}
              />
              Marketing
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you for signing up, {name}!</h2>
          <p>
            You are interested in{' '}
            {Object.keys(interests)
              .filter((key) => interests[key])
              .join(', ')}
            .
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
