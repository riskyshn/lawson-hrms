// import { isDevMode } from '../utils'

// Determine if the environment is development
// const IS_DEV = isDevMode(window.location.host)

// Define the base API URL with fallback
const { BASE_API_URL } = window.__APP__

// Define the prefix based on environment
// const PREFIX = IS_DEV ? 'https://dev.' : 'https://'
const PREFIX = 'https://'

// Function to generate API URLs
const generate = (service: string) => `${PREFIX}${service}.${BASE_API_URL}`

// Define master data API URLs
export const API_AUTH_URL = import.meta.env.VITE_API_AUTH_URL || `https://auth.${BASE_API_URL}`
export const API_MASTER_URL = import.meta.env.VITE_API_MASTER_URL || `https://master.${BASE_API_URL}`

// Define other API URLs using the generate function
export const API_ORGANIZATION_URL = import.meta.env.VITE_API_ORGANIZATION_URL || generate('basic-organization')
export const API_VACANCY_URL = import.meta.env.VITE_API_VACANCY_URL || generate('basic-vacancy')
export const API_EMPLOYEE_URL = import.meta.env.VITE_API_EMPLOYEE_URL || generate('basic-employee')
export const API_ATTENDANCE_URL = import.meta.env.VITE_API_ATTENDANCE_URL || generate('basic-attendance')
export const API_APPLICANT_URL = import.meta.env.VITE_API_APPLICANT_URL || generate('basic-applicant')
export const API_CANDIDATE_URL = import.meta.env.VITE_API_CANDIDATE_URL || generate('basic-candidate')
export const API_PROCESS_URL = import.meta.env.VITE_API_PROCESS_URL || generate('basic-process')
export const API_S3_URL = import.meta.env.VITE_API_S3_URL || generate('basic-s3')
export const API_PAYROLL_URL = import.meta.env.VITE_API_PAYROLL_URL || generate('basic-payroll')
export const API_CMS_URL = import.meta.env.VITE_API_CMS_URL || generate('basic-cms')
export const API_REPORT_URL = import.meta.env.VITE_API_REPORT_URL || generate('basic-report')
export const API_DASHBOARD_URL = import.meta.env.VITE_API_DASHBOARD_URL || generate('basic-dashboard')
export const API_CANDIDATE_EXPLORE_URL = import.meta.env.VITE_API_CANDIDATE_EXPLORE_URL || generate('candidate')
export const API_NOTIFICATION_URL = import.meta.env.VITE_API_NOTIFICATION_URL || generate('basic-notification')
