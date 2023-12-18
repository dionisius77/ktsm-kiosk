import { FiBookOpen, FiHome, FiArchive } from "react-icons/fi"

interface MenuItem {
    name: string,
    path: string,
    icon: React.ReactNode
}

const menuItems: MenuItem[] = [
    {
        name: 'Product Management',
        icon: <FiBookOpen />,
        path: '/product-management'
    }
]

export { menuItems }
export type { MenuItem }
