import { Person } from '@models/Person'
import { FunctionComponent } from 'react'

type Props = {
  displayText: string
  person: Pick<Person, 'name'>
}

export const OrderPerson: FunctionComponent<Props> = ({
  person,
  displayText,
}) => {
  return (
    <article className="pb-8 md:pb-9 2xl:pb-14">
      <p className="pb-3 text-paragraph-small font-bold uppercase text-gray-60 md:text-paragraph-medium">
        {displayText}
      </p>
      <p className="font-bold lg:text-h5-desktop">{person.name}</p>
    </article>
  )
}
