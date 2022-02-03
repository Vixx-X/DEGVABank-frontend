import { useState, useContext, FormEvent } from "react";
import { AuthContext } from "@contexts/AuthContext";
import { SERVER_URLS } from "@config";
import { useRouter } from "next/router";
import Link from "next/link";
import PasswordField from "@components/form/PasswordField";
import EmailField from "@components/form/EmailField";
import Button from "@components/common/button/Button";
import { filterOpenRedirect } from "@utils/filterOpenRedirect";

const {
  URL_HOME: URL_DEFAULT_REDIRECT,
  URL_REGISTER,
  URL_PASSWORD_RESET,
} = SERVER_URLS;

interface LogInFormData {
  username: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState<LogInFormData>({
    username: "",
    password: "",
  });
  const [_, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const { getToken } = useContext(AuthContext);

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
      // actual get token (it return the response in case of error)
      await getToken(form.username, form.password);
      const next = router.query?.next as string;
      router.push(next ? filterOpenRedirect(next) : URL_DEFAULT_REDIRECT);
    } catch (error) {
      setError(true);
      setMessageError("Hay un error con la página");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="my-12 ">
      <div className="container mx-auto animate__animated animate__fadeIn animate__delay-3s">
        <form method="POST" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex flex-col items-center justify-center mb-20">
            <EmailField
              placeholder="Correo electrónico"
              name="username"
              onChange={handleChange}
              value={form.username}
            />

            <PasswordField
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              value={form.password}
            />

            <Link href={URL_PASSWORD_RESET}>
              <a className="w-full lg:w-96 text-center my-3 block text-blue-600 text-sm">
                ¿Olvidaste tu contraseña?
              </a>
            </Link>

            <Button
              type="submit"
              className={
                "bg-primary-new rounded-md py-3 text-white font-extrabold w-full lg:w-96 primary"
              }
            >
              Ingresar
            </Button>

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
  );
};

export default Login;
