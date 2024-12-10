import { useRouteError, useAsyncError } from 'react-router-dom';

export default function ErrorBoundary() {
    const error = useRouteError();
    const throwError = useAsyncError();

    console.log(error);
    console.log(throwError);

    return null;
}
