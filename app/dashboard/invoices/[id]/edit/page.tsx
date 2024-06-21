import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import EditInvoiceForm from '@/app/ui/invoices/edit-form';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Invoice',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log('Fetching invoice and customers for ID:', id);

  try {
    const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);
    console.log('Fetched invoice:', invoice);
    console.log('Fetched customers:', customers);

    if (!invoice) {
      console.log('Invoice not found, triggering notFound()');
      notFound();
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Invoices', href: '/dashboard/invoices' },
            {
              label: 'Edit Invoice',
              href: `/dashboard/invoices/${id}/edit`,
              active: true,
            },
          ]}
        />
        <EditInvoiceForm invoice={invoice} customers={customers} />
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    notFound();
  }
}
