import Image from 'next/future/image'
import { FunctionComponent } from 'react'
import { LogoIcon } from '@assets/icons'
import styles from './SmilesMask.module.css'

type Props = {
  isMobile: boolean
}

export const SmilesMask: FunctionComponent<Props> = ({ isMobile }) => {
  return (
    <section className="relative h-[26rem] overflow-hidden md:h-[30rem] lg:h-screen lg:w-2/3">
      <LogoIcon className="absolute z-10 m-7 text-white md:mx-13 md:my-9" />

      <Image
        src={'/assets/images/parakeet.png'}
        alt=""
        width={isMobile ? 891 : 1656}
        height={isMobile ? 507 : 1080}
        className={`top-[-50px] left-10 z-0 h-full w-full scale-150 object-cover pt-7 md:top-0 md:left-0 md:scale-100 md:pt-0`}
      />
    </section>
  )
}
