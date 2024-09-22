import Head from "next/head";
import styles from "../src/styles/registerLogin.module.scss";
import HeaderGeneric from "@/components/common/headerGeneric";
import { Container, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Footer from "@/components/common/footer";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/services/authService";
import { useRouter } from "next/router";
import ToastComponent from "@/components/common/toast";

const Register = function () {
    const router = useRouter();
    const [ toastIsOpen , setToastIsOpen ] = useState(false);
    const [ toastMesage, setToastMessage ] = useState("");

    useEffect(()=> {
      if(sessionStorage.getItem("netflix-token")){
        router.push("/home");
      }
    }, [])

    const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget)
        const firstName = formData.get("firstName")!.toString();
        const lastName = formData.get("lastName")!.toString();
        const phone = formData.get("phone")!.toString();
        const email = formData.get("email")!.toString();
        const birth = formData.get("birth")!.toString();
        const password = formData.get("password")!.toString();
        const confirmPassword = formData.get("confirmPassword")!.toString();
        const params = { firstName, lastName, phone, birth, email, password }

        if(password != confirmPassword){
            setToastIsOpen(true);
            setTimeout(() => {
              setToastIsOpen(false);
            }, 1000*3);
            setToastMessage("Passwords are differents");

            return;
        }

        const { data, status } = await authService.register(params);

        if(status === 201){
          router.push("/login?registered=true")

        } else {
            setToastIsOpen(true);
            setTimeout(() => {
              setToastIsOpen(false);
            }, 1000*3);
            setToastMessage(data.message);
        }
    }

  return (
    <>
      <Head>
        <title>Netflix - Register</title>
        <link
          href="/favicon.svg"
          rel="shortcut icon"
          type="image/x-icon"
        ></link>
      </Head>
      <main className={styles.main}>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Sign in"
        ></HeaderGeneric>
        <Container className="py-5">
          <p className={styles.formTitle}>
            <strong>Wellcome to Netflix!</strong>
          </p>
          <Form className={styles.form} onSubmit={handleRegister}>
            <p className="text-center">
              <strong>Create your account</strong>
            </p>
            <FormGroup>
              <Label for="firstName" className={styles.label}>
                NAME
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="What's your name?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="lastName" className={styles.label}>
                SURNAME
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="What's your surname?"
                required
                maxLength={20}
                className={styles.inputName}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone" className={styles.label}>
                PHONE
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(xx) 9xxxx-xxxx"
                data-mask="[-]+55 (00) 00000-0000"
                required
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className={styles.label}>
                E-MAIL
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="What's your email?"
                required
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birth" className={styles.label}>
                BIRTHDATE
              </Label>
              <Input
                id="birth"
                name="birth"
                type="date"
                min="1930-01-01"
                max="2022-12-31"
                required
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className={styles.label}>
                PASSWORD
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Write your password (min: 6 | max: 20)"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ConfirmPassword" className={styles.label}>
                CONFIRM PASSWORD
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Re-write your password"
                required
                minLength={6}
                maxLength={20}
                className={styles.input}
              />
            </FormGroup>
            <Button type="submit" outline className={styles.formBtn}>
                Register
            </Button>
          </Form>
        </Container>
        <Footer>
        </Footer>
        <ToastComponent color="bg-danger" isOpen={toastIsOpen} message={toastMesage}></ToastComponent>
      </main>
    </>
  );
};

export default Register;
