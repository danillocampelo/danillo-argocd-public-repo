import {HttpModule} from '@nestjs/axios'
import {HttpServer, INestApplication} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Test} from '@nestjs/testing'
import request from 'supertest'
import {packageMock} from './mocks/package.service'
import {PackageController} from './package.controller'
import {PackageRepository} from './package.repository'
import {PackageService} from './package.service'

describe('PackagesController', () => {
  let app: INestApplication
  let httpServer: HttpServer

  beforeAll(async () => {
    const testingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [PackageController],
      providers: [PackageService, ConfigService, PackageRepository],
    }).compile()

    app = testingModule.createNestApplication()
    httpServer = app.getHttpServer()

    await app.init()
  })

  describe('/packages - (GET)', () => {
    it('get a package successfully', async () => {
      const {body, status} = await request(httpServer).get('/packages/1')
      expect(status).toBe(200)
      expect(body).toStrictEqual(packageMock)
    })
    it('get a package fails', async () => {
      await request(httpServer).get('/packages').expect(404)
    })
    it('get a package with non-existent id', async () => {
      await request(httpServer).get('/packages/0').expect(200).expect([])
    })
  })

  afterAll(async () => app.close())
})
