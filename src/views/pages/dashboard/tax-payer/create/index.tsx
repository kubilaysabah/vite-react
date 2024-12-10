import { useFormik } from 'formik';
import * as yup from 'yup';
import TaxPayerForm from '@components/dashboard/forms/tax-payer'
import { useCreateTaxPayer } from '@api-hooks/useTaxPayer';
import { useGetActivities } from '@api-hooks/useUtils';
import { useGetIntegrators } from '@api/hooks/useIntegrator';

export default function CreateTaxPayer() {
  const { mutate, isPending } = useCreateTaxPayer();
  const { data: activities } = useGetActivities();
  const { data: integrators } = useGetIntegrators();

  const { handleBlur, handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      turkish_identity_number: undefined,
      firstname: undefined,
      lastname: undefined,
      phone: undefined,
      email: undefined,
      tax_number: undefined,
      tax_office: undefined,
      tax_office_code: undefined,
      trade_register_number: undefined,
      central_registry_system_number: undefined,
      opening_date: undefined,
      closing_date: undefined,
      registration_date: undefined,
      registration_place: undefined,
      tax_obligation: false,
      subscribed_capital: 0,
      paid_capital: 0,
      ssi: undefined,
      professional_organizations: undefined,
      professional_organizations_number: undefined,
      simple_entry: false,
      integrator_username: undefined,
      integrator_password: undefined,
      integrator_client_secret: undefined,
      integrator_client_id: undefined,
      user_id: undefined,
      integrator_id: undefined,
      activity_id: undefined,
    },
    validationSchema: yup.object({
      turkish_identity_number: yup.string(),
      firstname: yup.string(),
      lastname: yup.string(),
      phone: yup.string(),
      email: yup.string(),
      tax_number: yup.string(),
      tax_office: yup.string(),
      tax_office_code: yup.string(),
      trade_register_number: yup.string(),
      central_registry_system_number: yup.string(),
      opening_date: yup.string(),
      closing_date: yup.string(),
      registration_date: yup.string(),
      registration_place: yup.string(),
      tax_obligation: yup.bool(),
      subscribed_capital: yup.number(),
      paid_capital: yup.number(),
      ssi: yup.string(),
      professional_organizations: yup.string(),
      professional_organizations_number: yup.string(),
      simple_entry: yup.bool(),
      integrator_username: yup.string(),
      integrator_password: yup.string(),
      integrator_client_secret: yup.string(),
      integrator_client_id: yup.string(),
      user_id: yup.string(),
      integrator_id: yup.string(),
      activity_id: yup.string(),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      mutate(values);
    }
  });

  return (
    <TaxPayerForm
      onSubmit={handleSubmit}
      handleBlur={handleBlur}
      handleChange={handleChange}
      values={values}
      activities={activities?.data}
      integrators={integrators?.data}
      isPending={isPending}
      setFieldValue={setFieldValue}
    />
  )
}