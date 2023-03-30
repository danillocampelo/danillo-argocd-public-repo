import { FunctionComponent } from 'react'
import ReactHtmlParser from 'react-html-parser'

type Props = {
  text: string
  className: string
}

const HtmlText: FunctionComponent<Props> = ({ text, className }) => (
  <article className={className}>{ReactHtmlParser(text)}</article>
)

export default HtmlText
