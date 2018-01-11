import Api from 'src/common/api/index'
import { Humidity } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Humidity, Api.getHumidity, teamId)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Humidity)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Humidity)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Humidity)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Humidity)
