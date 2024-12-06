import DashboardIcon from '@mui/icons-material/Dashboard';
import WidgetsIcon from '@mui/icons-material/Widgets';
import BookIcon from '@mui/icons-material/Book';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

const sidebarLinks = [
    {
        "label": "Dashboard",
        "path": "/dashboard",
        "icon": <DashboardIcon />,
    },
    {
        "label": "Products",
        "path": "/products",
        "icon": <WidgetsIcon />,
    },
    {
        "label": "Debts",
        "path": "/debts",
        "icon": <BookIcon />,
    },
    {
        "label": "Finished Products",
        "path": "/finished_products",
        "icon": <ProductionQuantityLimitsIcon />,
    },
]

export default sidebarLinks