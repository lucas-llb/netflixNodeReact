import { Container, Form, Input } from "reactstrap";
import styles from "./styles.module.scss";
import Link from "next/link";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProfileService from "@/services/profileService";

Modal.setAppElement("#__next");

const HeaderAuth = function () {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [initials, setInitials] = useState("");
  const [searchName, setSearchName] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/search?name=${searchName}`);

    setSearchName("");
  }

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);

    setSearchName("");
  }

  useEffect(() => {
    ProfileService.fetchCurrent().then((user => {
      const firstNameInitial = user.data.firstName.slice(0,1);
      const lastNameInitial = user.data.lastName.slice(0,1);
      setInitials(firstNameInitial+lastNameInitial);
    }))
  },[])

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();

    router.push("/");
  };


  return (
    <>
      <Container className={styles.nav}>
        <Link href="/home">
          <img
            src="/logoOnebitflix.svg"
            alt="logoOnebitflix"
            className={styles.imgLogoNav}
          />
        </Link>
        <div className="d-flex align-items-center">
          <Form onSubmit={handleSearch}>
            <Input
              name="search"
              type="search"
              placeholder="Search"
              className={styles.input}
              value={searchName}
              onChange={(event) => {setSearchName(event.currentTarget.value.toLowerCase())}}
            />
          </Form>
          <img
            src="/homeAuth/iconSearch.svg"
            alt="SearchHeader"
            className={styles.searchImg}
            onClick={handleSearchClick}
          />
          <p className={styles.userProfile} onClick={handleOpenModal}>
            {initials}
          </p>
        </div>
        <Modal
          isOpen={modalOpen}
          onRequestClose={handleCloseModal}
          shouldCloseOnEsc={true}
          className={styles.modal}
          overlayClassName={styles.overlayModal}
        >
          <Link href="/profile">
            <p className={styles.modalLink}>My configurations</p>
          </Link>
          <p className={styles.modalLink} onClick={handleLogout}>
            Exit
          </p>
        </Modal>
      </Container>
    </>
  );
};

export default HeaderAuth;
