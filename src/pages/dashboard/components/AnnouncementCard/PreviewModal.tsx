import { Button, Modal, ModalFooter, ModalHeader, useRemember } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'

type PropTypes = {
  item?: IDashboardAnnouncement | null
  onClose?: () => void
}

const PreviewModal: React.FC<PropTypes> = ({ item, onClose }) => {
  const rememberedItem = useRemember(item)

  const subtitle = rememberedItem?.createdAt ? `Published ${moment.utc(rememberedItem.createdAt).local().fromNow()}` : undefined

  return (
    <Modal show={!!item} className="max-w-6xl" onClose={onClose}>
      <ModalHeader subTitle={subtitle} onClose={onClose}>
        {rememberedItem?.title}
      </ModalHeader>
      {!!rememberedItem?.poster && <img src={rememberedItem.poster} alt={rememberedItem.title} className="block w-full" />}
      <div className="prose max-w-none p-3" dangerouslySetInnerHTML={{ __html: rememberedItem?.content || '' }} />
      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default PreviewModal
