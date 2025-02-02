import type { IDashboardAnnouncement } from '@/types'
import React from 'react'
import { Button, Modal, ModalFooter, ModalHeader, useRemember } from 'jobseeker-ui'
import moment from 'moment'

type PropTypes = {
  item?: IDashboardAnnouncement | null
  onClose?: () => void
}

const PreviewModal: React.FC<PropTypes> = ({ item, onClose }) => {
  const rememberedItem = useRemember(item)

  const subtitle = rememberedItem?.createdAt ? `Published ${moment(rememberedItem.createdAt).fromNow()}` : undefined

  return (
    <Modal className="max-w-6xl" onClose={onClose} show={!!item}>
      <ModalHeader onClose={onClose} subTitle={subtitle}>
        {rememberedItem?.title}
      </ModalHeader>
      {!!rememberedItem?.poster && <img alt={rememberedItem.title} className="block w-full" src={rememberedItem.poster} />}
      <div className="prose max-w-none p-3" dangerouslySetInnerHTML={{ __html: rememberedItem?.content || '' }} />
      <ModalFooter>
        <Button className="w-24" color="error" onClick={onClose} type="button" variant="light">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default PreviewModal
