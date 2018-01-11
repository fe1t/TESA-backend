import Api from 'src/common/api/index'
import { Pressure } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Pressure, Api.getPressure, teamId)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Pressure)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Pressure)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Pressure)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Pressure)
