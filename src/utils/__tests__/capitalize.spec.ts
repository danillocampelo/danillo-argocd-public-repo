import { capitalize } from '@utils/capitalize'

describe('capitilize letters util', () => {
  it('should transform to uppercase the first letter of each word', () => {
    const testText = 'Testando TUDO que iSSo devEria fazer'

    expect(capitalize(testText)).toBe('Testando Tudo Que Isso Deveria Fazer')
  })
})
