import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { useSearchParams } from 'react-router-dom'
import Table from '../components/Table'

const ReportPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined

  const dummyData = [
    {
      employeeId: 'EMP001',
      employee: {
        name: 'John Doe',
        employeeCode: 'EMP001',
        employment: {
          department: {
            name: 'Sales',
          },
          branch: {
            name: 'Main Branch',
          },
        },
        attendance: {
          date: '2024-04-15',
          branch: 'Main Branch',
          schedule: {
            checkin: '09:00 AM',
            checkout: '06:00 PM',
          },
          clockin: '09:10 AM',
          clockout: '06:15 PM',
          clientvisitin: '11:00 AM',
          clientvisitout: '01:00 PM',
          overtimein: '06:15 PM',
          overtimeout: '07:00 PM',
          totalovertime: '45 mins',
          location: {
            lng: -80.1918,
            lat: 25.7617,
          },
          attachment: 'https://images.pexels.com/photos/3182779/pexels-photo-3182779.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        title: 'Sales Manager',
        phone: '+1 305-123-4567',
        email: 'john.doe@example.com',
        location: 'Miami, FL',
      },
    },
    {
      employeeId: 'EMP002',
      employee: {
        name: 'Jane Smith',
        employeeCode: 'EMP002',
        employment: {
          department: {
            name: 'Marketing',
          },
          branch: {
            name: 'East Branch',
          },
        },
        attendance: {
          date: '2024-04-15',
          branch: 'East Branch',
          schedule: {
            checkin: '09:30 AM',
            checkout: '06:30 PM',
          },
          clockin: '09:35 AM',
          clockout: '06:35 PM',
          clientvisitin: '10:30 AM',
          clientvisitout: '12:30 PM',
          overtimein: '06:35 PM',
          overtimeout: '07:15 PM',
          totalovertime: '40 mins',
          location: {
            lng: -74.006,
            lat: 40.7128,
          },
          attachment: 'https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        title: 'Marketing Coordinator',
        phone: '+1 212-123-4567',
        email: 'jane.smith@example.com',
        location: 'New York City, NY',
      },
    },
    {
      employeeId: 'EMP003',
      employee: {
        name: 'Michael Brown',
        employeeCode: 'EMP003',
        employment: {
          department: {
            name: 'Engineering',
          },
          branch: {
            name: 'West Branch',
          },
        },
        attendance: {
          date: '2024-04-15',
          branch: 'West Branch',
          schedule: {
            checkin: '08:00 AM',
            checkout: '05:00 PM',
          },
          clockin: '08:05 AM',
          clockout: '05:05 PM',
          clientvisitin: 'None',
          clientvisitout: 'None',
          overtimein: '05:05 PM',
          overtimeout: '06:00 PM',
          totalovertime: '55 mins',
          location: {
            lng: -118.2437,
            lat: 34.0522,
          },
          attachment: 'https://images.pexels.com/photos/3183177/pexels-photo-3183177.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        title: 'Software Engineer',
        phone: '+1 213-123-4567',
        email: 'michael.brown@example.com',
        location: 'Los Angeles, CA',
      },
    },
    {
      employeeId: 'EMP004',
      employee: {
        name: 'Emily Johnson',
        employeeCode: 'EMP004',
        employment: {
          department: {
            name: 'Human Resources',
          },
          branch: {
            name: 'North Branch',
          },
        },
        attendance: {
          date: '2024-04-15',
          branch: 'North Branch',
          schedule: {
            checkin: '10:00 AM',
            checkout: '07:00 PM',
          },
          clockin: '10:05 AM',
          clockout: '07:05 PM',
          clientvisitin: 'None',
          clientvisitout: 'None',
          overtimein: '07:05 PM',
          overtimeout: '07:45 PM',
          totalovertime: '40 mins',
          location: {
            lng: -71.0589,
            lat: 42.3601,
          },
          attachment: 'https://images.pexels.com/photos/3149330/pexels-photo-3149330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        title: 'HR Manager',
        phone: '+1 617-123-4567',
        email: 'emily.johnson@example.com',
        location: 'Boston, MA',
      },
    },
    {
      employeeId: 'EMP005',
      employee: {
        name: 'David Wilson',
        employeeCode: 'EMP005',
        employment: {
          department: {
            name: 'Finance',
          },
          branch: {
            name: 'South Branch',
          },
        },
        attendance: {
          date: '2024-04-15',
          branch: 'South Branch',
          schedule: {
            checkin: '08:30 AM',
            checkout: '05:30 PM',
          },
          clockin: '08:35 AM',
          clockout: '05:35 PM',
          clientvisitin: '11:30 AM',
          clientvisitout: '01:30 PM',
          overtimein: '05:35 PM',
          overtimeout: '06:15 PM',
          totalovertime: '40 mins',
          location: {
            lng: -84.3879,
            lat: 33.749,
          },
          attachment: 'https://images.pexels.com/photos/3182730/pexels-photo-3182730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        },
        title: 'Financial Analyst',
        phone: '+1 404-123-4567',
        email: 'david.wilson@example.com',
        location: 'Atlanta, GA',
      },
    },
  ]

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }]} title="Report" subtitle="Manage Your Team Report" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={() => (
            <MainCardHeader
              title="Request List"
              search={{
                value: search || '',
                setValue: (v) => setSearchParam({ search: v }),
              }}
            />
          )}
          body={<Table items={dummyData} />}
          footer={[]}
        />
      </Container>
    </>
  )
}

export default ReportPage
