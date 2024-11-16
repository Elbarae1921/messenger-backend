import { useApolloClient } from '@apollo/client';
import { Home, Inbox, LogOutIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MeDocument, useLogoutMutation } from '@/api/generated';
import { toast } from '@/hooks/use-toast';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar';

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Inbox',
    url: '/inbox',
    icon: Inbox
  }
];

export const AppSidebar = () => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout({ refetchQueries: [{ query: MeDocument }], awaitRefetchQueries: true });
    await apolloClient.resetStore();
    navigate('/login');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully'
    });
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Browse</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOutIcon />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
