import React from 'react';

// Components
import './sign-in.style.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// Firebase
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {email, password} = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});
        } catch(error) {
            console.log(error);
        }
    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return(
        <div className='signin'>
            <div className='sign-in-header'>
                <h2 className='title'>I already have an account</h2>
                <span className='subtitle'>Sign in with email and password</span>
            </div>
            <form onSubmit={this.handleSubmit}>
                <FormInput 
                    name='email' 
                    type='email' 
                    label='Email' 
                    value={this.state.email} 
                    handleChange={this.handleChange} 
                    required />
                <FormInput 
                    name='password' 
                    type='password' 
                    label='Password' 
                    value={this.state.password} 
                    handleChange={this.handleChange} 
                    required />
                <div className='signin-buttons'>
                    <CustomButton type='submit'>Sign In</CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
        )
    }
}

export default SignIn;