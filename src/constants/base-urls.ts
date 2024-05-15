import { isDevMode } from '../utils'

// Determine if the environment is development
const IS_DEV = isDevMode(window.location.host)

// Define the base API URL with fallback
const BASE_API_URL = window.__APP__.BASE_API_URL || 'api-jobseeker.site'

// Define the prefix based on environment
const PREFIX = IS_DEV ? 'https://dev.' : 'https://'

// Function to generate API URLs
const generate = (service: string) => `${PREFIX}${service}.${BASE_API_URL}`

// Define master data API URLs
export const API_AUTH_BASE_URL = `https://auth.${BASE_API_URL}`
export const API_MASTER_BASE_URL = `https://master.${BASE_API_URL}`

// Define other API URLs using the generate function
export const API_ORGANIZATION_BASE_URL = generate('basic-organization')
export const API_VACANCY_BASE_URL = generate('basic-vacancy')
export const API_EMPLOYEE_BASE_URL = generate('basic-employee')
export const API_ATTENDANCE_BASE_URL = generate('basic-attendance')
export const API_APPLICANT_BASE_URL = generate('basic-applicant')
export const API_CANDIDATE_BASE_URL = generate('basic-candidate')
export const API_PROCESS_BASE_URL = generate('basic-process')
export const API_S3_BASE_URL = generate('basic-s3')
export const API_PAYROLL_BASE_URL = generate('basic-payroll')
export const API_CMS_BASE_URL = generate('basic-cms')
export const API_REPORT_BASE_URL = generate('basic-report')
export const API_DASHBOARD_BASE_URL = generate('basic-dashboard')
export const API_CANDIDATE_EXPLORE_BASE_URL = generate('candidate')
export const API_NOTIFICATION_BASE_URL = generate('basic-notification')
