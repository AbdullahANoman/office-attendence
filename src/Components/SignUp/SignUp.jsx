import { Link, useLocation, useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import { AuthContext } from "../../Providers/AuthProviders";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.pathname || '/';
  
  const {
    loading,
    setLoading,
    createUser,
    signInWithGoogle,
    updateUserProfile,
  } = useContext(AuthContext);
  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    // upload image in imgBB

    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        const photoURL = data?.data?.display_url;
        console.log(photoURL);
        createUser(email,password).then(result=>{
          const loggedUser = result.user;
          const savedUser = {image: photoURL , name: name, email: loggedUser.email, role: 'Employee'}
          
          console.log(savedUser)
          fetch('http://localhost:5000/users',{
            method : 'POST',
            headers : {
              'content-type' : 'application/json',
            },
            body : JSON.stringify(savedUser)
          
          })
          updateUserProfile(name,photoURL)
          navigate(from, {replace: true})
          console.log(location,loggedUser)
          toast.success('User Created Successfully ')
          setLoading(false)
        }).catch(error=>{
          console.log(error)
          toast.error(error.message)
          setLoading(false)
        })
      });
  };
  const handleGoogleSignIn = () =>{
    signInWithGoogle().then(result=>{
      const user = result.user;
      navigate('/form')
      toast.success('Employee Login Successfully')
      setLoading(false)
      console.log(user)
      
      
    }).catch(error=>{
      console.log(error)
      toast.error(error.message)
      setLoading(false)
    })
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to Office Attendance App</p>
        </div>
        <form
          onSubmit={handleRegister}
          noValidate=""
          action=""
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-rose-500 w-full rounded-md py-3 text-white"
            >
              {loading ? (
                <TbFidgetSpinner
                  className="animate-spin text-white mx-auto"
                  size={24}
                ></TbFidgetSpinner>
              ) : (
                <p>Continue</p>
              )}
            </button>
          </div>
        </form>
        <div  className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div onClick={handleGoogleSignIn} className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer">
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/"
            className="hover:underline hover:text-rose-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
