import {HttpModule} from '@nestjs/axios'
import {HttpServer, INestApplication} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Test} from '@nestjs/testing'
import request from 'supertest'
import {ExperiencesController} from './experiences.controller'
import {ExperiencesRepository} from './experiences.repository'
import {ExperiencesService} from './experiences.service'
import {experienceMock} from './mocks/experience.service'

describe('ExperiencesController', () => {
  let app: INestApplication
  let httpServer: HttpServer

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [ExperiencesController],
      providers: [ExperiencesService, ConfigService, ExperiencesRepository],
    }).compile()

    app = testingModule.createNestApplication()
    httpServer = app.getHttpAdapter().getInstance()

    await app.init()
  })

  describe('/experiences - (GET)', () => {
    it('get a experience successfully', async () => {
      const {body, status} = await request(httpServer).get('/experiences/1')
      expect(status).toBe(200)
      expect(body.id).toStrictEqual(experienceMock)
    })

    it('get a experience fails', async () => {
      await request(httpServer).get('/experiences/1').expect(404)
    })

    it('get a experience with non-existent id', async () => {
      await request(httpServer).get('/experiences/0').expect(200).expect([])
    })
  })

  afterAll(async () => app.close())
})
