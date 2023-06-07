import { useEffect, useState } from "react";
import styles from './login-form.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

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
    // const onSubmit: SubmitHandler<User> = async ({
    //   username,
    //   password,
    // }: User) => {
    //   try {
    //     const res = await authService.login(username, sha256(password));
    //     if (res?.status === 200) {
    //       navigate("/dashboard");
    //     }
    //   } catch (error: any) {
    //     if (error.response.status === 401) {
    //       setErrorMsg(true);
    //     }
    //   }
    // };
    const onSubmit: SubmitHandler<User> = async ()=>{
      navigate("/sale");
    }
    useEffect(() => {
     
      // navigate("/dashboard");
      
    }, [navigate]);
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" className={styles.input} />
        </div>
        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
