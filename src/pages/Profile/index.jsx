import React from 'react'

import TherapistProfile from '@/components/User/updateTherapist'
import UserProfile from '@/components/User/UserProfile'

import { useAppcontext } from '@/context/state'

function profile() {
  const {user}= useAppcontext
  return (
    <>
    {
      user?.isTherapist? <TherapistProfile/> : <UserProfile/>
    }
    </>
  )
}

export default profile