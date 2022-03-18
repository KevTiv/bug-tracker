import prisma from '../../prisma'
import type { NextPage } from 'next'
import {useRouter} from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.scss'
import fnt from '../../styles/Fonts.module.scss'
import supabase from '../../supabaseLib'
import { bugType } from '../../type'
import { DeleteButton, ModifyButton, ViewButton } from '../../components/actionButtons'
import Nav from '../../components/nav'
import Footer from '../../components/footer'

const History: NextPage = ({bugsList, currUserPrivileges, user}:any) => {
  const [bugs,setBugs] = useState<bugType[]>()
  
  useEffect(() => {
    setBugs(JSON.parse(bugsList))
  },[])
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/bug.ico" />
      </Head>

       <main className={styles.main}>
        <Nav page="Bug History Log" user={user.user_metadata}/>
        <table className="dark:text-white min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
        {/* <table className="dark:text-white w-full"> */}
          {/* Headers */}
          <thead className="border-b-2 border-black dark:border-white">
            <tr>
              <th scope="col" className={`${fnt.title__font} hidden md:table-cell py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Created</th>
              <th scope="col" className={`${fnt.title__font} hidden lg:table-cell py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Author ID</th>
              <th scope="col" className={`${fnt.title__font} py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Title</th>
              <th scope="col" className={`${fnt.title__font} hidden lg:table-cell py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Description</th>
              <th scope="col" className={`${fnt.title__font} py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Resolved</th>
              <th scope="col" className={`${fnt.title__font} py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>Priority</th>
              <th scope="col" className={`${fnt.title__font} py-3 px-6 text-xs md:text-base lg:text-lg font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 `}>More Action</th>
            </tr>
          </thead>
          {/* Body */}
          {
            bugs?.map(bug=>{
              return(
                <>
                  <tbody className="divide-y divide-black dark:divide-white  rounded-lg">
                    <tr key={bug.id} className={`${(bug?.priorityStatus === 'high') ? 'bg-red-200/60 dark:bg-red-600/40' : (bug?.priorityStatus === 'medium') ?'bg-orange-200/60 dark:bg-orange-600/60' : 'bg-emerald-200/60 dark:bg-emerald-600/40'} my-3`}>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white hidden md:table-cell`}>{bug?.createdAt!.substring(0,10)}</td>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white hidden lg:table-cell`}>{bug?.author}</td>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white `}>{bug?.title}</td>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white hidden lg:table-cell`}>{bug?.description}</td>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white `}>{bug?.isResolved ? 'Yes' : 'No'}</td>
                      <td className={`${fnt.text__font} py-4 px-6 text-sm font-medium text-gray-900 md:text-md lg:text-base whitespace-nowrap dark:text-white `}>{bug?.priorityStatus}</td>
                      <td className="scale-75 flex flex-col justify-center items-center">
                        <ViewButton   bugId={bug.id}/>
                        <ModifyButton bugId={bug.id} isPrivilege={currUserPrivileges.allowedToDeleteBugReport}/>
                        <DeleteButton bugId={bug.id} isPrivilege={currUserPrivileges.allowedToDeleteBugReport}/>
                      </td>
                    </tr>
                  </tbody>
                </>
              )
            })
          }
        </table>

      </main>

      <Footer />
    </div>
  )
}

export default History

export async function getServerSideProps({ req }:any) {
  const { user } = await supabase.auth.api.getUserByCookie(req)
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }
  // The JSON is stringify because of NextJS restriction on passing JSON DateTime
  const bugsList = JSON.stringify(await prisma.current_bug.findMany()) 

  const currUserPrivileges = await prisma.user.findUnique({
    where:{
      id: user.id
    },
    select:{
      allowedToModifyBugReport: true,
      allowedToDeleteBugReport: true
    }
  })
  
  return{
    props:{ bugsList, currUserPrivileges, user }
  }
}