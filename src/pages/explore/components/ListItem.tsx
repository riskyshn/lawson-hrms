import type { ICandidateExplore } from '@/types'
import React from 'react'
import { Button, Skeleton } from '@jshrms/ui'
import { PlayIcon } from 'lucide-react'
import moment from 'moment'
import { usePreviewVideo } from '@/contexts/MediaPreviewerContext'

const ListItem: React.FC<{ item: ICandidateExplore }> = ({ item }) => {
  const detail = [item.gender, !!item.age && `Age ${item.age}`, item.last_edu].filter((el) => !!el).join(', ')
  const location = [item.district_name, item.city_name, item.province_name].filter((el) => !!el).join(', ')
  const preview = usePreviewVideo()
  return (
    <li className="relative flex flex-col rounded-lg border bg-white">
      <div
        className="group relative flex aspect-[3/4] w-full flex-col overflow-hidden rounded-lg bg-gray-300 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${item.video_thumbnail || item.photo})` }}
      >
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/2 w-full bg-gradient-to-t from-transparent via-black/30 to-black/75"></div>
          <div className="h-1/2 w-full bg-gradient-to-t from-black/75 via-black/50 to-transparent"></div>
        </div>
        <div className="relative z-10 flex flex-1 flex-col p-3 text-white transition-all group-hover:bg-black/25">
          <div className="flex flex-1 items-start">
            <div className="flex flex-1 flex-col gap-1">
              <span className="block truncate text-base capitalize leading-none">{item.full_name}</span>
              {item.login_date && <span className="block text-xs">{moment.utc(item.login_date).local().fromNow()}</span>}
            </div>
          </div>

          <div className="flex items-end">
            <p className="flex flex-1 flex-col gap-1 text-xs leading-snug">
              <span className="line-clamp-2 block">{detail}</span>
              <span className="line-clamp-2 block">{location}</span>
            </p>
          </div>

          <h1 className="mb-3 line-clamp-2 w-full font-semibold capitalize" title={item.position}>
            {item.position}
          </h1>

          <div className="flex gap-3">
            <Button className="flex-1" color="primary">
              Offer Job
            </Button>
            {!!item.video && (
              <Button className="border-0 bg-white" color="primary" iconOnly variant="light" onClick={() => preview(item.video)}>
                <PlayIcon size={20} />
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  )
}

export const ListItemSkeleton: React.FC = () => {
  return (
    <li className="flex aspect-[3/4] flex-col gap-3 rounded-lg border bg-white p-3">
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>

      <div className="w-full font-semibold">
        <Skeleton className="mb-1 h-3 w-1/4" />
        <Skeleton className="mb-2 h-3 w-1/3" />
        <Skeleton className="h-5 w-3/4" />
      </div>

      <div className="flex w-full gap-3">
        <Skeleton className="h-10 flex-1" />
        <Skeleton className="h-10 w-10" />
      </div>
    </li>
  )
}

export default ListItem
