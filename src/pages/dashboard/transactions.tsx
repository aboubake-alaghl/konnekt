import Dashboard from '@/layouts/Dashboard';
import React, { useState } from 'react'
import { indexPurchase } from '@/api/history';
import PurchaseHistoryReponse from '@/interfaces/PurchaseHistoryReponse';
import { useQuery } from '@tanstack/react-query';
import { Container } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
const ChangePassword = () => {

    const [page, setPage] = useState(1)

    const myDevicesQuery = useQuery<PurchaseHistoryReponse>({
        queryKey: ['purchase', page],
        queryFn: () => indexPurchase<PurchaseHistoryReponse>({ page }).then(({ data }) => data),
    });

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50, },
        { field: 'verb', headerName: 'Verb', width: 100 },
        { field: 'description', headerName: 'Description', width: 300 },
        { field: 'timestamp', headerName: 'Timestamp', type: 'dateTime', width: 250, valueGetter: (e) => new Date(e) }
    ];

    return (
        <Container>
            <div className="flex flex-col gap-3 bg-gradient-to-b from-[#1A2723] to-[#141414] border-t-[0.5px] border-primary rounded-xl p-5 mb-8 min-h-96">
                <span className="">Transaction List</span>
                <DataGrid
                    rows={myDevicesQuery?.isSuccess ? myDevicesQuery?.data?.results : []}
                    columns={columns}
                    disableColumnFilter
                    disableColumnMenu
                    disableColumnSelector
                    loading={myDevicesQuery.isLoading}
                />
            </div>
        </Container>
    )
}

ChangePassword.getLayout = function getLayout(page: JSX.Element) {
    return <Dashboard>{page}</Dashboard>
};


export default ChangePassword


// <Table stickyHeader sx={{ color: "black" }}>
//             <thead>
//               <tr>
//                 <th className='!bg-white '>ID</th>
//                 <th className='!bg-white '>Verb</th>
//                 <th className='!bg-white '>Description</th>
//                 <th className='!bg-white '>Content Obj</th>
//                 <th className='!bg-white '>Timestamp</th>
//                 <th className='!bg-white '>Unread</th>
//               </tr>
//             </thead>
//             <tbody>
//               {myDevicesQuery.isSuccess && myDevicesQuery.data.results.map((row, index) => {
//                 console.log(row);
//                 return (
//                     <tr className='text-white' key={index}>
//                       <td>{row.id}</td>
//                       <td>{row.verb}</td>
//                       <td>{row.description}</td>
//                       <td>{row.content_obj}</td>
//                       <td>{new Date(row.timestamp).toLocaleString('en')}</td>
//                       <td>{row.unread.toString()}</td>
//                     </tr>
//                   )
//               })}
//             </tbody>
//           </Table>