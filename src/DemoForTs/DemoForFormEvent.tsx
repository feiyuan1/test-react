import React from "react";

export default function DemoForFormEvent(){
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!
    console.log('target: ', target, email)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('email-value: ',event.target.value)
  }
  return <form
  onSubmit={handleSubmit}
>
  <div>
    <label>
      Email:
      <input type="email" name="email" onChange={handleEmailChange}/>
    </label>
  </div>
  <div>
    <label>
      Password:
      <input type="password" name="password" />
    </label>
  </div>
  <div>
    <input type="submit" value="Log in" />
  </div>
</form>
}