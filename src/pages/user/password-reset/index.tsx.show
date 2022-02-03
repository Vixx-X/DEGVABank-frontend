import Layout from '@components/Layout';
import Loader from '@components/common/Loader';
import Button from '@components/common/button/Button';
import EmailField from '@components/common/form/EmailField';
import HeaderTitle from '@components/header/HeaderTitle';

import { API_URLS, SERVER_URLS } from '@config';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const { URL_REGISTER } = SERVER_URLS;
const { URL_PASSWORD_RESET } = API_URLS;

interface PasswordResetFormData {
  email: string;
}

const PasswordReset = () => {
  const [form, setForm] = useState<PasswordResetFormData>({
    email: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;
    setForm({
      ...form,
      [el.name]: el.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await fetch(URL_PASSWORD_RESET, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit, include
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const dataJson = await data.json();
      if (data.ok) {
        setSuccess(true);
      } else {
        setMessageError(dataJson);
        setError(true);
      }
    } catch (error) {
      setError(true);
      setMessageError('Hay un error con la página');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Recuperar Contraseña"
      description="Recupera tu contraseña con tu correo"
    >
      {loading ? (
        <Loader />
      ) : success ? (
        <section className="my-12 ">
          <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
            <HeaderTitle title="Recuperar Contraseña" />
            <div className="flex flex-col items-center justify-center mb-20">
              <p>
                Revisa tu correo, te enviamos un link para poder cambiar tu
                contraseña.
              </p>
            </div>
          </div>
        </section>
      ) : (
        <section className="my-12 ">
          <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
            <HeaderTitle title="Recuperar Contraseña" />

            <form method="POST" onSubmit={(e) => handleSubmit(e)}>
              <div className="flex flex-col items-center justify-center mb-20">
                <EmailField
                  placeholder="Correo electrónico"
                  name="email"
                  onChange={handleChange}
                  value={form.email}
                />

                <Button type="submit">Enviar</Button>

                {error ? (
                  <div className="bg-red-400 border  border-red-700 w-96 p-3 my-3 py-3 rounded-lg text-sm font-normal">
                    <strong>Error: </strong> {messageError}
                  </div>
                ) : null}

                <Link href={URL_REGISTER}>
                  <a className="w-full lg:w-96 text-center my-3 block text-blue-600 text-sm">
                    ¿Aún no te has registrado? Únete aquí
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default PasswordReset;
