import { useTranslation } from 'next-i18next'
import { Roadmap } from '@models/RoadMap'
import { agroupRoadmapByDay } from '../../../utils/agroupRoadmapByDay'

type Props = {
  roadmap: Roadmap
}

const Roadmap = ({ roadmap }: Props) => {
  const { t } = useTranslation(['package-page'])

  // Don't clean, future layout already done!!!
  // const renderRoadmap = () => (
  //   <div className={''}>
  //     {roadmap?.map((item) => (
  //       <>
  //         <p
  //           className={
  //             'mb-4 mt-6 px-6 font-secondary text-paragraph-medium font-bold uppercase  tracking-widest text-white md:my-9'
  //           }
  //         >
  //           {`${item.day}º Dia`}
  //         </p>
  //         <Splide
  //           options={{
  //             drag: 'free',
  //             pagination: false,
  //             arrows: false,
  //             autoWidth: true,
  //           }}
  //         >
  //           {item.services.map((item) => (
  //             <SplideSlide key={item.title}>
  //               <div
  //                 className={
  //                   'flex w-[350px] flex-row items-center  pb-4 md:mr-4 md:w-[555px]'
  //                 }
  //                 key={item.title && 'Caminho ecologico'}
  //               >
  //                 <div className={'flex flex-row'}>
  //                   <div className={'ml-4 md:ml-7'}>
  //                     <h5
  //                       className={
  //                         'mb-2 text-paragraph-small font-bold text-white md:text-h5-mobile '
  //                       }
  //                     >
  //                       {item.title}
  //                     </h5>
  //                     <p
  //                       className={
  //                         'mb-2 text-paragraph-small text-gray-40 md:mt-2 md:text-paragraph-medium'
  //                       }
  //                     >
  //                       {item.description}
  //                     </p>
  //                     <p
  //                       className={
  //                         'font-secondary text-paragraph-small uppercase text-primary md:mt-4'
  //                       }
  //                     >
  //                       <LinkWithLocale href={'/'}>
  //                         {t('more-informations')}
  //                       </LinkWithLocale>
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </SplideSlide>
  //           ))}
  //         </Splide>
  //       </>
  //     ))}
  //   </div>
  // )
  const agroupedRoadmap = agroupRoadmapByDay(roadmap)

  return (
    <section
      className={
        'mt-9 flex flex-col justify-between gap-7 border-b-2 border-gray-80 pb-9 md:mx-11 md:mt-18 md:mb-16 md:px-0 md:pb-11 lg:flex-row xl:pb-12'
      }
    >
      <div>
        <h3
          className={
            'px-6 font-bold text-white md:px-0 lg:text-h4-desktop 2xl:text-h3-desktop'
          }
        >
          {t('itinerary-title')}
        </h3>
        <p
          className={
            'mt-2 mb-6 px-6 text-paragraph-medium text-white md:mt-4 md:px-0'
          }
        >
          {t('itinerary-subtitle')}
        </p>
      </div>
      <div
        className={'grid-flow-col grid-cols-2 md:px-0 lg:grid lg:grid-flow-row'}
      >
        {Object.keys(agroupedRoadmap).map((key: string, index) => {
          return (
            <div key={`${key}-${index}`}>
              <p
                className={
                  'mb-4 mt-6 px-6 font-secondary text-paragraph-medium font-bold uppercase tracking-widest text-white md:my-9 md:px-0'
                }
              >
                {`${key}º Dia`}
              </p>
              <div className="flex overflow-auto">
                {agroupedRoadmap[key].map((item, index) => {
                  return (
                    <div
                      key={`${item.description}-${index}`}
                      className={
                        'flex min-w-[100%] flex-row items-center  pb-4 md:mr-4 md:min-w-[350px] '
                      }
                    >
                      <div className={'flex flex-row'}>
                        <div className={'ml-6 md:ml-0'}>
                          <h5
                            className={
                              'mb-2 text-paragraph-small font-bold text-white md:text-h5-mobile '
                            }
                          >
                            {item.title}
                          </h5>
                          <p
                            className={
                              'mb-2 text-paragraph-small text-gray-40 md:mt-2 md:text-paragraph-medium'
                            }
                          >
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Roadmap
