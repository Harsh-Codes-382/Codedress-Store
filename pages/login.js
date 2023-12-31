import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');


  // Just to restrict this url point when user already logged in
  useEffect(()=>{
    if(localStorage.getItem('token')){
      router.push('/')
    }
  },[])
  

  const handlerSubmit = async (e)=>{
    e.preventDefault();
    const logindata = {email, password}
    setEmail("");
    setPassword("");
    let res = await fetch('/api/login', {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(logindata)
    })
    let data = await res.json();

    // console.log(data)

    if(data?.success){
      localStorage.setItem('token', data?.token)

      let capitalName = data?.name.charAt(0).toUpperCase() + data?.name.slice(1);
      toast.success(`Welcome Back ${capitalName}`, {
        position: "top-center",
        autoClose: 2000,
      });
      
     setTimeout(()=>{
       
       router.push('/')
     },1000)
    }
    else{
      toast.error(data?.err, {
        position: "top-center",
        autoClose: 1000,
      });

    }
  }

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        draggable={false}
      />
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 pt-24 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link href={'/'}><img className="mx-auto h-12 w-auto rounded-full border-blue-500" src="/logo.png" alt="Your Company" /></Link>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
          
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handlerSubmit} className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
              <div className="mt-2">
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div className="text-sm">
                  <Link href={'/forgot'} className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
                </div>
              </div>
              <div className="mt-2">
                <input onChange={(e) => { setPassword(e.target.value) }} value={password} id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link href={'/signup'} className="font-semibold ml-1 leading-6 text-indigo-600 hover:text-indigo-500">Create Account</Link>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default Login
