'use client';

import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { useOrganization, useOrganizationList } from '@clerk/nextjs';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { useOrganizationContext } from './providers/organization-provider';

interface OrganizationDisplay {
  imageUrl?: string;
  name: string;
  role?: string;
}

function OrganizationIcon({
  organization,
  className = 'size-8'
}: {
  organization?: OrganizationDisplay;
  className?: string;
}) {
  if (!organization) {
    return <Building2 className={className} />;
  }

  return organization.imageUrl ? (
    <img
      src={organization.imageUrl}
      alt={organization.name}
      className={`rounded-lg object-cover ${className}`}
    />
  ) : (
    <div
      className={`bg-primary text-sidebar-primary-foreground flex items-center justify-center rounded-lg ${className}`}
    >
      <Building2 className='size-4' />
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <SidebarMenuButton size='lg' className='pointer-events-none'>
      <Skeleton className='size-8 rounded-lg' />
      <div className='flex flex-col gap-0.5'>
        <Skeleton className='h-4 w-24' />
        <Skeleton className='h-3 w-16' />
      </div>
    </SidebarMenuButton>
  );
}

export function OrgSwitcher() {
  const { organization } = useOrganization();
  const { userMemberships, isLoaded, setActive } = useOrganizationList({
    userMemberships: {
      infinite: true
    }
  });
  const { refreshOrganizationData } = useOrganizationContext();
  const [isChangingOrg, setIsChangingOrg] = React.useState(false);

  const handleOrganizationSwitch = async (orgId: string) => {
    if (!setActive) return;

    try {
      setIsChangingOrg(true);
      await setActive({ organization: orgId });
      await refreshOrganizationData();
      toast.success('Organization switched successfully');
    } catch (error) {
      console.error('Error switching organization:', error);
      toast.error('Failed to switch organization. Please try again.');
    } finally {
      setIsChangingOrg(false);
    }
  };

  if (!isLoaded) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <LoadingSkeleton />
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  const organizations =
    userMemberships.data?.map(({ organization, role }) => ({
      id: organization.id,
      name: organization.name,
      imageUrl: organization.imageUrl,
      role: role
    })) || [];

  if (organizations.length === 0) {
    return null;
  }

  const currentOrganization: OrganizationDisplay | undefined = organization
    ? {
        name: organization.name,
        imageUrl: organization.imageUrl,
        role: userMemberships.data?.find(
          (mem) => mem.organization.id === organization.id
        )?.role
      }
    : undefined;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild disabled={isChangingOrg}>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <OrganizationIcon organization={currentOrganization} />
              <div className='flex flex-col gap-0.5 leading-none'>
                <span className='font-semibold'>
                  {currentOrganization?.name || 'Select Organization'}
                </span>
                <span className='text-muted-foreground text-xs capitalize'>
                  {currentOrganization?.role?.toLowerCase() || 'No role'}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width]'
            align='start'
          >
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onSelect={() => handleOrganizationSwitch(org.id)}
                disabled={isChangingOrg}
                className='flex items-center gap-2 py-2'
              >
                <OrganizationIcon organization={org} className='size-6' />
                <div className='flex flex-col'>
                  <span>{org.name}</span>
                  <span className='text-muted-foreground text-xs capitalize'>
                    {org.role?.toLowerCase() || 'Member'}
                  </span>
                </div>
                {organization?.id === org.id && (
                  <Check className='ml-auto size-4' />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
