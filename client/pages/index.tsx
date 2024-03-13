import { Inter } from 'next/font/google';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header';
import { DataTable } from '@/components/DataTable';

const inter = Inter({ subsets: ['latin'] });

export type RecordData =
  | {
      _recordId: string;
      createdAt: string;
      createdBy: string;
      updatedBy: string;
      _companyId: string;
      answer: string;
      question: string;
      updatedAt: string;
      companyName: string;
      assignedTo: string;
      properties: string;
      questionDescription: string;
    }
  | undefined;

export default function Home() {
  const [records, setRecords] = useState<RecordData[]>([]);
  const { data, isFetched } = useQuery<RecordData[]>({
    queryKey: ['Q&A'],
    queryFn: async () => {
      const res = await fetch('http://localhost:9090/records');
      return res.json();
    },
  });

  useEffect(() => {
    if (data && isFetched) {
      setRecords(data);
    }
  }, [data]);

  return (
    <main className="bg-white p-8">
      <div className="flex flex-col space-y-6">
        <Header />
        {records && <DataTable records={records} />}
      </div>
    </main>
  );
}
