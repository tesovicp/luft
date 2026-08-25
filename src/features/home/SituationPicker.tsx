import { CircleHelp, Gift, Heart, Martini, Utensils } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import type { Situation } from '@/types'

interface Option {
  id: Situation
  Icon: LucideIcon
  /** Each moment owns a colour; taken from the prototype stylesheet. */
  bg: string
}

const OPTIONS: Option[] = [
  { id: 'vecera', Icon: Utensils, bg: 'bg-sit-dinner' },
  { id: 'dejt', Icon: Heart, bg: 'bg-sit-date' },
  { id: 'drustvo', Icon: Martini, bg: 'bg-sit-friends' },
  { id: 'poklon', Icon: Gift, bg: 'bg-sit-gift' },
  { id: 'ne-znam', Icon: CircleHelp, bg: 'bg-sit-unsure' },
]

export function SituationPicker() {
  const { t } = useTranslation()

  return (
    <ul className="grid grid-cols-5 gap-2 sm:gap-3 lg:gap-4">
      {OPTIONS.map(({ id, Icon, bg }) => (
        <li key={id}>
          <Link
            to={`/alek?situacija=${id}`}
            className={`${bg} group text-cream-bright flex h-full flex-col items-center justify-center gap-2 rounded-xl px-1.5 py-3 transition duration-200 hover:-translate-y-0.5 hover:brightness-110 sm:gap-2.5 sm:rounded-2xl sm:py-5 lg:py-6`}
          >
            <Icon
              className="size-5 transition group-hover:scale-110 sm:size-6 lg:size-7"
              strokeWidth={1.5}
            />
            <span className="text-center text-[9px] leading-tight font-semibold sm:text-[11px] lg:text-xs">
              {t(`situations.${id}`)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
