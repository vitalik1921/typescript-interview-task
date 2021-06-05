import "./list-style.scss";

import { FC, useState } from "react";

import Modal from "react-modal";
import { usePasswordsContext } from "~/contexts/PasswordsContext";
import { IPassword } from "~/services/passwords";

import ItemIcon from "./components/ItemIcon";

interface IList {
  items: Array<IPassword>;
}

interface IUpdateModal {
  item: IPassword;
}

const UpdateModal: FC<IUpdateModal> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPass, setNewPass] = useState("");
  const { updateItem } = usePasswordsContext();

  return (
    <>
      <button className="update" onClick={() => setShowModal(true)}>
        Update Password
      </button>
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Example Modal"
      >
        <h1>Update Password</h1>
        <input
          placeholder="new password"
          className="input"
          value={newPass}
          onChange={(event) => setNewPass(event.target.value)}
        />
        <div className="pt-12px text-center">
          <button
            className="button"
            onClick={async () => {
              await updateItem({
                ...item,
                password: newPass,
              });
              setShowModal(false);
            }}
          >
            Change
          </button>
          <button
            className="button ml-12px"
            onClick={() => {
              setNewPass("");
              setShowModal(false);
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

const List: FC<IList> = ({ items }) => (
  <ul className="list">
    {items.map((item) => (
      <li key={item.id} className="item">
        <ItemIcon title={item.title} />
        <div>
          <div className="title">{item.title}</div>
          <div className="description">{item.description}</div>
        </div>
        <UpdateModal item={item} />
      </li>
    ))}
  </ul>
);

export default List;
