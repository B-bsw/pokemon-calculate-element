'use client'
import typeChart from '@/libs/DataElement'
import Image from 'next/image'
import iconElements from '@/components/icons'
import { useTranslate } from '@/i18n/i18nContext'

const TablePokemon = () => {
    const { t } = useTranslate()
    return (
        <div className="mx-10 h-full w-full">
            <table className="border [&_th,td]:border [&_th,td]:px-2 [&_th,td]:py-1">
                <thead>
                    <tr>
                        <th colSpan={2}>{t('element')}</th>
                        <th>{t('strong')}</th>
                        <th>{t('weak')}</th>
                        <th>{t('noEffectFrom')}</th>
                    </tr>
                </thead>

                <tbody>
                    {typeChart.map((e) => (
                        <tr key={e.name}>
                            <td className="border-r-transparent">
                                <div className="w-10">
                                    <Image
                                        src={iconElements(e.name)}
                                        alt="image"
                                        width={30}
                                        height={30}
                                        className={`icon ${e.name.toLowerCase()}`}
                                    />
                                </div>
                            </td>
                            <td>
                                <div>{t(e.name)}</div>
                            </td>
                            <td>
                                {e.strongAgainst.map((st) => t(st)).join(', ')}
                            </td>
                            <td>
                                {e.weakAgainst.map((wk) => t(wk)).join(', ')}
                            </td>
                            <td>
                                {e.noEffectFrom.map((no) => t(no)).join(', ')}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePokemon
