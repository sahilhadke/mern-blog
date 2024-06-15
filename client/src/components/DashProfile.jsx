import {useSelector} from 'react-redux'
import {Button, TextInput} from 'flowbite-react'
export default function DashProfile() {
    const currentUser = useSelector((state) => state.user.currentUser)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>

        <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
        <form className='flex flex-col gap-4'>
            
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
                
                <img src={currentUser.photoURL} alt='user' className='rounded-full object-cover h-full w-full border-8 border-[lightgrey ]' />
       
            </div>

            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='text' id='password' placeholder='password'/>
            <Button type='submit' color='primary' className='border-2'>Update</Button>

        </form>
        <div className='text-red-500 flex justify-between mt-5'>
              <span className='cursor-pointer'>Delete Account</span>
              <span className='cursor-pointer'>Signout</span>
        </div>

    </div>
  )
}
