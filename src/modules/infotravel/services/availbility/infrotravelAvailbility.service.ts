import {forwardRef} from '@nestjs/common'
import {Inject, Injectable} from '@nestjs/common/decorators'
import {isArray} from 'class-validator'
import {verifyOccupancy} from '~/helpers/veryOccupancy'
import {AvailbilityQueryDTO} from '~/modules/packages/dto/package.hotels.rooms.dto'
import {PackageType} from '../../constants/constant'
import {InfotravelService} from '../../infotravel.service'
import {
  PackageAvailResponse,
  PackageDetailsResponse,
} from './entities/packageAvailbility.entity'
import * as dayjs from 'dayjs'

@Injectable()
export class InfrotavelAvailbilityService {
  private readonly basePath = '/avail'

  constructor(
    @Inject(forwardRef(() => InfotravelService))
    private readonly infotravelService: InfotravelService,
  ) {}

  private mockResult = JSON.parse(
    '{"packageAvails":[{"hotelAvails":[{"provider":"OMNIBEES","checkIn":"2023-02-10","checkOut":"2023-02-13","hotel":{"id":827306,"keyDetail":"ODI3MzA2IzEwIzI0NDM=","name":"WishFozdoIguaçu","address":{"address":"AvenidadasCataratas,6845\\r\\nFozdoIguaçu","coordinates":{"latitude":-25.59806,"longitude":-54.50722}},"stars":5.0,"images":[{"large":"https://media.omnibees.com/Images/2443/Property/649600.jpg","medium":"https://media.omnibees.com/Images/2443/Property/649600.jpg","small":"https://media.omnibees.com/Images/2443/Property/649600.jpg"}],"facilityIds":[29,16,2,3,24,51,13,14,12,9,15,1,8,32,34,10,21,17,6]},"roomGroups":[{"rooms":[{"key":"195ISW3PU%STITUHITE","roomType":{"code":"7719","name":"Superior","description":"Ambienteacolhedordefácilacessoàsáreassociais.Acomodaaté2pessoas.22m2\\r-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora","price":{"currency":"BRL","amount":2901.6,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2176.2}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":108.81}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Cafédamanhã"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":725.4}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]},{"key":"195ISW3PU%SDSG2MRCD","roomType":{"code":"7719","name":"Superior","description":"Ambienteacolhedordefácilacessoàsáreassociais.Acomodaaté2pessoas.22m2\\r-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora-Map","price":{"currency":"BRL","amount":3430.8,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2573.1}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":128.66}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Meiapensão"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":857.7}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]},{"key":"195ISW3PU%QY6WGF3JL","roomType":{"code":"24373","name":"Premiere","description":"OacolhedorapartamentoPremiere,com37m²,éidealparaumcasal.Aacomodaçãocomportaaté2pessoas.-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora","price":{"currency":"BRL","amount":3626.99,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2720.24}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":136.01}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Cafédamanhã"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":906.7466666667}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]},{"key":"195ISW3PU%O03QZVO4B","roomType":{"code":"24373","name":"Premiere","description":"OacolhedorapartamentoPremiere,com37m²,éidealparaumcasal.Aacomodaçãocomportaaté2pessoas.-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora-Map","price":{"currency":"BRL","amount":4156.19,"exchange":1.0},"priceNet":{"currency":"BRL","amount":3117.14}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":155.86}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Meiapensão"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":1039.0466666667}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]},{"key":"195ISW3PU%B1SE51YG3","roomType":{"code":"7992","name":"SuiteJunior","description":"Espaçoperfeitodivididoem2cômodos,asuítetem40m2eacomodaaté2pessoas.-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora","price":{"currency":"BRL","amount":4352.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":3264.3}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":163.22}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Cafédamanhã"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":1088.1}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]},{"key":"195ISW3PU%I1M0ZNE32","roomType":{"code":"7992","name":"SuiteJunior","description":"Espaçoperfeitodivididoem2cômodos,asuítetem40m2eacomodaaté2pessoas.-InternetWi-fi-EstacionamentoCortesia"},"fares":[{"type":"FARE","description":"Operadora-Map","price":{"currency":"BRL","amount":4881.6,"exchange":1.0},"priceNet":{"currency":"BRL","amount":3661.2}},{"type":"SERVICE_CHARGE","description":"Taxas","price":{"currency":"BRL","amount":183.06}},{"type":"PROMOTION_DISCOUNT","code":"LastMinute","description":"LastMinute","price":{"currency":"BRL","amount":0.0}}],"boardType":{"name":"Meiapensão"},"cancellationPolicies":{"refundable":true,"penalties":[{"from":"2023-01-28T00:00:00.000-03:00","description":"Multadecancelamento","price":{"currency":"BRL","amount":1220.4}}]},"checkIn":"2023-02-10","checkOut":"2023-02-13","available":true,"names":[{"age":30,"roomNumber":1,"type":"ADT"},{"age":30,"roomNumber":1,"type":"ADT"}]}]}]}],"flightAvails":[{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%VIB73EYOW","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","number":"1172","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1172","departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":1866.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1399.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%VOHVHLVYL","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","number":"1177","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1177","departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":1866.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1399.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%KGMNG18BU","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","number":"1172","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1172","departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":1866.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1399.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%6C738W9QU","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","number":"1171","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1171","departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":1866.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1399.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%MSVH5NSCG","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","number":"1172","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1172","departure":"2023-02-10T15:45:00.000-03:00","arrival":"2023-02-10T17:30:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":2273.07,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1704.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%QYQX7YPRQ","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","number":"1361","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1361","departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","classCode":"A","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":2273.07,"exchange":1.0},"priceNet":{"currency":"BRL","amount":1704.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%9ZDBDO3TO","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","number":"1388","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1388","departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","classCode":"W","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3450.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2587.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%KZDJQTBGF","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","number":"1177","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1177","departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3450.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2587.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%II3QUGWYQ","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","number":"1388","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1388","departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","classCode":"W","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3450.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2587.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%S50NUTHND","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","number":"1171","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1171","departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3450.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2587.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%3LHDOWLXH","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","number":"1170","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1170","departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","classCode":"J","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3671.73,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2753.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%H5HVQGB4Q","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","number":"1177","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1177","departure":"2023-02-13T15:35:00.000-03:00","arrival":"2023-02-13T17:15:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3671.73,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2753.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%4BTPFTNJN","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","number":"1170","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1170","departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","classCode":"J","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3671.73,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2753.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%O6LZJU6OE","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","number":"1171","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1171","departure":"2023-02-13T18:10:00.000-03:00","arrival":"2023-02-13T19:55:00.000-03:00","classCode":"N","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3671.73,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2753.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%WKIST99MS","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","number":"1388","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1388","departure":"2023-02-10T21:55:00.000-03:00","arrival":"2023-02-10T23:40:00.000-03:00","classCode":"W","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3857.07,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2892.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%DGKRX6YGP","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","number":"1361","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1361","departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","classCode":"A","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":3857.07,"exchange":1.0},"priceNet":{"currency":"BRL","amount":2892.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"routes":[{"numberRoute":1,"flights":[{"key":"RKZNSRIOV%YJS5PC4PX","airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","number":"1170","duration":"01:45","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"destination":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"number":"1170","departure":"2023-02-10T10:20:00.000-03:00","arrival":"2023-02-10T12:05:00.000-03:00","classCode":"J","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":4078.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":3058.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":59.26}}]}]},{"numberRoute":2,"flights":[{"key":"RKZNSRIOV%UPSQRAM3K","airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","number":"1361","duration":"01:40","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"IGU","name":"CATARATASINTERNATIONALAIRPORT","city":{"name":"FozdoIguaçu","country":{"code":"BR","name":""}}},"destination":{"code":"GRU","name":"GUARULHOS-GOVERNADORANDRÉFRANCOMONTOROINTERNATIONALAIRPORT","city":{"name":"SãoPaulo","country":{"code":"BR","name":""}}},"number":"1361","departure":"2023-02-13T06:40:00.000-03:00","arrival":"2023-02-13T08:20:00.000-03:00","classCode":"A","baggage":{"quantity":0},"class":"ECONOMIC"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":4078.4,"exchange":1.0},"priceNet":{"currency":"BRL","amount":3058.8}},{"type":"BOARDING_RATE","description":"taxas","price":{"currency":"BRL","amount":77.72}}]}]}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]}],"servicePackageAvails":[{"servicePackage":{"key":"QOT6WZBZ2%DWGVLPRPG","code":"15","name":"TrasladoChegadaeSaídaFoz","date":"2023-02-10T00:00:00.000-03:00","description":"TrasladoAeroporto/Hotel/Aeroporto","unique":false},"fares":[{"type":"FARE","price":{"currency":"BRL","amount":1000.0,"exchange":1.0},"priceNet":{"currency":"BRL","amount":750.0}}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]}],"tourAvails":[{"tour":{"key":"QOT6WZBZ2%2YN5Z2VAN","name":"CataratasArgentina","code":"25","date":"2023-02-10T00:00:00.000-03:00","description":"descritivopasseio","unique":false},"fares":[{"type":"FARE","price":{"currency":"BRL","amount":533.33,"exchange":1.0},"priceNet":{"currency":"BRL","amount":400.0}}],"names":[{"age":30,"type":"ADT"},{"age":30,"type":"ADT"}]},{"tour":{"key":"QOT6WZBZ2%R1HJZN7Q7","name":"PasseiodeHelicópteropelasCataratasBrasileiras","code":"24","date":"2023-02-10T00:00:00.000-03:00","description":"descritivopasseio","unique":true},"fares":[{"type":"FARE","price":{"currency":"BRL","amount":6000.0,"exchange":1.0},"priceNet":{"currency":"BRL","amount":4500.0}}],"names":[]}],"package":{"key":"TQVOIB72I%LFJBIYX91","id":102,"name":"EXPERIÊNCIAFOZDOIGUAÇU","description":"<pstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"color:rgb(124,124,124);font-weight:bold;font-family:Arial;font-size:small;\\">Inclui:</span></p><divstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0.31in;text-indent:-0.31in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"font-family:Arial;font-size:small;\\">•<spanstyle=\\"color:rgb(124,124,124);\\">Aéreoidaevolta(viaIGU);</span></span></div><divstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0.31in;text-indent:-0.31in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"font-family:Arial;font-size:small;\\">•<spanstyle=\\"color:rgb(124,124,124);\\">03noitesdehospedagemcomcafédamanhãBelmontou</span><spanstyle=\\"color:rgb(124,124,124);\\">Wish</span><spanstyle=\\"color:rgb(124,124,124);\\">Resort;</span></span></div><divstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0.31in;text-indent:-0.31in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"font-family:Arial;font-size:small;\\">•<spanstyle=\\"color:rgb(124,124,124);\\">TransporteprivativoAeroportoFozdoIguaçu/Hotel/AeroportoFozdoIguaçu;</span></span></div><divstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0.31in;text-indent:-0.31in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"font-family:Arial;font-size:small;\\">•<spanstyle=\\"color:rgb(124,124,124);\\">PasseioHelicópteroCataratasBrasileirascomtransporte;</span></span></div><divstyle=\\"font-family:Arial,Verdana;font-size:10pt;font-style:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-weight:normal;line-height:150%;margin-top:0pt;margin-bottom:0pt;margin-left:0.31in;text-indent:-0.31in;direction:ltr;unicode-bidi:embed;word-break:normal;\\"><spanstyle=\\"font-family:Arial;font-size:small;\\">•<spanstyle=\\"color:rgb(124,124,124);\\">PasseioCataratasArgentina;</span></span></div><spanstyle=\\"font-family:Arial;font-size:small;text-indent:-29.76px;\\">•</span><fontcolor=\\"#7c7c7c\\"face=\\"Arial\\"size=\\"2\\">JantarArgentinaExperiência.</font>","observation":"","origin":"SãoPaulo,RegiãoSudeste,Brasil","destination":"FozdoIguaçu,RegiãoSul,Brasil","days":4,"nights":3,"start":"2023-02-10","end":"2023-02-13"}}]}',
  )
  async getPackageAvailbility(
    params: AvailbilityQueryDTO,
    packageType: PackageType = PackageType.HOTEL_FLIGHT,
  ): Promise<PackageAvailResponse> {
    const queryParams = {
      start: params.startDate,
      /* TODO: remove END param */
      end: params.endDate,
      origin: params.origin,
      originIata: params.originIata,
      originType: params.originType,
      destination: params.destination,
      destinationType: params.destinationType,
      packageId: params.id,
      client: params.clientId,
      occupancy: params.occupancy,
    }

    let ocuppancyParam
    if (isArray(queryParams.occupancy)) {
      ocuppancyParam = params.occupancy.reduce(
        (a, b) => 'occupancy=' + a + '&occupancy' + b,
      )
    } else {
      ocuppancyParam = `occupancy=${params.occupancy}`
    }

    const path = `${this.basePath}/package/${packageType}?start=${queryParams.start}&origin=${queryParams.origin}&destination=${queryParams.destination}&destinationType=${queryParams.destinationType}&packageId=${queryParams.packageId}&client=${queryParams.client}&${ocuppancyParam}&originIata=${queryParams.originIata}&originType=${queryParams.originType}`

    return await this.infotravelService.get<PackageAvailResponse>(path)
  }

  async getPackageDetails(id: number) {
    return await this.infotravelService.get<PackageDetailsResponse>(
      `/package/${id}`,
    )
  }

  async AvailbilityHotel(params: {
    start: any
    end: any
    occupancy: any
    destination?: any
    hotel?: any
    idHotelList?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(`/avail/hotel/`, searchParams)
  }

  async availbilityActivity(params: {
    start: any
    end: any
    occupancy: any
    destination: any
    destinationType?: any
    serviceOther?: any
    packageId?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(`/avail/activity/`, searchParams)
  }

  async availbilityService(params: {
    start: any
    end: any
    occupancy: any
    destination: any
    destinationType?: any
    servicePackage?: any
    packageId?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(
      `/avail/servicePackage/`,
      searchParams,
    )
  }

  async availbilityTickets(params: {
    start: any
    end: any
    occupancy: any
    destination: any
    destinationType?: any
    ticket?: any
    packageId?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(`/avail/ticket/`, searchParams)
  }
  async availbilityFlights(params: {
    start: any
    end?: any
    origin: any
    destination: any
    occupancy: any
    baggage?: any
    flightClass?: any
    stops?: any
    airlines?: any
    maxConnectionTime?: any
    isCombinedFlight?: any
    nationality?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(`/avail/flight/`, searchParams)
  }

  async availbilityServiceOthers(params: {
    start: any
    end: any
    occupancy: any
    destination: any
    destinationType?: any
    serviceOther?: any
    packageId?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(
      `/avail/serviceOther/`,
      searchParams,
    )
  }

  async AvailbilityTransfers(params: {
    start: any
    end: any
    occupancy: any
    origin: any
    originType?: 'M' | string
    destination: any
    destinationType?: any
    hourStart?: any
    hourEnd?: any
    type: 'ROUND_TRIP' | 'ONE_WAY'
    servicePackage?: any
    packageId?: any
    coupon?: any
    client?: any
  }): Promise<any | {message: 'No availability'}> {
    const searchParams = verifyOccupancy(params)
    return await this.infotravelService._get(`/avail/transfer/`, searchParams)
  }

  async getPackageDefaultAvailability({
    destionationType,
    destinationId,
    packageId,
    clientId,
    configService,
  }) {
    return this.getPackageAvailbility({
      origin: configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN') || 8253,
      originIata:
        configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_IATA') || 'GRU',
      originType:
        configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_TYPE') || 'A',
      startDate:
        configService.get('INFOTERA_PACKAGE_DEFAULT_START_DATE') ||
        '2023-04-01',
      occupancy: configService.get('INFOTERA_PACKAGE_DEFAULT_OCCUPANCY') || 2,
      destination: destinationId,
      destinationType: destionationType,
      id: packageId,
      clientId: clientId ?? configService.get('USER_INFOTRAVEL_DEFAULT'),
    })
  }

  public createPackageDefaultAvailabilityParams({
    destionationType,
    destinationId,
    packageId,
    clientId,
    configService,
  }) {
    const START_DATE_ADDITION = 2
    return {
      origin: configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN') || 8253,
      originIata:
        configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_IATA') || 'GRU',
      originType:
        configService.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_TYPE') || 'A',
      startDate:
        dayjs().add(START_DATE_ADDITION, 'M').format() ||
        configService.get('INFOTERA_PACKAGE_DEFAULT_START_DATE') ||
        '2023-04-01',
      occupancy: configService.get('INFOTERA_PACKAGE_DEFAULT_OCCUPANCY') || 2,
      destination: destinationId,
      destinationType: destionationType,
      id: packageId,
      clientId: clientId ?? configService.get('USER_INFOTRAVEL_DEFAULT'),
    }
  }
}
