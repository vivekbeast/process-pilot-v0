"use client";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);


import DashboardGrid from '../../components/DashboardGrid';

export default function Page() {
  return <DashboardGrid />;
}
