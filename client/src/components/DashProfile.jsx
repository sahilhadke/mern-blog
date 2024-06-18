/* eslint-disable no-unused-vars */
import {useSelector, useDispatch} from 'react-redux'
import {useState, useRef, useEffect} from 'react'
import {Alert, Button, TextInput} from 'flowbite-react'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    
    const handleImageChange = (e) => {
        const file = (e.target.files[0])
        if(file){
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    console.log(imageFileUrl)
    console.log(imageFile)

    useEffect(() => {
        if (imageFile) {
          uploadImage();
        }
      }, [imageFile]);

    const uploadImage = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + '_' + imageFile.name
        const storageRef = ref(storage, fileName)   
        const uploadTask = uploadBytesResumable(storageRef, imageFile)


        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadProgress(progress.toFixed(0))

                console.log('Upload is ' + progress + '% done')
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                setImageFileUploadError('Could not upload image')
                console.log(error)
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)

                    console.log('Upload is complete: ' + downloadURL)
                    setImageFileUploadProgress(null)
                })
                

            }
        )
    }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>

        <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        <form className='flex flex-col gap-4'>
            <input className='hidden' type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef}/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={()=>{filePickerRef.current.click()}}>
                
                {imageFileUploadProgress && (
                    <CircularProgressbar 
                    value={imageFileUploadProgress || 0} 
                    text={`${imageFileUploadProgress}%`} 
                    strokeWidth={5}
                    style={
                        {
                            root:{
                                width: '100%',
                                height: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0
                            },
                            path:{
                                stroke: `rgba(62, 152, 199, ${imageFileUploadProgress/100})`
                            }
                            
                        }
                    }
                    />
                )}

                <img 
                src={imageFileUrl || currentUser.photoURL} 
                alt='user' 
                className={`rounded-full object-cover h-full w-full border-8 border-[lightgrey] $ 
                    {imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60'}`} />
       
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
