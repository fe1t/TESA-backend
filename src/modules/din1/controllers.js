import Api from 'src/common/api/index'
import { Din1 } from './models'
import controllerUtils from 'common/utils/controllers'

export const fetch = (req, res, teamId) => controllerUtils.fetch(req, res, Din1, Api.getDin1, teamId)
export const fetchUpdate = (req, res, teamId, N) => controllerUtils.fetchUpdate(req, res, Din1, Api.getRecentDin1, teamId, N)
export const showAll = (req, res) => controllerUtils.showAll(req, res, Din1)
export const showLastTwenty = (req, res) => controllerUtils.showLastTwenty(req, res, Din1)
export const filterByHourAgo = req => controllerUtils.filterByHourAgo(req, Din1)
export const filterByTimeRange = (req, res) => controllerUtils.filterByTimeRange(req, res, Din1)
