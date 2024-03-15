import React, { useState } from 'react'
import { Avatar, BaseInput, Button } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { SearchIcon } from 'lucide-react'

type Candidate = {
  name: string
  email: string
}

type ModalProps = {
  show: boolean
  onClose: () => void
  position?: any
}

const ViewEmployeesModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [candidates] = useState<Candidate[]>([
    { name: 'John Doe', email: 'john@example.com' },
    { name: 'Jane Smith', email: 'jane@example.com' },
    { name: 'Alice Johnson', email: 'alice@example.com' },
    { name: 'Bob Roberts', email: 'bob@example.com' },
    { name: 'Carol Davis', email: 'carol@example.com' },
    { name: 'David Brown', email: 'david@example.com' },
    { name: 'Emma Wilson', email: 'emma@example.com' },
    { name: 'Frank White', email: 'frank@example.com' },
    { name: 'Grace Lee', email: 'grace@example.com' },
    { name: 'Henry Clark', email: 'henry@example.com' },
    { name: 'Ivy Hall', email: 'ivy@example.com' },
    { name: 'Jack Adams', email: 'jack@example.com' },
    { name: 'Karen Taylor', email: 'karen@example.com' },
    { name: 'Leo Moore', email: 'leo@example.com' },
    { name: 'Mia Garcia', email: 'mia@example.com' },
    { name: 'Noah Martinez', email: 'noah@example.com' },
    { name: 'Olivia Lopez', email: 'olivia@example.com' },
    { name: 'Peter Hernandez', email: 'peter@example.com' },
    { name: 'Quinn Parker', email: 'quinn@example.com' },
    { name: 'Rachel Young', email: 'rachel@example.com' },
    { name: 'Samuel Scott', email: 'samuel@example.com' },
    { name: 'Tina Nguyen', email: 'tina@example.com' },
    { name: 'Uma Patel', email: 'uma@example.com' },
    { name: 'Victor Kim', email: 'victor@example.com' },
    { name: 'Wendy Smith', email: 'wendy@example.com' },
    { name: 'Xavier Davis', email: 'xavier@example.com' },
    { name: 'Yara Johnson', email: 'yara@example.com' },
    { name: 'Zoe Brown', email: 'zoe@example.com' },
    { name: 'Aaron Wilson', email: 'aaron@example.com' },
    { name: 'Bella Thomas', email: 'bella@example.com' },
  ])

  const filteredCandidates = candidates.filter((candidate) => candidate.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="relative flex h-96 flex-1 flex-col overflow-y-auto">
        <div className="relative flex">
          <BaseInput
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="flex-grow rounded-r-none lg:w-64"
          />
          <Button iconOnly color="primary" className="rounded-l-none">
            <SearchIcon size={16} />
          </Button>
        </div>
        <div className="mt-4">
          {filteredCandidates.map((candidate, index) => (
            <div key={index} className="flex gap-3">
              <div>
                <Avatar name={candidate.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
              </div>
              <div>
                <span className="block font-semibold">{candidate.name}</span>
                <span className="text-xs text-gray-500">{candidate.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainModal>
  )
}

export default ViewEmployeesModal
