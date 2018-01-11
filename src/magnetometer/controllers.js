import Api from 'src/common/api/index'
import { Magnetometer } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Magnetometer, Api.getMagnetometer, teamId)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Magnetometer)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Magnetometer)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Magnetometer)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Magnetometer)
