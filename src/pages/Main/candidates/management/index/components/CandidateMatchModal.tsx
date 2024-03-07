import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import MainModal from '@/components/Elements/MainModal';
import MainTable from '@/components/Elements/MainTable';

const total = 20;

type Candidate = {
    requirementType: string;
    vacancyRequirement: string;
    candidate: string;
    match: boolean;
};

const candidates: Candidate[] = Array.from(Array(total)).map((_, i) => ({
    requirementType: `Requirement Type ${i + 1}`,
    vacancyRequirement: `Vacancy Requirement ${i + 1}`,
    candidate: `Candidate ${i + 1}`,
    match: Math.random() < 0.5,
}));

const CandidateMatchModal: React.FC<{ show: boolean; onClose: () => void; candidate: any }> = ({ show, onClose, candidate }) => {
    const bodyItems = candidates.map((candidate, i) => ({
        items: [
            { children: candidate.requirementType },
            { children: candidate.vacancyRequirement },
            { children: candidate.candidate },
            {
                children: (
                    <div className="flex items-center">
                        {candidate.match ? <CheckCircleIcon color="green" size={20} /> : <XCircleIcon color="red" size={20} />}
                        <span className="ml-2">{candidate.match ? 'Match' : 'No Match'}</span>
                    </div>
                ),
                className: 'text-center',
            },
        ],
        key: i.toString(),
    }));

    return (
        <MainModal className="max-w-6xl py-12" show={show} onClose={onClose}>
            <div className="mb-8">
                <div className="pb-2">
                    <h3 className="text-lg text-center font-semibold mb-8">Candidate Match</h3>
                    <p className="text-sm font-semibold">Mandatory Requirements</p>
                </div>

                <MainTable
                    headerItems={[
                        { children: 'Requirement Type', className: 'text-left' },
                        { children: 'Vacancy Requirement', className: 'text-left' },
                        { children: 'Candidate', className: 'text-left' },
                        { children: 'Match', className: 'text-left' },
                    ]}
                    bodyItems={bodyItems}
                />
            </div>
        </MainModal>
    );
};

export default CandidateMatchModal;
