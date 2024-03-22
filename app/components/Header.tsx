'use client'

import Modal from "@/app/components/modals/Modal"
import RegisterModal from "@/app/components/modals/RegisterModal"
import Navbar from "@/app/components/navbar/Navbar"
import ToasterProvider from "@/app/providers/ToasterProvider"

const Header = () => {
  return <>
    <ToasterProvider />
    <RegisterModal />
    <Navbar />
    <Modal isOpen={false} onClose={() => { }} onSubmit={() => { }} actionLabel='Submit' />
  </>
}

export default Header