import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="loginCard">
      <div className='back'>
        <Link to="/">← Back to Inventions</Link>
      </div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="loginInput">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="loginInput">
          <label htmlFor="pwd">Password:</label>
          <input
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
        </div>
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className="loginButton">
          <Link to="/signup">Create New Account</Link>
          <button type="submit">Submit</button>

        </div>
      </form>
    </div>
  );
}

export default Login;
