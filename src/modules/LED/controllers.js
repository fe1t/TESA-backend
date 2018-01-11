import Api from 'src/common/api/index'
import { LED } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, LED, Api.getLED, teamId)
export const fetchUpdate = (req, res, teamId, N) => controllerUtils.fetchUpdate(req, res, LED, Api.getRecentLed, teamId, N)
export const showAll = (req, res) => controllerUtils.showAll(req, res, LED)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, LED)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, LED)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, LED)
