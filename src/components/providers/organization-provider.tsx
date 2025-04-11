'use client';

import { useOrganization } from '@clerk/nextjs';
import * as React from 'react';
import { toast } from 'sonner';

interface OrganizationContextType {
  isLoading: boolean;
  organizationId: string | null;
  refreshOrganizationData: () => Promise<void>;
}

const OrganizationContext = React.createContext<OrganizationContextType>({
  isLoading: true,
  organizationId: null,
  refreshOrganizationData: async () => {}
});

export function useOrganizationContext() {
  return React.useContext(OrganizationContext);
}

export function OrganizationProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const { organization, isLoaded } = useOrganization();
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  // Track organization changes for data refresh
  const prevOrgId = React.useRef<string | null>(null);

  // Function to refresh organization-specific data
  const refreshOrganizationData = React.useCallback(async () => {
    if (!organization?.id) return;

    setIsRefreshing(true);
    try {
      // Add your organization-specific data refresh logic here
      // Example:
      // await Promise.all([
      //   refetchProjects(organization.id),
      //   refetchSettings(organization.id),
      //   refetchMembers(organization.id)
      // ]);

      toast.success('Organization data refreshed');
    } catch (error) {
      console.error('Error refreshing organization data:', error);
      toast.error('Failed to refresh organization data');
    } finally {
      setIsRefreshing(false);
    }
  }, [organization?.id]);

  // Handle organization changes
  React.useEffect(() => {
    if (organization?.id && prevOrgId.current !== organization.id) {
      prevOrgId.current = organization.id;
      refreshOrganizationData();
    }
  }, [organization?.id, refreshOrganizationData]);

  const contextValue = React.useMemo(
    () => ({
      isLoading: !isLoaded || isRefreshing,
      organizationId: organization?.id || null,
      refreshOrganizationData
    }),
    [isLoaded, isRefreshing, organization?.id, refreshOrganizationData]
  );

  return (
    <OrganizationContext.Provider value={contextValue}>
      {children}
    </OrganizationContext.Provider>
  );
}
