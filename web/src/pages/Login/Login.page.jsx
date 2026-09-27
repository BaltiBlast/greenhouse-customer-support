import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router";
import useAuth from "../../auth/useAuth.js";
import logoDark from "../../assets/branding/logo-dark.png";
import logoLight from "../../assets/branding/logo-light.png";
import formStyles from "../../styles/Form.module.css";
import formConfig from "./Login.form.js";
import styles from "./Login.module.css";

function FieldError({ message }) {
  return message ? (
    <span className={formStyles.fieldError} role="alert">
      {message}
    </span>
  ) : null;
}

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const {
    clearErrors,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({ defaultValues: formConfig.defaultValues });

  async function submitLogin(credentials) {
    clearErrors("root.server");

    try {
      await login(credentials);
      navigate("/", { replace: true });
    } catch (error) {
      setError("root.server", {
        type: "server",
        message: error.message || "Impossible de vous connecter.",
      });
    }
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby="login-title">
        <div className={styles.brand}>
          <img
            className={`${styles.logo} ${styles.logoLight}`}
            src={logoLight}
            alt="Greenhouse"
          />
          <img
            className={`${styles.logo} ${styles.logoDark}`}
            src={logoDark}
            alt="Greenhouse"
          />
        </div>

        <header className={styles.header}>
          <h1 id="login-title">Connexion</h1>
          <p>Connectez-vous pour accéder à votre espace.</p>
        </header>

        <form
          className={formStyles.form}
          noValidate
          onSubmit={handleSubmit(submitLogin)}
        >
          <fieldset className={`${formStyles.section} ${styles.fields}`}>
            <label>
              <span>Adresse email</span>
              <input
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.fr"
                {...register("email", formConfig.rules.email)}
              />
              <FieldError message={errors.email?.message} />
            </label>

            <label>
              <span>Mot de passe</span>
              <input
                type="password"
                autoComplete="current-password"
                placeholder="Votre mot de passe"
                {...register("password", formConfig.rules.password)}
              />
              <FieldError message={errors.password?.message} />
            </label>

            <button
              className={formStyles.submitButton}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Connexion..." : "Se connecter"}
            </button>

            {errors.root?.server?.message && (
              <p
                className={`${formStyles.feedback} ${formStyles.errorFeedback}`}
                role="alert"
              >
                {errors.root.server.message}
              </p>
            )}
          </fieldset>
        </form>
      </section>
    </main>
  );
}
