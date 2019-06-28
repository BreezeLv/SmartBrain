import React from 'react';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.pswRef = React.createRef();
  }

  onSubmit = () => {
    fetch("http://localhost:3000/signin",{
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        email : this.emailRef.current.value,
        password : this.pswRef.current.value
      })
    })//.then((res) => {if(res.status==200) this.props.onRouteChange("login");});
    .then((res) => res.json())
    .then((user) => {
      if(user.id) {
        this.props.loadUserProfile(user);
        this.props.onRouteChange("login");
      }
      else console.log("Wrong Email&Password Combination!");
    });
  }

  render() {
    const {onRouteChange} = this.props;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-3 center">
          <main className="pa4 black-80">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6">Email</label>
                  <input
                     className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                     type="email" 
                     name="email-address" 
                     id="email-address" 
                     ref={this.emailRef}
                   />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6">Password</label>
                  <input 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password" 
                    id="password" 
                    ref={this.pswRef}
                  />
                </div>
              </fieldset>
              <div className="">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={()=>this.onSubmit()}/>
              </div>
              <div className="lh-copy mt3">
                <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" onClick={()=>onRouteChange("register")}/>
              </div>
            </div>
          </main>
      </article>
    );
  }
  
}

export default Signin;