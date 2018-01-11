import Api from 'src/common/api/index'
import { Humidity } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Humidity, Api.getHumidity, teamId)
export const fetchUpdate = (req, res, teamId, N) => controllerUtils.fetchUpdate(req, res, Humidity, Api.getRecentHumidity, teamId, N)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Humidity)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Humidity)
export const filterByTimeAgo = req => controllerUtils.filterByTimeAgo(req, Humidity)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Humidity)
