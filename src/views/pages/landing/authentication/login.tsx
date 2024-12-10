import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  Stack,
  FormHelperText,
  LinearProgress,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLogin } from '@api-hooks/useAuth';
import pageRoutes from '@constant/page-routes.ts';

export default function Login() {
  const [checked, setChecked] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { isError, error, isPending, mutate } = useLogin();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Lütfen geçerli bir e-posta adresi girin').required('E-posta alanı boş bırakılamaz'),
      password: Yup.string().max(32, 'Şifre en fazla 32 karakter olabilir').required('Şifre alanı boş bırakılamaz')
    }),
    onSubmit: (values) => {
      mutate({ email: values.email, password: values.password });
    }
  });

  return (
    <Box component={'form'} onSubmit={formik.handleSubmit}>
      <FormControl fullWidth sx={{ mb: 2 }} focused>
        <InputLabel  htmlFor="email">{'E-Posta'}</InputLabel>
        <OutlinedInput
          error={formik.touched.email && typeof formik.errors.email === "string"}
          id="email"
          type="email"
          label="E-Posta"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {isPending && <LinearProgress />}
        {formik.touched.email && formik.errors.email ? (
          <FormHelperText error>{formik.errors.email}</FormHelperText>
        ) : null}
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }} focused>
        <InputLabel htmlFor="password">{'Şifre'}</InputLabel>
        <OutlinedInput
          error={formik.touched.password && typeof formik.errors.password === "string"}
          id="password"
          type={showPassword ? 'text' : 'password'}
          label="Şifre"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
                size="large"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {isPending && <LinearProgress />}
        {formik.touched.password && formik.errors.password ? (
          <FormHelperText error>{formik.errors.password}</FormHelperText>
        ) : null}
      </FormControl>
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              name="remember_me"
              color="primary"
            />
          }
          label="Beni Hatırla"
        />
        <Button
          to={'/forgot-password'}
          component={Link}
          variant={'text'}
          color="primary"
          disabled={isPending}
        >
          {'Şifrenizi mi unuttunuz?'}
        </Button>
      </Stack>

      {isError && error.status === 404 ? (
        <>
          <Typography variant="subtitle1" color="error">
            {'Kullanıcı bulunamadı'}
          </Typography>
          <Typography variant="subtitle2" color="error">
            {'Lütfen e-posta adresini kontrol edin ve yeniden deneyin.'}
          </Typography>
        </>
      ) : null}

      <LoadingButton type="submit" loading={isPending} fullWidth variant="contained" color="primary" size="large" sx={{
        mt: 3
      }}>
        {'Giriş Yap'}
      </LoadingButton>

      <LoadingButton loading={isPending} variant={'text'} color={'info'} fullWidth component={Link} to={pageRoutes.auth.register} sx={{ marginTop: 2, }}>
        {'Hesabınız yok mu? Kayıt olun'}
      </LoadingButton>
    </Box>
  );
}
