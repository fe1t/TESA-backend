import { Accelerometer } from './models'
import Api from 'src/common/api'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Accelerometer, Api.getAccelerometer, teamId)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Accelerometer)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Accelerometer)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Accelerometer)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Accelerometer)
