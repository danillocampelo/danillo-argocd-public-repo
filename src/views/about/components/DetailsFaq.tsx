import { BackArrowIcon } from '@assets/icons'
import styles from './styles/DetailsFaq.module.css'

type Props = {
  title: string
  summary: string
  onClick: () => void
}

export const DetailsFaq = (item: Props) => {
  return (
    <details
      className={`${styles.details} question my-6 w-full border border-gray-60 px-4 py-6 md:p-7`}
      key={item.title}
    >
      <>
        <summary
          onClick={item.onClick}
          className="flex cursor-pointer items-start justify-between"
        >
          <h6 className="flex text-paragraph-medium font-normal text-white md:text-h6-desktop">
            {item.title}
          </h6>
          <span className={'pt-6 pl-1 md:pl-7'}>
            <BackArrowIcon
              className={`rotate-icon w-6 transition-all duration-300`}
              color={'#FF6400'}
            />
          </span>
        </summary>

        <div className="mt-4 border-t border-gray-90 pt-4">
          <p className="text-paragraph-small text-gray-40 md:text-paragraph-medium">
            {item.summary}
          </p>
        </div>
      </>
    </details>
  )
}
