import styles from "../src/styles/registerLogin.module.scss";
import Head from "next/head";
import HeaderGeneric from "@/components/common/headerGeneric";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import Footer from "@/components/common/footer";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import ToastComponent from "@/components/common/toast";
import authService from "@/services/authService";

const Login = function () {
    const router = useRouter();
    const [ toastColor, setToastColor ] = useState("");
    const [ toastIsOpen , setToastIsOpen ] = useState(false);
    const [ toastMesage, setToastMessage ] = useState("");

    useEffect(()=> {
      if(sessionStorage.getItem("netflix-token")){
        router.push("/home");
      }
    }, [])
    
    useEffect(() => {
        const registerSuccess = router.query.registered;
        if(registerSuccess === "true"){
            setToastColor("bg-success")
            setToastIsOpen(true);
            setTimeout(() => {
              setToastIsOpen(false);
            }, 1000*3);
            setToastMessage("Register successfull!");
        }
    }, [router.query]);

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email")!.toString();
        const password = formData.get("password")!.toString();
        const params = { email, password };

        const {status} = await authService.login(params);

        if(status === 200){
            router.push("/home")
        } else {
            setToastColor("bg-danger")
            setToastIsOpen(true);
            setTimeout(() => {
              setToastIsOpen(false);
            }, 1000*3);
            setToastMessage("E-mail or password incorrect!");
        }
    }

  return (
    <>
      <Head>
        <title>Netflix - Login</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Sign in"
        ></HeaderGeneric>
        <Container className="py-5">
          <p className={styles.formTitle}>Welcome back</p>
          <Form className={styles.form} onSubmit={handleLogin}>
            <p className="text-center">
              <strong>Welcome to Netflix</strong>
            </p>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="What's your e-mail?"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="What's your password?"
                required
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>Sign in</Button>
          </Form>
        <ToastComponent color={toastColor} isOpen={toastIsOpen} message={toastMesage}></ToastComponent>
        </Container>
        <Footer/>
      </main>
    </>
  );
};

export default Login;
