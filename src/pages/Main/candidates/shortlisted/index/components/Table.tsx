import React, { useState } from 'react';
import { Menu } from '@headlessui/react';
import { Avatar, Button } from 'jobseeker-ui';
import { FileTextIcon, FileVideoIcon, HistoryIcon, RefreshCwIcon, SendToBackIcon, UserXIcon, XCircleIcon } from 'lucide-react';
import { twJoin } from 'tailwind-merge';
import MoveAnotherVacancyModal from './MoveAnotherVacancyModal';
import MainTable from './MainTable';
import ProcessModal from './ProcessModal';
import ViewHistoryModal from './ViewHistoryModal'

const total = 20;

type PropTypes = {
    setPreviewVideoModalUrl: (url: string) => void;
    setPreviewPdfModalUrl: (url: string) => void;
};

const Table: React.FC<PropTypes> = () => {
    const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
    const [showOptionModal, setShowOptionModal] = useState(false);
    const [modalType, setModalType] = useState<'MoveAnotherVacancy' | 'Process' | 'ViewHistory' | null>(null);

    const candidates = Array.from(Array(total)).map((_, i) => {
        return {
            name: `Candidate ${i + 1}`,
            email: `candidate${i + 1}@jobseeker.com`,
            vacancy: `Last Position ${i + 1}`,
            education: 'S1',
            province: 'DKI Jakarta',
            city: 'Jakarta',
        };
    });

    const handleViewDetails = (candidate: any, option: string) => {
        setSelectedCandidate(candidate);
        if (option === 'Move to Another Vacancy') {
            setModalType('MoveAnotherVacancy');
            setShowOptionModal(true);
        }
        if (option === 'Process') {
            setModalType('Process');
            setShowOptionModal(true);
        }
        if (option === 'View History') {
            setModalType('ViewHistory');
            setShowOptionModal(true);
        }
    };

    const handlePreviewPdf = () => {
        window.open('http://localhost:5173/sample.pdf', '_blank');
    };

    const handlePreviewVideo = () => {
        window.open('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '_blank');
    };

    const bodyItems = candidates.map((candidate, i) => ({
        items: [
            {
                children: (
                    <div className="flex gap-3">
                        <div>
                            <Avatar name={candidate.name} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
                        </div>
                        <div>
                            <span className="block font-semibold">{candidate.name}</span>
                            <span className="text-xs text-gray-500">{candidate.email}</span>
                        </div>
                    </div>
                ),
            },
            {
                children: (
                    <>
                        <span className="block font-semibold">{candidate.vacancy}</span>
                        <span className="text-xs text-gray-500">#RR0000001</span>
                    </>
                ),
            },
            { children: candidate.education, className: 'text-center' },
            { children: candidate.province, className: 'text-center' },
            { children: candidate.city, className: 'text-center' },
            {
                children: (
                    <span className="flex items-center justify-center gap-2">
                        <button
                            title="Preview Pdf Resume"
                            className="text-primary-600 hover:text-primary-700 focus:outline-none"
                            onClick={handlePreviewPdf}
                        >
                            <FileTextIcon size={18} />
                        </button>
                        <button
                            title="Preview Video Resume"
                            className="text-primary-600 hover:text-primary-700 focus:outline-none"
                            onClick={handlePreviewVideo}
                        >
                            <FileVideoIcon size={18} />
                        </button>
                    </span>
                ),
                className: 'text-center',
            },
            {
                children: (
                    <Menu as="div" className="relative">
                        <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
                            Action
                        </Menu.Button>
                        <Menu.Items
                            className={twJoin(
                                i > total - 6 && 'bottom-full',
                                'absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
                            )}
                        >
                            {['Process', 'Move to Another Vacancy', 'View History', 'Blacklist', 'Reject'].map((option, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <button
                                            className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                                            onClick={() => handleViewDetails(candidate, option)}
                                        >
                                            {i === 0 && <RefreshCwIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                                            {i === 1 && <SendToBackIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                                            {i === 2 && <HistoryIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                                            {i === 3 && <UserXIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                                            {i === 4 && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                                            {option}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>
                ),
                className: 'text-center',
            },
        ],
    }));

    return (
        <>
            <MainTable
                headerItems={[
                    { children: 'Candidate', className: 'text-left' },
                    { children: 'Vacancy', className: 'text-left' },
                    { children: 'Education' },
                    { children: 'Province' },
                    { children: 'City' },
                    { children: 'Resume', className: 'w-24' },
                    { children: 'Action', className: 'w-24' },
                ]}
                bodyItems={bodyItems}
            />

            {/* Option Modal */}
            {showOptionModal && selectedCandidate && modalType === 'MoveAnotherVacancy' && (
                <MoveAnotherVacancyModal
                    show={showOptionModal}
                    onClose={() => setShowOptionModal(false)}
                    candidate={selectedCandidate}
                />
            )}

            {/* Render ProcessModal if modalType is 'Process' */}
            {showOptionModal && selectedCandidate && modalType === 'Process' && (
                <ProcessModal
                    show={showOptionModal}
                    onClose={() => setShowOptionModal(false)}
                    candidate={selectedCandidate}
                />
            )}

            {/* Render ViewHistoryModal if modalType is 'View History' */}
            {showOptionModal && selectedCandidate && modalType === 'ViewHistory' && (
                <ViewHistoryModal
                    show={showOptionModal}
                    onClose={() => setShowOptionModal(false)}
                    candidate={selectedCandidate}
                />
            )}
        </>
    );
};

export default Table;
