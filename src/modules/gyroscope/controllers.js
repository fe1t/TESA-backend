import Api from 'src/common/api/index'
import { Gyroscope } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Gyroscope, Api.getGyroscope, teamId)
export const fetchUpdate = (req, res, teamId, N) => controllerUtils.fetchUpdate(req, res, Gyroscope, Api.getRecentGyroscope, teamId, N)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Gyroscope)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Gyroscope)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Gyroscope)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Gyroscope)
