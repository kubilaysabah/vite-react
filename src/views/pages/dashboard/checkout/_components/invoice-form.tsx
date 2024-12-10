import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, LinearProgress, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useSession from '@hooks/useSession';
import { useCartState } from '@state/cart.state';
import { usePayment } from '@api/hooks/usePayment';

type Props = {
  handleBack: () => void;
}

export default function InvoiceForm({ handleBack }: Props) {
  const session = useSession();
  const selectedPackage = useCartState((state) => state.package);
  const { mutate, isPending, data, isSuccess } = usePayment();
  const navigate = useNavigate();

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } = useFormik({
    initialValues: {
      address: '',
      tax_number_or_turkish_identity_number: '',
      company_name: ''
    },
    validationSchema: yup.object().shape({
      address: yup.string().required('Adres alanı zorunludur.'),
      tax_number_or_turkish_identity_number: yup.string().required('TC Kimlik No / Vergi No alanı zorunludur.'),
      company_name: yup.string().required('Şirket Adı alanı zorunludur.'),
    }),
    onSubmit: () => {
      if (!session || !selectedPackage) {
        return;
      }

      mutate({
        user_id: session?.id,
        price: new Intl.NumberFormat('tr-TR', { style: 'decimal' }).format(selectedPackage.price),
        errorURL: 'http://localhost:3000/payment-error',
        successURL: 'http://localhost:3000/payment-successful',
        content: selectedPackage.name,
        description: 'Paket satın alımı',
      })
    }
  });

  useEffect(() => {
    if(isSuccess) {
      window.location.href = data?.redirectUrl;
    }
  }, [data, isSuccess, navigate]);

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <TextField
        focused
        fullWidth
        id={'tax_number_or_turkish_identity_number'}
        name={'tax_number_or_turkish_identity_number'}
        label={'TC Kimlik No / Vergi No'}
        placeholder={'TC Kimlik No / Vergi No'}
        error={touched.tax_number_or_turkish_identity_number && Boolean(errors.tax_number_or_turkish_identity_number)}
        helperText={touched.tax_number_or_turkish_identity_number && errors.tax_number_or_turkish_identity_number}
        value={values.tax_number_or_turkish_identity_number}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          marginBottom: 2
        }}
      />
      {isPending && <LinearProgress />}

      <TextField
        focused
        fullWidth
        id={'company_name'}
        name={'company_name'}
        label={'Şirket Adı'}
        placeholder={'Şirket Adı'}
        error={touched.company_name && Boolean(errors.company_name)}
        helperText={touched.company_name && errors.company_name}
        value={values.company_name}
        onChange={handleChange}
        onBlur={handleBlur}
        sx={{
          marginBottom: 2
        }}
      />
      {isPending && <LinearProgress />}

      <TextField
        focused
        fullWidth
        id={'address'}
        name={'address'}
        label={'Adres'}
        placeholder={'Adres'}
        error={touched.address && Boolean(errors.address)}
        helperText={touched.address && errors.address}
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        multiline
        rows={4}
        sx={{
          marginBottom: 2
        }}
      />
      {isPending && <LinearProgress />}

      <Box>
        <Button disabled={isPending} type={'submit'} variant="contained" sx={{ mt: 1, mr: 1 }}>
          {'Satın Al'}
        </Button>
        <Button disabled={isPending} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          {'Geri'}
        </Button>
      </Box>
    </Box>
  )
}