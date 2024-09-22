import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import ProfileService from "@/services/profileService";
import ToastComponent from "@/components/common/toast";
import { useRouter } from "next/router";

const UserForm = function () {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ phone, setPhone ] = useState("");
  const [ email, setEmail ] = useState("");
  const [initialEmail, setInitialEmail]= useState("");
  const [ created_at, setCreatedAt ] = useState("");

  const date = new Date(created_at);
  const month = date.toLocaleDateString("default", {month: "long"})

  useEffect(() =>{
    ProfileService.fetchCurrent().then((user) => {
      setFirstName(user.data.firstName);
      setLastName(user.data.lastName);
      setPhone(user.data.phone);
      setEmail(user.data.email);
      setInitialEmail(user.data.email);
      setCreatedAt(user.data.createdAt);
    })
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    const res = await ProfileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      created_at
    });

    if(res === 200){
      setToastOpen(true);
      setErrorMessage("User updated!");
      setColor("bg-success");
      setTimeout(() => setToastOpen(false), 1000*3);

      if(email != initialEmail){
        sessionStorage.clear();
        router.push('/');
      }
    } else{
      setToastOpen(true);
      setErrorMessage(res);
      setColor("bg-danger");
      setTimeout(() => setToastOpen(false), 1000*3);
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={handleUserUpdate}>
        <div className={styles.formName}>
          <p className={styles.nameAbbreviation}>{firstName.slice(0,1)}{lastName.slice(0,1)}</p>
          <p className={styles.userName}>{firstName}&#160;{lastName}</p>
        </div>
        <div className={styles.memberTime}>
          <img
            src="/profile/iconUserAccount.svg"
            alt="iconProfile"
            className={styles.memberTimeImg}
          />
          <p className={styles.memberTimeText}>
            Member since: <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}` }
          </p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
        <FormGroup>
          <Label for="firstName" className={styles.label}>NAME</Label>
          <Input
            name="firstName"
            type="text"
            id="firstName"
            required
            placeholder="What's your first name?"
            maxLength={20}
            className={styles.inputFlex}
            value={firstName}
            onChange={(event)=>{setFirstName(event.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastName" className={styles.label}>Last Name</Label>
          <Input
            name="lastName"
            type="text"
            id="lastName"
            required
            placeholder="What's your last name?"
            maxLength={20}
            className={styles.inputFlex}
            value={lastName}
            onChange={(event) => {setLastName(event.target.value)}}
          />
        </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
        <FormGroup>
          <Label for="phone" className={styles.label}>Phone number</Label>
          <Input
            name="phone"
            type="tel"
            id="phone"
            required
            placeholder="(XX) XXXXX-XXXX"
            className={styles.input}
            value={phone}
            onChange={(event) => {setPhone(event.target.value)}}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email" className={styles.label}>E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            required
            placeholder="What's your e-mail?"
            className={styles.input}
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
          />
        </FormGroup>
        <Button className={styles.formBtn} outline type="submit">Save</Button>
        </div>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
    </>
  );
};

export default UserForm;
