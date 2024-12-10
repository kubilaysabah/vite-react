import { forwardRef, useCallback, useEffect, useState, type ReactElement, type Ref } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sheet, TableOfContents, UserRoundPen, UserX } from 'lucide-react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  Slide,
  useTheme
} from '@mui/material';
import { DataGrid, gridClasses, GridActionsCellItem, type GridColDef, type GridRowParams } from '@mui/x-data-grid';
import type { TransitionProps } from '@mui/material/transitions';
import { useDeleteTaxPayerById } from '@api/hooks/useTaxPayer.ts';
import type { TaxPayersResponse } from '~types/tax-payer';
import pageRoutes from '@constant/page-routes.ts';

type Props = {
  taxPayers: TaxPayersResponse;
  onPageChange?: (page: number) => void;
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<unknown, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type DeleteModalProps = {
  open?: boolean;
  handleClose: () => void;
  tax_payer_id?: string | null;
};

function DeleteModal({ open = false, handleClose, tax_payer_id = null }: DeleteModalProps) {
  const { mutate, isPending, isSuccess } = useDeleteTaxPayerById();

  useEffect(() => {
    if(isSuccess) {
      handleClose();
    }
  }, [handleClose, isSuccess])

  const onDelete = useCallback(() => {
    if (tax_payer_id) {
      mutate(tax_payer_id);
    }
  }, [tax_payer_id, mutate])

  return (
    <Dialog
      id={`delete-tax-payer-modal-${tax_payer_id}`}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
    >
      <DialogTitle>{"Mükellefi silmek istediğinize emin misiniz?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-tax-payer">
          {'Seçtiğiniz mükellef ile birlikte, bu mükellefe kayıtlı olan faturalar, fatura detayları, fişler silinecektir. Onaylıyor musunuz?'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isPending} variant={'contained'} color={'primary'} onClick={handleClose}>{'İptal'}</Button>
        <Button disabled={isPending} variant={'contained'} color={'error'} onClick={onDelete}>{'Sil'}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default function TaxPayerList({ taxPayers, onPageChange }: Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [modal, setModal] = useState<{ show: boolean; id: null | string }>({
    show: false,
    id: null
  });

  const columns: GridColDef[] = [
    {
      headerClassName: 'datagrid-header',
      headerName: 'Mükellef Adı',
      field: 'firstname',
      width: 220
    },
    {
      headerClassName: 'datagrid-header',
      headerName: 'Mükellef Soyadı',
      field: 'lastname',
      width: 220
    },
    {
      headerClassName: 'datagrid-header',
      headerName: 'Mükellef E-Posta',
      field: 'email',
      width: 220
    },
    {
      headerClassName: 'datagrid-header',
      headerName: 'Mükellef Telefon',
      field: 'phone',
      width: 220
    },
    {
      headerClassName: 'datagrid-header',
      headerName: 'Mükellef Bilgilerini Güncelle',
      field: 'actions',
      type: 'actions',
      width: 80,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          component={Link}
          onClick={() => navigate(pageRoutes.taxPayer.vouchers(params.row.id))}
          icon={<TableOfContents size={20} />}
          label="Fişler"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<Sheet size={20}  />}
          label="Hesap Planı"
          onClick={() => navigate(pageRoutes.taxPayer.accountPlan(params.row.id))}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<UserRoundPen size={20}  />}
          label="Düzenle"
          onClick={() => navigate(pageRoutes.taxPayer.edit(params.row.id))}
          showInMenu
        />,
        <GridActionsCellItem
          icon={<UserX size={20} />}
          label="Sil"
          onClick={() => setModal({ show: true, id: params.row.id })}
          showInMenu
        />
      ],
    },
  ];

  return (
    <Box>
      <DataGrid
        sx={{
          borderColor: 'primary.light',
          background: theme.palette.background.paper,
          [`& .${gridClasses.cell}`]: {
            py: 1,
            alignItems: 'center',
            display: 'flex',

          },
        }}
        getRowHeight={() => 'auto'}
        columns={columns}
        rows={taxPayers?.data}
        slots={onPageChange && {
          pagination: () => {
            return <Pagination count={taxPayers?.meta?.totalPages} page={taxPayers?.meta?.page} onChange={(_, page) => onPageChange(page)} />;
          }
        }}
      />
      <DeleteModal tax_payer_id={modal.id} open={modal.show} handleClose={() => setModal({ show: false, id: null })} />
    </Box>
  );
}
