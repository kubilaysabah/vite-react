import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import TaxPayerForm from '@components/dashboard/forms/tax-payer'
import { useUpdateTaxPayerById, useTaxPayerById } from '@api-hooks/useTaxPayer';
import { useGetActivities } from '@api-hooks/useUtils';
import { useGetIntegrators } from '@api-hooks/useIntegrator';

export default function EditTaxPayer() {
  const params = useParams();
  const { data, mutate: getTaxPayerById, isPending: loadingTaxPayer } = useTaxPayerById();
  const { mutate, isPending } = useUpdateTaxPayerById();
  const { data: activities, isLoading: loadingActivities } = useGetActivities();
  const { data: integrators, isLoading: loadingIntegrators } = useGetIntegrators();

  useEffect(() => {
    if(params?.id) {
      getTaxPayerById(params.id);
    }
  }, [params?.id, getTaxPayerById]);

  const { handleBlur, handleChange, values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      id: data?.id || undefined,
      turkish_identity_number: data?.turkish_identity_number || undefined,
      firstname: data?.firstname || undefined,
      lastname: data?.lastname || undefined,
      phone: data?.phone || undefined,
      email: data?.email || undefined,
      tax_number: data?.tax_number || undefined,
      tax_office: data?.tax_office || undefined,
      tax_office_code: data?.tax_office_code || undefined,
      trade_register_number: data?.trade_register_number || undefined,
      central_registry_system_number: data?.central_registry_system_number || undefined,
      opening_date: data?.opening_date || undefined,
      closing_date: data?.closing_date || undefined,
      registration_date: data?.registration_date || undefined,
      registration_place: data?.registration_place || undefined,
      tax_obligation: data?.tax_obligation || false,
      subscribed_capital: data?.subscribed_capital || 0,
      paid_capital: data?.paid_capital || 0,
      ssi: data?.ssi || undefined,
      professional_organizations: data?.professional_organizations || undefined,
      professional_organizations_number: data?.professional_organizations_number || undefined,
      simple_entry: data?.simple_entry || false,
      integrator_username: data?.integrator_username || undefined,
      integrator_password: data?.integrator_password || undefined,
      integrator_client_secret: data?.integrator_client_secret || undefined,
      integrator_client_id: data?.integrator_client_id || undefined,
      user_id: data?.user_id || undefined,
      integrator_id: data?.integrator_id || undefined,
      activity_id: data?.activity_id || undefined
    },
    validationSchema: yup.object({
      id: yup.string(),
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
      activity_id: yup.string()
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.id) {
        mutate({
          id: values.id,
          body: values,
        });
      }
    }
  });

  return (
    <TaxPayerForm
      setFieldValue={setFieldValue}
      values={values}
      handleBlur={handleBlur}
      handleChange={handleChange}
      activities={activities?.data}
      integrators={integrators?.data}
      isPending={loadingTaxPayer || isPending || loadingIntegrators || loadingActivities}
      onSubmit={handleSubmit}
    />
  )
}