import prisma from '../../prisma'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from '../../styles/Home.module.scss'
import supabase from '../../supabaseLib'
import { bugType, userMetadataType } from '../../type'
import Form from '../../components/forms'

const update: NextPage = ({bugInfo, allUserList, currUser}:any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [bug, setBug] = useState<bugType>()
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setBug(JSON.parse(bugInfo))
  },[])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {/* <h1>update</h1> */}
        <Form isNewBug={false} id={bug?.id} title={bug?.title} description={bug?.description} location={bug?.location}
          processToReplicate={bug?.processToReplicate} priorityStatus={bug?.priorityStatus} author={bug?.author}
          isResolved={bug?.isResolved} resolvedBy={bug?.resolvedBy} url={bug?.url} allUser={JSON.parse(allUserList)}
          currUserMetadata={currUser}/>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default update

export async function getServerSideProps({ req, query }:any) {
    
  const { user } = await supabase.auth.api.getUserByCookie(req)
  
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/', permanent: false } }
  }

  // The JSON is stringify because of NextJS restriction on passing JSON DateTime
  const bugInfo = JSON.stringify(await prisma.current_bug?.findUnique({
      where:{
          id: parseInt(query.bug)
      }
  }))
  const allUserList = JSON.stringify(await prisma.user?.findMany())
  const currUser = await prisma.user?.findUnique({
    where:{ 
      id:user.id
    }
  })
  
  return{
    props:{ bugInfo, allUserList, currUser }
  }
}