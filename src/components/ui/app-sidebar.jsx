import { ChartBarStacked, Home, SquareMousePointer, UserRoundCog, SquareRoundCorner, Settings, CopyPlus, Cog } from "lucide-react"
import { useEffect } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router-dom"


const items = [
    {
        title: "Analytics",
        url: "/admin",
        icon: Home,
    },
    {
        title: "Pending Orders",
        url: "/admin/pending-orders",
        icon: SquareMousePointer,
    },
    {
        title: "Orders",
        url: "/admin/orders",
        icon: SquareRoundCorner,
    },
    {
        title: "Manage Users",
        url: "/admin/users",
        icon: UserRoundCog,
    },

    {
        title: "Category",
        url: "/admin/category",
        icon: ChartBarStacked,
    },
    {
        title: "Add Product",
        url: "/admin/add-product",
        icon: CopyPlus,
    },
    {
        title: "Manage Products",
        url: "/admin/manage-products",
        icon: Cog,
    },
    {
        title: "Settings",
        url: "/admin/settings",
        icon: Settings,
    },
]

export function AppSidebar({ setTopBar }) {
    const location = useLocation()

    console.log(location);
    useEffect(() => {
        const currentItem = items.find(item => item.url === location.pathname)
        if (currentItem) {
            setTopBar(currentItem.title)
        }
    }, [location.pathname, setTopBar])

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className={'h-14 flex flex-col gap-2 justify-center mb-3 md:mb-8'}>
                        <Link to={'/'}>
                            <img className="h-auto w-10" src="/BY Gray.svg" alt="" />
                        </Link>
                        <h2 className="font-bold text-lg ">ADMIN PANEL</h2>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => {
                                const isActive = location.pathname === item.url
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            asChild
                                            className={isActive ? "bg-primary text-primary-foreground font-semibold hover:bg-primary/90" : ""}
                                        >
                                            <Link to={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}