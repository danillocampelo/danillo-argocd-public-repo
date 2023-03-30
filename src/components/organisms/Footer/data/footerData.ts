import { useTranslation } from 'next-i18next'
import {
  AppstoreIcon,
  GooglePlayIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'src/assets/icons'
import { FooterDataProps } from '../components/MenuItems'

export const useFooterData = () => {
  const { t } = useTranslation('footer')
  const footerData: FooterDataProps[] = [
    {
      title: t('experience'),
      subitems: [
        {
          title: t('connection'),
          link: '/',
        },
        {
          title: t('culture'),
          link: '/',
        },
        {
          title: t('adventure'),
          link: '/',
        },
        {
          title: t('fun'),
          link: '/',
        },
      ],
    },
    {
      title: t('travels'),
      subitems: [
        {
          title: t('differencial'),
          link: '/',
        },
        {
          title: t('hotels'),
          link: '/',
        },
        {
          title: t('faq'),
          link: '/',
        },
        {
          title: t('contact'),
          link: '/',
        },
      ],
    },
    {
      title: t('social-networks'),
      isExternalLink: true,
      subitems: [
        {
          title: t('twitter'),
          link: 'https://www.twitter.com',
          icon: TwitterIcon,
        },
        {
          title: t('instagram'),
          link: 'https://www.instagram.com/',
          icon: InstagramIcon,
        },
        {
          title: t('linkedin'),
          link: 'https://br.linkedin.com',
          icon: LinkedinIcon,
        },
      ],
    },
    {
      title: t('download'),
      isExternalLink: true,
      subitems: [
        {
          title: t('googleplay'),
          link: 'https://play.google.com/',
          icon: GooglePlayIcon,
        },
        {
          title: t('appstore'),
          link: 'https://www.apple.com/br/app-store/',
          icon: AppstoreIcon,
        },
      ],
    },
  ]
  return footerData
}
