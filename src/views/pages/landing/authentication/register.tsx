import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material';
import InputMask from 'react-input-mask';
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegister } from '@api-hooks/useAuth';
import pageRoutes from '@constant/page-routes';

export default function Register() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { isPending, mutate } = useRegister();

    const { touched, errors, handleSubmit, values, handleBlur, handleChange, setFieldValue } =
      useFormik({
          initialValues: {
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              password: '',
          },
          validationSchema: Yup.object({
              firstname: Yup.string().required('Lütfen adınızı giriniz.'),
              lastname: Yup.string().required('Lütfen soyadınızı giriniz.'),
              email: Yup.string()
                .email('E-posta adresinizi kontrol edin.')
                .required('Lütfen e-posta adresinizi giriniz.'),
              phone: Yup.string()
                .matches(
                  /^\(\d{3}\) \d{3}-\d{4}$/,
                  'Lütfen geçerli bir telefon numarası giriniz. (örn: (555) 555-5555)'
                )
                .required('Lütfen telefon numaranızı giriniz.'),
              password: Yup.string().required('Lütfen şifrenizi giriniz.'),
          }),
          onSubmit: (values) => {
              mutate(values);
          },
      });

    return (
      <Box
        component={'form'}
        onSubmit={handleSubmit}
      >
          <TextField
            focused
            fullWidth
            id="firstname"
            label="Adınız"
            value={values.firstname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.firstname && errors.firstname)}
            helperText={touched.firstname && errors.firstname}
            sx={{ mb: 2 }}
          />

          <TextField
            focused
            fullWidth
            id="lastname"
            label="Soyadınız"
            value={values.lastname}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.lastname && errors.lastname)}
            helperText={touched.lastname && errors.lastname}
            sx={{ mb: 2 }}
          />

          <InputMask
            mask="(999) 999-9999"
            value={values.phone}
            onChange={(e) => setFieldValue('phone', e.target.value)}
            onBlur={handleBlur}
          >
              {() => (
                <TextField
                  focused
                  fullWidth
                  id="phone"
                  label="Telefon"
                  value={values.phone}
                  error={Boolean(touched.phone && errors.phone)}
                  helperText={touched.phone && errors.phone}
                  sx={{ mb: 2 }}
                />
              )}
          </InputMask>

          <TextField
            focused
            fullWidth
            id="email"
            type="email"
            label="E-Posta"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
            sx={{ mb: 2 }}
          />

          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ mb: 3 }}
            focused
          >
              <InputLabel htmlFor="password">Şifre</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText>{errors.password}</FormHelperText>
              )}
          </FormControl>

          <LoadingButton
            loading={isPending}
            disabled={isPending}
            type="submit"
            fullWidth
            variant="contained"
            size={'large'}
          >
              {isPending ? 'Yükleniyor...' : 'Kayıt Ol'}
          </LoadingButton>

          <LoadingButton loading={isPending} variant={'text'} color={'info'} fullWidth component={Link} to={pageRoutes.auth.login} sx={{ marginTop: 2, }}>
              {'Hesabınız var mı? Giriş yapın'}
          </LoadingButton>
      </Box>
    );
}
