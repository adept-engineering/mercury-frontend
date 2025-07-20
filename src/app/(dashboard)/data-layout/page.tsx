import { DataLayoutContainer } from './data-layout-container';

// Dummy data for data layouts
const dummyDataLayouts = [
  {
    id: '1',
    name: 'Customer Order Layout',
    description: 'Standard layout for customer order processing',
    segmentsUsed: 15
  },
  {
    id: '2',
    name: 'Invoice Layout',
    description: 'Layout for invoice generation and processing',
    segmentsUsed: 22
  },
  {
    id: '3',
    name: 'Shipment Notification',
    description: 'Layout for shipment tracking notifications',
    segmentsUsed: 8
  },
  {
    id: '4',
    name: 'Payment Confirmation',
    description: 'Layout for payment confirmation messages',
    segmentsUsed: 12
  },
  {
    id: '5',
    name: 'Product Catalog',
    description: 'Standard product catalog data layout',
    segmentsUsed: 28
  }
];

export default function DataLayoutPage() {
  return (
    <DataLayoutContainer dataLayouts={dummyDataLayouts} />
  );
}
