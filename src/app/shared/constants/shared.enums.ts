export const FILTER_PAG_REGEX = /[^0-9]/g;

export enum RoleFunctions{
    Dashboard = "dashboard",
    Overview = "overview",    
    Masters = "masters",
    Reports = "report",
    Distribution = "distribution",
    LimitAndQuota = "limitandquota",
    DistributionLimit = "dist-limit",
    LimitAndQuotaLimit = "lq-limit",
    DistributionQuota = "dist-quota",
    LimitAndQuotaQuota = "lq-quota"
}