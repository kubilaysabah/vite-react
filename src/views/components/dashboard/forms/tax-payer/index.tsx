import { useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { type FormikHandlers, type FormikProps } from 'formik'
import { useTheme, Box, Tab, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import type { TaxPayer } from '~types/tax-payer';
import type { Activity } from '~types/utils';
import type { Integrator } from '~types/integrator';
import DetailTab from './tabs/detail';
import GeneralTab from './tabs/general';
import IntegratorTab from './tabs/integrator';
import TaxTab from './tabs/tax';

type Props = {
  integrators?: Integrator[];
  activities?: Activity[];
  values?: TaxPayer | null;
  onSubmit: () => void;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  setFieldValue: FormikProps<TaxPayer>['setFieldValue'];
  isPending?: boolean;
}

export default function TaxPayerForm({ setFieldValue, values, onSubmit, handleChange, handleBlur, isPending = false, activities = [], integrators = [] }: Props) {
  const theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const { state } = useNavigation();

  return (
    <Box
      component={'form'}
      title="Mükellef Formu"
      sx={{
        background: theme.palette.background.default
      }}
      onSubmit={onSubmit}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList aria-label="lab ApiRoutes tabs example">
            {['Genel Bilgiler', 'Detay Bilgiler', 'Entegratör', 'Vergilendirme'].map((tab, index) => (
              <Tab key={index} label={tab} value={index} onClick={() => setValue(index)} />
            ))}
          </TabList>
        </Box>
        <Box sx={{ padding: 3 }}>
          <TabPanel value={0} sx={{ padding: 0 }}>
            <GeneralTab isPending={isPending} handleBlur={handleBlur} handleChange={handleChange} values={values} />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <DetailTab setFieldValue={setFieldValue} isPending={isPending} handleBlur={handleBlur} handleChange={handleChange} values={values} activities={activities} />
          </TabPanel>
          <TabPanel value={2} sx={{ padding: 0 }}>
            <IntegratorTab setFieldValue={setFieldValue} integrators={integrators} values={values} handleChange={handleChange} handleBlur={handleBlur} isPending={isPending} />
          </TabPanel>
          <TabPanel value={3} sx={{ padding: 0 }}>
            <TaxTab values={values} handleChange={handleChange} handleBlur={handleBlur} isPending={isPending} />
          </TabPanel>
          <Button disabled={state === 'loading'} type={'submit'} variant={'contained'} color={'primary'} sx={{ marginTop: 2, }}>{'Kaydet'}</Button>
        </Box>
      </TabContext>
    </Box>
  );
}
