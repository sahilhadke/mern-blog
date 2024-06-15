import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashProfile from '../components/DashProfile'
import DashSidebar from '../components/DashSidebar'

export default function App() {

    const [tab, setTab] = useState('')

    const location = useLocation()
    
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFormUrl = urlParams.get('tab')
      setTab(tabFormUrl)
    }, [location.search])

    return (
      <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      
    </div>
    )
  }
  