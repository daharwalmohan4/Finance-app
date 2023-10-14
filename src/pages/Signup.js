import React from 'react'
import Header from '../components/Header'
import SignupSigninComponent from '../components/SignUpLogin/SignupSigninComponent'

function SignupPage() {
  return (
    <div>
      <Header/>
      <div className="wrapper">
        <SignupSigninComponent/>
      </div>
    </div>
  )
}

export default SignupPage