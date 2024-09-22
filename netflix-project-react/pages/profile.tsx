import Head from "next/head";
import styles from "../src/styles/profile.module.scss";
import UserForm from "@/components/profile/user";
import HeaderAuth from "@/components/common/headerAuth";
import { Button, Col, Container, Row } from "reactstrap";
import Footer from "@/components/common/footer";
import { useEffect, useState } from "react";
import PasswordForm from "@/components/profile/password";
import PageSpinner from "@/components/common/spinner";
import { useRouter } from "next/router";

const UserInfo = function () {
  const [form, setForm] = useState("userForm");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem("netflix-token")) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <PageSpinner />;
  }

  return (
    <>
      <Head>
        <title>Netflix - My account</title>
        <link rel="shortcut icon" href="/favicon.svg" type="image/x-icon" />
      </Head>
      <main className={styles.main}>
        <div className={styles.header}>
          <HeaderAuth />
        </div>
        <Container className={styles.gridContainer}>
          <p className="title">My account</p>
          <Row className="pt-3 pb-5">
            <Col md={4} className={styles.btnColumn}>
              <Button
                className={styles.renderForm}
                style={{color: form === "userForm" ? "#FF0044" : "white"}}
                onClick={() => {
                  setForm("userForm");
                }}
              >
                Personal data
              </Button>
              <Button
                className={styles.renderForm}
                style={{color: form === "passwordForm" ? "#FF0044" : "white"}}
                onClick={() => {
                  setForm("passwordForm");
                }}
              >
                Password
              </Button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm/> : <PasswordForm/>}
            </Col>
          </Row>
        </Container>
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default UserInfo;
