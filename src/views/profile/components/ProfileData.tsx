import Button from '@components/atoms/Button'
import { User } from '@models/User'
import { useTranslation } from 'next-i18next'
import { UserMutation } from './MenuProfileScreen'
import { GreetingCard } from './GreetingCard'
import { ROUTES } from '@utils/constants/routes'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { Themes } from '@utils/constants/theme'
import { changeLocationHref } from '@utils/changeLocationHref'

type Props = {
  userMutation: UserMutation
  userData: User
}
interface InputData extends InputTranslateText {
  nameForm: string
  mask?: string
  defaultValue?: string
}

type InputTranslateText = {
  label: string
  placeholder?: string
}

export const ProfileData = ({ userMutation, userData }: Props) => {
  // const [showSaveButton, setShowSaveButton] = useState(false)
  // const [form] = Form.useForm()
  const { t } = useTranslation('profile-page')
  // const userInputsTranslatedText = t('personal-data-inputs', {
  //   returnObjects: true,
  // }) as { [inputName: string]: InputTranslateText }
  // const addressInputsTranslatedtext = t('address-input', {
  //   returnObjects: true,
  // }) as { [inputName: string]: InputTranslateText }

  // const buildInputData = (
  //   item: { nameForm: string },
  //   inputTranslateText: { [inputName: string]: InputTranslateText },
  // ) => ({
  //   ...item,
  //   ...inputTranslateText[item.nameForm],
  // })

  // const userInputData = userRenderData(userData)

  // const USER_INPUTS_DATA: InputData[] = userInputData.USER_INPUT_NAMES.map(
  //   (item) => buildInputData(item, userInputsTranslatedText),
  // )

  // const ADDRESS_INPUTS_DATA: InputData[] =
  //   userInputData.ADDRESS_INPUT_NAMES.map((item) =>
  //     buildInputData(item, addressInputsTranslatedtext),
  //   )

  // const { address } = userData

  // const checkCep = (e: ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   if (!value && value.length >= 9) return
  //   const cep = value.replace(/\D/g, '')
  //   fetch(`https://viacep.com.br/ws/${cep}/json/`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       form.setFieldValue(
  //         'address',
  //         !!address ? address.address : data.logradouro,
  //       )
  //       form.setFieldValue(
  //         'district',
  //         !!address ? address.district : data.bairro,
  //       )
  //       form.setFieldValue('state', !!address ? address.state : data.uf)
  //       form.setFieldValue('city', !!address ? address.city : data.localidade)
  //     })
  //     .catch((err) => console.log(err))
  // }

  // const checkValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setShowSaveButton(!!e.target.value)
  // }

  // const handleFormSubmit = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       userMutation(values)
  //     })
  //     .catch((errorInfo) => {
  //       console.log({ errorInfo })
  //     })
  // }

  return (
    <main className={'px-4 pb-10 pt-8 md:ml-9 md:pt-12 '}>
      <GreetingCard userData={userData} />
      <Button
        buttonType={'primary'}
        theme={Themes.dark}
        title="Editar Perfil"
        className="button-small mt-8"
        onClick={() => {
          changeLocationHref(ROUTES.editProfile())
        }}
      >
        {t('edit-profile')}
      </Button>

      {/* <section>
        <Form form={form}>
          <>
            <h5 className="my-8 font-primary font-semibold md:mt-16 2xl:text-h4-desktop">
              {t('personal-data')}
            </h5>
            <div className={'md:flex md:flex-row md:flex-wrap'}>
              {USER_INPUTS_DATA.map((item) => (
                <div
                  className={'mt-6 md:mr-16 md:mb-8 '}
                  key={item.placeholder}
                >
                  <Form.Item name={`${item.nameForm}`}>
                    <Input
                      label={item.label}
                      placeholder={item.placeholder}
                      onChange={(e) => checkValue(e)}
                      defaultValue={item.defaultValue}
                      maskProps={item.mask ? { mask: item.mask } : undefined}
                    />
                  </Form.Item>
                </div>
              ))}
            </div>
          </>

          {showSaveButton && (
            <div className={'md:mt-6'}>
              <Button
                type={'submit'}
                buttonType="primary"
                onClick={handleFormSubmit}
              >
                {t('save-button')}
              </Button>
            </div>
          )}
          <div className={'my-10 h-1 w-full bg-gray-10 md:my-18 md:w-full'} />

          <h5 className="my-8 font-primary font-semibold 2xl:text-h4-desktop">
            {t('address')}
          </h5>
          <div className={'mt-6 md:flex md:flex-row md:flex-wrap'}>
            <Form.Item name={'district'}>
              <Input
                label={'CEP'}
                id={'discrict'}
                onBlur={checkCep}
                placeholder={'00000-000'}
                onChange={checkValue}
                defaultValue={userData.cpf}
                maskProps={{ mask: '00000-000' }}
                className={'md:mr-13'}
              />
            </Form.Item>
            {ADDRESS_INPUTS_DATA.map((item) => (
              <>
                <div className={'md:mr-13 md:mb-8'}>
                  <Form.Item name={`${item.nameForm}`} key={item.placeholder}>
                    <Input
                      label={item.label}
                      id={`${item.nameForm}`}
                      placeholder={item.placeholder}
                      onChange={checkValue}
                      defaultValue={item.defaultValue}
                      maskProps={item.mask ? { mask: item.mask } : undefined}
                    />
                  </Form.Item>
                </div>
              </>
            ))}
          </div>
        </Form>
      </section> */}
    </main>
  )
}
