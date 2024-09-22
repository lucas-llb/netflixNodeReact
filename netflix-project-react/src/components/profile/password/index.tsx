import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../../../styles/profile.module.scss";
import { FormEvent, useEffect, useState } from "react";
import ProfileService from "@/services/profileService";
import ToastComponent from "@/components/common/toast";
import { handleClientScriptLoad } from "next/script";

const PasswordForm = function () {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    ProfileService.fetchCurrent().then((password) =>{
      setCurrentPassword(password.currentPassword);
      setNewPassword(password.newPassword);
    });
  }, []);

  const handlePasswordUpdate = async function(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(newPassword != confirmPassword){
      setToastOpen(true);
      setErrorMessage("Passwords are not equals");
      setColor("bg-danger");
      setTimeout(() => setToastOpen(false), 1000*3);
      return;
    }

    if(currentPassword === newPassword){
      setToastOpen(true);
      setErrorMessage("New password and current password are the same");
      setColor("bg-danger");
      setTimeout(() => setToastOpen(false), 1000*3);
      return;
    }

    const res = await ProfileService.passwordUpdate({
      currentPassword,
      newPassword
    });

    if(res === 204){
      setToastOpen(true);
      setErrorMessage("Password updated");
      setColor("bg-success");
      setTimeout(() => setToastOpen(false), 1000*3);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    if(res === 400){
      setToastOpen(true);
      setErrorMessage("Password incorrect");
      setColor("bg-danger");
      setTimeout(() => setToastOpen(false), 1000*3);
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={handlePasswordUpdate}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label for="currentPassword" className={styles.label}>Current Password</Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={12}
              value={currentPassword}
              className={styles.input}
              onChange={(event)=>{setCurrentPassword(event.currentTarget.value)}}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
        <FormGroup>
            <Label for="newPassword" className={styles.label}>New Password</Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={12}
              value={newPassword}
              className={styles.inputFlex}
              onChange={(event)=>{setNewPassword(event.currentTarget.value)}}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword" className={styles.label}>Confirm New Password</Label>
            <Input
              name="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="********"
              required
              minLength={6}
              maxLength={12}
              value={confirmPassword}
              onChange={(event)=>{setConfirmPassword(event.currentTarget.value)}}
              className={styles.inputFlex}
            />
          </FormGroup>
        </div>
          <Button className={styles.formBtn} outline type="submit">
            Save
          </Button>
      </Form>
      <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
    </>
  );
};

export default PasswordForm;
