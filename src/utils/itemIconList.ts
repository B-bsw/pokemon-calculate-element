import { List, Calculator, Table2, Swords, Backpack, Leaf } from 'lucide-react'

export const items = [
    { id: 1, nameTrans: 'pokelist', path: '/pokemon', icon: List },
    { id: 2, nameTrans: 'movelist', path: '/moves', icon: Swords },
    { id: 3, nameTrans: 'heldItems', path: '/items', icon: Backpack },
    {
        id: 4,
        nameTrans: 'calem',
        path: '/calculate',
        icon: Calculator,
    },
    {
        id: 5,
        nameTrans: 'tableem',
        path: '/elements',
        icon: Table2,
    },
    { id: 6, nameTrans: 'nature', path: '/nature', icon: Leaf },
]
