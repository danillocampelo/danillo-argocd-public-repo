type Props = {
  data: {
    title: string
    description: string
  }[]
}

const Trivia = ({ data }: Props) => {
  return (
    <ul className={`w-full text-white md:flex-col`}>
      {data.map((item) => {
        return [
          <li
            key={item.title}
            className="mb-11 border-b border-b-white-bone pb-4 last:mb-0 md:pb-9"
          >
            <div className={`flex w-full items-end justify-between`}>
              <h2 className="font-light xl:text-h1-desktop">{item.title}</h2>
              <h5
                className={`text-right text-paragraph-medium font-normal tracking-[-0.005rem] md:text-h6-desktop`}
              >
                {item.description}
              </h5>
            </div>
          </li>,
        ]
      })}
    </ul>
  )
}

export default Trivia
