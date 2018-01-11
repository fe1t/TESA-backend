import Api from 'src/common/api/index'
import { Temperature } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Temperature, Api.getTemperature, teamId)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Temperature)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Temperature)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Temperature)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Temperature)
