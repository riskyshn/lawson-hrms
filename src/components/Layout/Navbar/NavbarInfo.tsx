import { useAuthStore } from '@/store'
import { twJoin } from 'tailwind-merge'

const NavbarInfo: React.FC<{ className?: string }> = ({ className }) => {
  const { company } = useAuthStore()
  return (
    <table className={twJoin(className, 'text-[11px] leading-none text-gray-500')}>
      <tbody>
        <tr>
          <td>JOC</td>
          <td>:</td>
          <td className="text-primary-600">{company?.credit?.coin} Credits</td>
        </tr>
        <tr>
          <td>EXP</td>
          <td>:</td>
          <td className="text-primary-600">365 Days</td>
        </tr>
      </tbody>
    </table>
  )
}

export default NavbarInfo
