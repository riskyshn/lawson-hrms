import MainTable from '@/components/Elements/MainTable';
import { Menu } from '@headlessui/react';
import { Avatar, Button } from 'jobseeker-ui';
import { FileTextIcon, FileVideoIcon, UserRoundPlusIcon } from 'lucide-react';
import { twJoin } from 'tailwind-merge';

const total = 20;

type PropTypes = {
    setPreviewVideoModalUrl: (url: string) => void
    setPreviewPdfModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ setPreviewVideoModalUrl, setPreviewPdfModalUrl }) => {
    const candidates = Array.from(Array(total)).map((_, i) => {
        return {
            name: `Candidate ${i + 1}`,
            email: `candidate${i + 1}@jobseeker.com`,
            vacancy: `Last Position ${i + 1}`,
            blacklistedBy: 'Anna Smith',
            blacklistReason: 'Bad Mannering',
            videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            pdfUrl: 'http://localhost:5173/sample.pdf',
        };
    });

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
            { children: candidate.blacklistedBy, className: 'text-center' },
            { children: candidate.blacklistReason, className: 'text-center' },
            {
                children: (
                    <span className="flex items-center justify-center gap-2">
                        <button
                            title="Preview Pdf Resume"
                            className="text-primary-600 hover:text-primary-700 focus:outline-none"
                            onClick={() => setPreviewPdfModalUrl(candidate.pdfUrl)}
                        >
                            <FileTextIcon size={18} />
                        </button>
                        <button
                            title="Preview Video Resume"
                            className="text-primary-600 hover:text-primary-700 focus:outline-none"
                            onClick={() => setPreviewVideoModalUrl(candidate.videoUrl)}
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
                            {['Unblacklist'].map((option, i) => (
                                <Menu.Item key={i}>
                                    {({ active }) => (
                                        <button
                                            className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                                        >
                                            {i === 0 && <UserRoundPlusIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
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
                    { children: 'Last Position', className: 'text-left' },
                    { children: 'Blacklisted By' },
                    { children: 'Blacklist Reason' },
                    { children: 'Resume', className: 'w-24' },
                    { children: 'Action', className: 'w-24' },
                ]}
                bodyItems={bodyItems}
            />
        </>
    );
};

export default Table;
