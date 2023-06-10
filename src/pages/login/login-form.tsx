import { useEffect, useState } from "react";
import styles from "./login-form.module.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userService from "../../services/user-service";
import { sha256 } from "js-sha256";

const LoginForm = () => {
  type User = {
    username: string;
    password: string;
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<User> = async ({
    username,
    password,
  }: User) => {
    try {
      const res = await userService.login(username, sha256(password));
      if (res?.message === 'success') {
        localStorage.setItem("token", res.access_token);
        navigate("/sale");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        setErrorMsg(true);
      }
      console.log(error);
    }
  };
  // const onSubmit: SubmitHandler<User> = async ()=>{
  //   // navigate("/sale");
  // }
  useEffect(() => {
    // navigate("/dashboard");
  }, [navigate]);
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            {...register("username", { required: "Username is required" })}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            {...register("password", { required: "Password is required" })}
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
