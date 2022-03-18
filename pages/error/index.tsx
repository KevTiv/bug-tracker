import { NextPage } from 'next'
import styles from '../../styles/Component.module.scss'
import fnt from '../../styles/Fonts.module.scss'

import Head from 'next/head'
import Image from 'next/image'
import { ErrSVG } from '../../utils/svg'
import Footer from '../../components/footer'

const Error: NextPage = () => {

  return (
      <>
        <div className={`${styles.container} dark:text-white flex flex-col justify-between`}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/bug.ico" />
            </Head>

            <main className={styles.main}>
                <div className="relative w-full flex justify-center items-center">
                    <span className={`${fnt.title__font} absolute flex justify-center items-center text-7xl top-[11.5rem] md:top-[5.5rem] md:text-8xl -translate-x-6 md:-translate-x-10 lg:-translate-x-8 scale-[2]`}>
                        <span>o</span>
                        <span>o</span>
                        <span>p</span>
                        <span>s</span>
                        <span>!</span>
                    </span>
                    <span className={`${fnt.title__font} absolute flex justify-center items-center text-4xl md:text-6xl lg:text-8xl bottom-12 md:bottom-10 lg:bottom-60`}>
                        <span className="mx-2">Something</span>
                        <span className="mx-2">went</span>
                        <span className="mx-2">wrong</span>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </span>
                    <span className="relative h-[90vh] scale-50 md:scale-75 lg:scale-100 mt-16 lg:mt-20">
                        <span className="absolute text-2xl top-[25%] lg:top-[16%] left-[18%] dark:text-black">Please contact <b>tivertc.kevin@outlook.com</b></span>
                        <span className="my-8">
                            <ErrSVG/>
                        </span>
                    </span>
                    
                </div>
            </main>

            <Footer />
        </div>
      </>
    
  )
}

export default Error

