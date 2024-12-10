import { Dialog, DialogTitle, DialogContent, Box, Typography, TextField, Button, Grid2 as Grid, LinearProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useCreateAccountCodeMutation } from '@api-hooks/useAccountPlan';

type Props = {
    loading?: boolean;
    onClose?: () => void;
    invoiceName?: string;
    tax_number_or_turkish_identity_number?: string;
    tax_payer_id?: string;
}

const validationSchema = yup.object({
    account_code: yup.string().required('Lütfen hesap kodu giriniz'),
    account_name: yup.string().required('Lütfen hesap adı giriniz')
});

export default function CreateAccountCode({ tax_payer_id, loading = false, onClose = () => undefined, invoiceName, tax_number_or_turkish_identity_number }: Props) {
    const { mutate, isPending } = useCreateAccountCodeMutation();

    const { errors, touched, handleSubmit, handleChange, handleBlur, values } = useFormik({
        initialValues: {
            account_code: '',
            account_name: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(!tax_payer_id) {
                return;
            }

            mutate({
                tax_payer_id,
                body: {
                    account_code: values.account_code,
                    account_name: values.account_name,
                }
            })

            onClose();
        }
    });

    return (
        <Dialog open onClose={onClose} aria-labelledby="create-account-code" aria-describedby="create-account-code">
            <DialogTitle
                id="create-account-code"
                sx={{
                    textAlign: 'center'
                }}
            >
                <Typography>{invoiceName}</Typography>
                <Typography>{tax_number_or_turkish_identity_number}</Typography>
            </DialogTitle>
            <DialogContent>
                <Box component={'form'} onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label={'Hesap Kodu'}
                        type={'text'}
                        id={'account_code'}
                        value={values.account_code}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.account_code && Boolean(errors.account_code)}
                        helperText={touched.account_code && errors.account_code}
                        sx={{
                            mb: 3
                        }}
                    />
                    {(isPending || loading) && <LinearProgress />}
                    <TextField
                        fullWidth
                        label={'Hesap Adı'}
                        type={'text'}
                        id={'account_name'}
                        value={values.account_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.account_name && Boolean(errors.account_name)}
                        helperText={touched.account_name && errors.account_name}
                        sx={{
                            mb: 3
                        }}
                    />
                    {(isPending || loading) && <LinearProgress />}
                    <Grid container spacing={2}>
                        <Grid size={'grow'}>
                            <Button disabled={isPending || loading} fullWidth type={'button'} variant={'contained'} color={'error'} onClick={onClose}>
                                {'İptal'}
                            </Button>
                        </Grid>
                        <Grid size={'grow'}>
                            <Button disabled={isPending || loading} fullWidth type={'submit'} variant={'contained'} color={'primary'}>
                                {'Hesap Kodu Ekle'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
        </Dialog>
    );
}