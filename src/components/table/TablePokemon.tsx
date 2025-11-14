'use client'
import typeChart from '@/libs/DataElement'
import Image from 'next/image'
import iconElements from '@/components/icons'

const TablePokemon = () => {
    return (
        <div className="max-h-screen overflow-auto overflow-x-auto">
            <table className="border [&_th,td]:border [&_th,td]:px-2 [&_th,td]:py-1">
                <thead>
                    <tr>
                        <th colSpan={2}>Element</th>
                        <th>Strong</th>
                        <th>Weak</th>
                        <th>NoEffectFrom</th>
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
                                <div>{e.name}</div>
                            </td>
                            <td>{e.strongAgainst.join(', ')}</td>
                            <td>{e.weakAgainst.join(', ')}</td>
                            <td>{e.noEffectFrom.join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePokemon
