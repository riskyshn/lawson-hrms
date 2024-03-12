import { Editor } from '@tinymce/tinymce-react'
import { BaseInputDate, Button, Card, CardBody, CardFooter, CardHeader, Input, InputFile, InputWrapper } from 'jobseeker-ui'
import { PinIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

const AnnouncementItem: React.FC = () => {
  return (
    <li className="mb-3 flex overflow-hidden rounded-lg last:mb-0">
      <button className="hoverable-default flex flex-1 flex-col gap-2 p-2">
        <h4 className="text-sm">Hari Libur Nasional</h4>
        <span className="block text-xs text-gray-500">27 November 2023</span>
      </button>
      <div className="flex flex-col">
        <Button iconOnly size="small" variant="light" color="default" className="h-1/2 min-h-8 rounded-none">
          <PinIcon size={14} />
        </Button>
        <Button iconOnly size="small" color="error" className="h-1/2 min-h-8 rounded-none">
          <Trash2Icon size={14} />
        </Button>
      </div>
    </li>
  )
}

const QuickPublishAnnouncement: React.FC = () => {
  const [show, setShow] = useState(false)

  return (
    <div className="p-3">
      {!show && (
        <Button variant="light" block onClick={() => setShow(true)}>
          Quick publish an announcement
        </Button>
      )}

      {show && (
        <form>
          <h3 className="mb-3 font-semibold">Publish an announcement</h3>

          <Input label="Title" labelRequired placeholder="Write your title here..." />

          <InputFile label="Poster" placeholder="PNG, JPG, or WEBP" />

          <InputWrapper label="Content" labelRequired>
            <Editor
              apiKey="m14xegf29hfe2xx2okyglh13njsgbzuygm9daa5gsg6m7osj"
              init={{
                plugins: 'link lists table powerpaste',
                toolbar: 'undo redo | blocks | bold italic underline strikethrough | link table align numlist bullist | removeformat',
                tinycomments_mode: 'embedded',
                skin_url: '/tinymce-theme',
                menubar: false,
                branding: false,
                height: 200,
              }}
            />
          </InputWrapper>

          <div className="flex justify-end gap-3 pt-3">
            <Button color="error" variant="light" className="w-28" onClick={() => setShow(false)}>
              Close Form
            </Button>
            <Button color="primary" className="w-28">
              Publish
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

const AnnouncementCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="h-16" actions={<BaseInputDate asSingle placeholder="Filter by date" />}>
        <div className="font-semibold">Announcement</div>
      </CardHeader>
      <CardBody className="p-0">
        <ul className="chrome-scrollbar max-h-80 overflow-y-auto p-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <AnnouncementItem key={i} />
          ))}
        </ul>
        <QuickPublishAnnouncement />
      </CardBody>
      <CardFooter>
        <Button block color="primary" variant="light">
          See All Announcement
        </Button>
      </CardFooter>
    </Card>
  )
}

export default AnnouncementCard
